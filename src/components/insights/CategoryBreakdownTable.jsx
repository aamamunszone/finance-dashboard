import React from 'react';
import { categoryColors } from '../../data/mockData';
import { formatCurrency } from '../../utils/helpers';
import useApp from '../../hooks/useApp';
import EmptyState from '../ui/EmptyState';

const CategoryBreakdownTable = () => {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === 'expense');
  const total = expenses.reduce((s, t) => s + t.amount, 0);

  const rows = Object.entries(
    expenses.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = { total: 0, count: 0 };
      acc[t.category].total += t.amount;
      acc[t.category].count += 1;
      return acc;
    }, {}),
  )
    .map(([category, { total: amt, count }]) => ({ category, amt, count }))
    .sort((a, b) => b.amt - a.amt);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Category Breakdown
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Spending distribution by category
        </p>
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No expense data"
          description="Add some transactions to see your spending breakdown."
        />
      ) : (
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {rows.map(({ category, amt, count }) => {
            const pct = total > 0 ? (amt / total) * 100 : 0;
            const color = categoryColors[category] ?? '#6b7280';

            return (
              <div key={category} className="px-5 py-3.5">
                {/* Top row */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {category}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0">
                      {count} tx
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {pct.toFixed(1)}%
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {formatCurrency(amt)}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryBreakdownTable;
