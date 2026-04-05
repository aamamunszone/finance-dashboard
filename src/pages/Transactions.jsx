import React, { useMemo, useState } from 'react';
import { Plus, ArrowLeftRight } from 'lucide-react';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import useApp from '../hooks/useApp';
import { formatCurrency } from '../utils/helpers';

const Transactions = () => {
  const { transactions, filters, role } = useApp();
  const [sort, setSort] = useState('date-desc');
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    let list = [...transactions];

    if (filters.search)
      list = list.filter((t) =>
        t.description.toLowerCase().includes(filters.search.toLowerCase()),
      );
    if (filters.category !== 'All')
      list = list.filter((t) => t.category === filters.category);
    if (filters.type !== 'All')
      list = list.filter((t) => t.type === filters.type);

    list.sort((a, b) => {
      if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sort === 'amount-desc') return b.amount - a.amount;
      if (sort === 'amount-asc') return a.amount - b.amount;
      return 0;
    });

    return list;
  }, [transactions, filters, sort]);

  // Summary of filtered results
  const summary = useMemo(() => {
    const income = filtered
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expense = filtered
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense };
  }, [filtered]);

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage and explore your financial activity
          </p>
        </div>

        {/* Admin only - Add button */}
        {role === 'admin' && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 h-9 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-indigo-900/30 shrink-0"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>
        )}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: 'Showing',
            value: `${filtered.length} transaction${filtered.length !== 1 ? 's' : ''}`,
            color: 'text-gray-800 dark:text-white',
          },
          {
            label: 'Total Income',
            value: formatCurrency(summary.income),
            color: 'text-emerald-600 dark:text-emerald-400',
          },
          {
            label: 'Total Expenses',
            value: formatCurrency(summary.expense),
            color: 'text-red-600 dark:text-red-400',
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-3 transition-colors duration-200"
          >
            <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
            <p className={`text-sm font-bold mt-0.5 truncate ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Filter bar + Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        {/* Filter bar */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight size={15} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              All Transactions
            </h3>
          </div>
          <FilterBar sort={sort} onSortChange={setSort} />
        </div>

        {/* Table */}
        <TransactionTable transactions={filtered} />
      </div>

      {/* Modal */}
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Transactions;
