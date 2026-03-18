export default function SearchBar({ query, onQueryChange, onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        autoFocus
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        disabled={!query.trim()}
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        Search
      </button>
    </form>
  );
}