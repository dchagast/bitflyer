type SearchControlsProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  order: 'asc' | 'desc';
  onOrderChange: (value: 'asc' | 'desc') => void;
  perPage: number;
  onPerPageChange: (value: number) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function SearchControls({
  query,
  onQueryChange,
  sort,
  onSortChange,
  order,
  onOrderChange,
  perPage,
  onPerPageChange,
  onSubmit,
  loading
}: SearchControlsProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 bg-white rounded-full shadow-sm border border-slate-200 px-4 py-2.5">
          <span className="material-symbols-outlined text-slate-400 text-xl select-none">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
            placeholder="Search GitHub repositories (e.g. react, machine learning, tailwind)"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="hidden sm:inline-flex bg-googleBlue hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
          >
            Search
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap gap-2 items-center">
            <label className="flex items-center gap-1.5">
              <span className="text-slate-600">Sort</span>
              <select
                value={sort}
                onChange={(e) => onSortChange(e.target.value)}
                className="border border-slate-200 rounded-full px-2 py-1 bg-white"
              >
                <option value="best match">Best match</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="updated">Recently updated</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5">
              <span className="text-slate-600">Order</span>
              <select
                value={order}
                onChange={(e) => onOrderChange(e.target.value as 'asc' | 'desc')}
                className="border border-slate-200 rounded-full px-2 py-1 bg-white"
              >
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5">
              <span className="text-slate-600">Per page</span>
              <select
                value={perPage}
                onChange={(e) => onPerPageChange(Number(e.target.value))}
                className="border border-slate-200 rounded-full px-2 py-1 bg-white"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="sm:hidden inline-flex bg-googleBlue hover:bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}

