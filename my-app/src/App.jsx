import SearchBar from "./components/SearchBar";
import { useState } from "react";
import { searchMovies } from "./services/api";
import MovieList from "./components/MovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    const cleanedQuery = query.trim();
    if (!cleanedQuery) return;

    setLoading(true);
    setError(null);

    try {
      const [data] = await Promise.all([
        searchMovies(cleanedQuery),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);

      const uniqueMovies = Array.from(
        new Map((data.Search || []).map((m) => [m.imdbID, m])).values()
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
              <MovieList movies={movies} />
          )}
        </section>
      </div>
    </div>
  );
}