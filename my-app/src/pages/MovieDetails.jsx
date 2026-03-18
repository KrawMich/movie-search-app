import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../services/api";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message || "Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [id]);
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !movie ? null : (
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-slate-100 p-4">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full rounded-lg object-contain"
                />
              ) : (
                <div className="flex h-96 items-center justify-center rounded-lg bg-slate-200 text-sm text-slate-500">
                  No image
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <h1 className="text-3xl font-bold text-slate-800">{movie.Title}</h1>

              <p className="mt-2 text-sm text-slate-500">
                {movie.Year} • {movie.Runtime} • {movie.Genre}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-700">
                {movie.Plot}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Director
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {movie.Director}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Actors
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {movie.Actors}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    IMDb Rating
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {movie.imdbRating}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Language
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {movie.Language}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}