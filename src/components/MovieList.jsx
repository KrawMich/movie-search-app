import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}