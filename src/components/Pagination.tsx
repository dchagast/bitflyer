import { useEffect, useState } from 'react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled: boolean;
};

export default function Pagination({ page, totalPages, onPageChange, disabled }: PaginationProps) {
  const [inputPage, setInputPage] = useState<number | ''>(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  if (totalPages <= 1) return null;

  const handleFirst = () => {
    if (page > 1) onPageChange(1);
  };

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handleLast = () => {
    if (page < totalPages) onPageChange(totalPages);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setInputPage(val ? Number(val) : '');
  };

  const applyCustomInputPage = () => {
    if (inputPage === '' || Number.isNaN(inputPage)) {
      setInputPage(page);
      return;
    }
    const nextPage = Math.max(1, Math.min(totalPages, Number(inputPage)));
    onPageChange(nextPage);
  };

  const handleInputBlur = () => {
    applyCustomInputPage();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyCustomInputPage();
    } else if (e.key === 'Escape') {
      setInputPage(page);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-10 text-xs text-slate-600">
      <button
        type="button"
        onClick={handleFirst}
        disabled={page === 1 || disabled}
        className="px-2 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-50"
        aria-label="First page"
      >
        First
      </button>
      <button
        type="button"
        onClick={handlePrev}
        disabled={page === 1 || disabled}
        className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-50"
        aria-label="Previous page"
      >
        Previous
      </button>
      <span className="flex items-center gap-1">
        Page
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
          disabled={disabled}
          className="w-10 px-1 py-0.5 text-center border border-slate-200 rounded bg-white mx-1 text-xs outline-none focus:ring-2 focus:ring-blue-200"
          aria-label="Page number input"
        />
        of <span className="font-medium">{totalPages}</span>
      </span>
      <button
        type="button"
        onClick={handleNext}
        disabled={page === totalPages || disabled}
        className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-50"
        aria-label="Next page"
      >
        Next
      </button>
      <button
        type="button"
        onClick={handleLast}
        disabled={page === totalPages || disabled}
        className="px-2 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:bg-slate-50"
        aria-label="Last page"
      >
        Last
      </button>
    </div>
  );
}

