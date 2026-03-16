export default function SearchBar() {
  return (
    <form className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}