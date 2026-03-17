import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="block">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow transition duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
        
        <div className="h-72 w-full bg-slate-200">
          {movie.Poster !== "N/A" ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No image
            </div>
          )}
        </div>

        <div className="p-4">
          <p className="font-semibold text-slate-800 line-clamp-2">
            {movie.Title}
          </p>
          <p className="text-sm text-slate-500">
            {movie.Year}
          </p>
        </div>

      </div>
    </Link>
  );
}