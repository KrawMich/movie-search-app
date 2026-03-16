import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
          Movie Search App
        </h1>

        <p className="mb-6 text-center text-slate-600">
          Search for your favorite movies and discover new ones.
        </p>

        <SearchBar />

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Results</h2>

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            Search results will appear here.
          </div>
        </section>
      </div>
    </div>
  );
}