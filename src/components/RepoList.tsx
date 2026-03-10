type RepoListProps = {
  items: Array<{
    id: number;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
  }>;
  loading: boolean;
  error: string;
  totalCount: number;
  query: string;
};

export default function RepoList({ items, loading, error, totalCount, query }: RepoListProps) {
  if (!items.length) {
    return (
      <p className="text-center text-sm text-slate-500 mt-10">
        Start by typing a keyword above to search GitHub repositories.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-googleBlue rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-sm text-red-500 mt-10" role="alert">
        {error}
      </p>
    );
  }

  if (!items.length) {
    return (
      <p className="text-center text-sm text-slate-500 mt-10">No repositories found. Try another keyword.</p>
    );
  }

  return (
    <div className="w-1/2 mx-auto mt-4">
      <p className="text-xs text-slate-500 mb-3">
        About{' '}
        <span className="font-medium text-slate-700">
          {typeof totalCount === 'number' && Number.isFinite(totalCount)
            ? totalCount.toLocaleString()
            : totalCount}
        </span>{' '}
        results
      </p>
      <ul className="space-y-4 border-2">
        {items.map((repo) => (
          <li
            key={repo.id}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-md transition-shadow"
          >
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline text-sm font-medium"
            >
              {repo.full_name}
            </a>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{repo.description}</p>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 mt-2">
              <span>
                ⭐{' '}
                {typeof repo.stargazers_count === 'number' && Number.isFinite(repo.stargazers_count)
                  ? repo.stargazers_count.toLocaleString()
                  : repo.stargazers_count}{' '}
                stars
              </span>
              <span>
                🍴{' '}
                {typeof repo.forks_count === 'number' && Number.isFinite(repo.forks_count)
                  ? repo.forks_count.toLocaleString()
                  : repo.forks_count}{' '}
                forks
              </span>
              {repo.language && <span>{repo.language}</span>}
              <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

