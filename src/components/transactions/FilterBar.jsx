import React from 'react';
import { Search, X } from 'lucide-react';
import useApp from '../../hooks/useApp';

const categories = [
  'All',
  'Food',
  'Bills',
  'Transport',
  'Entertainment',
  'Shopping',
  'Education',
  'Health',
];
const types = ['All', 'income', 'expense'];
const sortOptions = [
  { value: 'date-desc', label: 'Date (Newest)' },
  { value: 'date-asc', label: 'Date (Oldest)' },
  { value: 'amount-desc', label: 'Amount (High)' },
  { value: 'amount-asc', label: 'Amount (Low)' },
];

const selectClass =
  'h-9 pl-3 pr-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors appearance-none cursor-pointer';

const FilterBar = ({ sort, onSortChange }) => {
  const { filters, setFilters } = useApp();

  const hasActiveFilter =
    filters.search !== '' ||
    filters.category !== 'All' ||
    filters.type !== 'All';

  const clearFilters = () =>
    setFilters({ search: '', category: 'All', type: 'All' });

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full h-9 pl-9 pr-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Category */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className={selectClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </span>
        </div>

        {/* Type */}
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className={selectClass}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === 'All'
                  ? 'All Types'
                  : t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </span>
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className={selectClass}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
            ▾
          </span>
        </div>

        {/* Clear */}
        {hasActiveFilter && (
          <button
            onClick={clearFilters}
            className="h-9 px-3 flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700 transition-colors"
          >
            <X size={13} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
