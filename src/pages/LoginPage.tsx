import { FormEvent, useState } from 'react';
import Logo from '../components/logo';


const VALID_USERNAME = 'user';
const VALID_PASSWORD = 'pass';

type LoginPageProps = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md px-6">
        <Logo />
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl px-8 pt-8 pb-10 border border-slate-100"
        >
          <h1 className="text-xl font-medium mb-6 text-center text-slate-800">
            Sign in to GitHub Search
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-googleBlue focus:border-transparent text-sm bg-slate-50/60"
              placeholder="Enter username (user)"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-googleBlue focus:border-transparent text-sm bg-slate-50/60"
              placeholder="Enter password (pass)"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 mb-4 text-center" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-googleBlue hover:bg-blue-600 text-white font-medium py-2.5 rounded-full text-sm transition-colors"
          >
            Sign in
          </button>
          <p className="mt-4 text-xs text-slate-500 text-center">
            Demo login — use <span className="font-medium text-slate-700">user</span> /
            <span className="font-medium text-slate-700"> pass</span>
          </p>
        </form>
      </div>
    </div>
  );
}

