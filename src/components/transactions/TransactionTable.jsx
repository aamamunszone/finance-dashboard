import React from 'react';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { categoryColors } from '../../data/mockData';

const TransactionTable = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or add a new transaction."
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              {['Date', 'Description', 'Category', 'Type', 'Amount'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
              >
                <td className="px-5 py-3.5 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {formatDate(tx.date)}
                </td>
                <td className="px-5 py-3.5">
                  <p className="font-medium text-gray-800 dark:text-gray-100 truncate max-w-45">
                    {tx.description}
                  </p>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        background: categoryColors[tx.category] ?? '#6b7280',
                      }}
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {tx.category}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Badge type={tx.type} />
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <span
                    className={`font-semibold ${
                      tx.type === 'income'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-gray-50 dark:divide-gray-800">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Category dot */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: `${categoryColors[tx.category] ?? '#6b7280'}22`,
                }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: categoryColors[tx.category] ?? '#6b7280',
                  }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {tx.description}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {formatDate(tx.date)} · {tx.category}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span
                className={`text-sm font-semibold ${
                  tx.type === 'income'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {tx.type === 'income' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </span>
              <Badge type={tx.type} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionTable;
