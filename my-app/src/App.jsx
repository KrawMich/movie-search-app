import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { searchMovies } from "./services/api";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const cleanedQuery = query.trim();
    if (!cleanedQuery) return;

    try {
      setLoading(true);
      setError(null);

      const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
      const dataPromise = searchMovies(cleanedQuery);

      const [data] = await Promise.all([dataPromise, minDelay]);

      const uniqueMovies = (data.Search || []).filter(
        (movie, index, array) =>
          index === array.findIndex((item) => item.imdbID === movie.imdbID)
      );

      setSearchQuery(cleanedQuery);
      setMovies(uniqueMovies);
    } catch (err) {
      setSearchQuery(cleanedQuery);
      setMovies([]);
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Movie Search App
        </h1>

        <p className="mb-6 text-center text-slate-600">
          Search for your favorite movies and discover new ones.
        </p>

        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">
            Results
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
              <p className="mt-3 text-sm text-slate-500">Loading...</p>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-dashed border-red-300 bg-red-50 px-4 py-10 text-center text-sm text-red-600">
              {error}
            </div>
          ) : !searchQuery ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
              Search for a movie or series
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center text-sm text-slate-500">
              No results found for: {searchQuery}
            </div>
          ) : (
            <ul className="space-y-3">
              {movies.map((movie) => (
                <li
                  key={movie.imdbID}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-semibold text-slate-800">
                    {movie.Title}
                  </p>
                  <p className="text-sm text-slate-500">
                    {movie.Year}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}