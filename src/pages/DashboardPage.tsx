import { useEffect, useState } from 'react';
import Logo from '../components/logo';
import SearchControls from '../components/SearchControls';
import RepoList from '../components/RepoList';
import Pagination from '../components/Pagination';

const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories';
const MAX_RESULTS = 1000;

type DashboardPageProps = {
  onLogout: () => void;
};

type GithubRepo = {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export default function DashboardPage({ onLogout }: DashboardPageProps) {
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<string>('best match');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [items, setItems] = useState<GithubRepo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const canSearch = query.trim().length > 0;

  const effectiveTotalPages = Math.max(
    1,
    Math.min(Math.ceil(Math.min(totalCount, MAX_RESULTS) / perPage) || 1, Math.ceil(MAX_RESULTS / perPage))
  );

  const performSearch = async () => {
    if (!canSearch) return;
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    params.set('q', query.trim());
    if (sort !== 'best match') {
      params.set('sort', sort);
      params.set('order', order);
    }
    params.set('per_page', String(perPage));
    params.set('page', String(page));

    try {
      const fetchOptions: RequestInit = {
        headers: {
          Accept: 'application/vnd.github.text-match+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      };
      const response = await fetch(`${GITHUB_SEARCH_URL}?${params.toString()}`, fetchOptions);
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error('Failed to fetch repositories. Please try again.');
      }
      const data = await response.json();
      setItems(Array.isArray(data.items) ? (data.items as GithubRepo[]) : []);
      setTotalCount(typeof data.total_count === 'number' ? data.total_count : 0);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
      setError(message);
      setItems([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canSearch) {
      void performSearch();
    }
  }, [page, sort, order, perPage]);

  const handleNewSearch = () => {
    setPage(1);
    void performSearch();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="flex items-center justify-end px-6 py-4 text-sm text-slate-700">
        <button
          type="button"
          onClick={onLogout}
          className="border border-slate-200 rounded-full px-3 py-1.5 hover:bg-slate-100 bg-white"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4">
        <Logo />
        <SearchControls
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          order={order}
          onOrderChange={(value) => setOrder(value as 'asc' | 'desc')}
          perPage={perPage}
          onPerPageChange={setPerPage}
          onSubmit={handleNewSearch}
          loading={loading}
        />
        <RepoList
          items={items}
          loading={loading}
          error={error}
          totalCount={totalCount}
          query={query}
        />
        <Pagination
          page={page}
          totalPages={effectiveTotalPages}
          onPageChange={setPage}
          disabled={loading || !canSearch}
        />
      </main>
    </div>
  );
}

