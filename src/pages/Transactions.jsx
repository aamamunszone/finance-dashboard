import React, { useMemo, useState } from 'react';
import { Plus, ArrowLeftRight, Download, RotateCcw } from 'lucide-react';
import FilterBar from '../components/transactions/FilterBar';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import useApp from '../hooks/useApp';
import { formatCurrency, exportToCSV } from '../utils/helpers';

const Transactions = () => {
  const { transactions, filters, role, resetTransactions } = useApp();
  const [sort, setSort] = useState('date-desc');
  const [showModal, setShowModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage and explore your financial activity
          </p>
        </div>

        {/* Admin actions */}
        {role === 'admin' && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Export CSV */}
            <button
              onClick={() => exportToCSV(filtered)}
              className="flex items-center gap-2 h-9 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium rounded-lg transition-colors"
            >
              <Download size={13} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Reset */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 h-9 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-medium rounded-lg transition-colors"
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">Reset Data</span>
            </button>

            {/* Add */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 h-9 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shadow-indigo-200 dark:shadow-indigo-900/30"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Transaction</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
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

      {/* Filter + Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight size={15} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              All Transactions
            </h3>
          </div>
          <FilterBar sort={sort} onSortChange={setSort} />
        </div>
        <TransactionTable transactions={filtered} />
      </div>

      {/* Add modal */}
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}

      {/* Reset confirm modal */}
      {showResetConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) =>
            e.target === e.currentTarget && setShowResetConfirm(false)
          }
        >
          <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 transition-colors duration-200">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <RotateCcw size={20} className="text-red-500" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white text-center">
              Reset All Data?
            </h3>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center leading-relaxed">
              This will remove all your transactions and restore the original
              demo data. This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetTransactions();
                  setShowResetConfirm(false);
                }}
                className="flex-1 h-9 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
