import React from 'react';
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';
import useApp from '../../hooks/useApp';
import { formatCurrency } from '../../utils/helpers';
import { categoryColors } from '../../data/mockData';

const InsightsPanel = () => {
  const { transactions } = useApp();

  const now = new Date();

  const thisMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const lastMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return (
      d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
    );
  });

  const sumExpense = (arr) =>
    arr.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const sumIncome = (arr) =>
    arr.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);

  const tmExpense = sumExpense(thisMonthTx);
  const lmExpense = sumExpense(lastMonthTx);
  const tmIncome = sumIncome(thisMonthTx);

  const expenseChange =
    lmExpense > 0 ? Math.round(((tmExpense - lmExpense) / lmExpense) * 100) : 0;

  // Highest spending category
  const categoryTotals = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const topCategory = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  )[0];

  // Biggest single expense
  const biggestExpense = transactions
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];

  // Savings rate this month
  const savingsRate =
    tmIncome > 0 ? Math.round(((tmIncome - tmExpense) / tmIncome) * 100) : 0;

  const insights = [
    {
      id: 'top-category',
      icon: Trophy,
      iconBg: 'bg-amber-50 dark:bg-amber-900/20',
      iconColor: 'text-amber-500',
      label: 'Highest Spending Category',
      value: topCategory ? topCategory[0] : '—',
      sub: topCategory
        ? `${formatCurrency(topCategory[1])} total spent`
        : 'No expenses yet',
      accent: topCategory ? categoryColors[topCategory[0]] : '#6b7280',
    },
    {
      id: 'expense-change',
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      iconBg:
        expenseChange > 0
          ? 'bg-red-50 dark:bg-red-900/20'
          : 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: expenseChange > 0 ? 'text-red-500' : 'text-emerald-500',
      label: 'Monthly Expense Change',
      value:
        expenseChange === 0
          ? 'No change'
          : `${expenseChange > 0 ? '+' : ''}${expenseChange}% vs last month`,
      sub:
        lmExpense > 0
          ? `Last month: ${formatCurrency(lmExpense)}`
          : 'No data for last month',
      accent: expenseChange > 0 ? '#f43f5e' : '#10b981',
    },
    {
      id: 'biggest-expense',
      icon: AlertTriangle,
      iconBg: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-500',
      label: 'Biggest Single Expense',
      value: biggestExpense ? formatCurrency(biggestExpense.amount) : '—',
      sub: biggestExpense
        ? `${biggestExpense.description} · ${biggestExpense.category}`
        : 'No expenses yet',
      accent: '#f97316',
    },
    {
      id: 'savings-rate',
      icon: savingsRate >= 20 ? CheckCircle : AlertTriangle,
      iconBg:
        savingsRate >= 20
          ? 'bg-indigo-50 dark:bg-indigo-900/20'
          : 'bg-yellow-50 dark:bg-yellow-900/20',
      iconColor: savingsRate >= 20 ? 'text-indigo-500' : 'text-yellow-500',
      label: 'Savings Rate This Month',
      value: tmIncome > 0 ? `${savingsRate}%` : '—',
      sub:
        tmIncome > 0
          ? savingsRate >= 20
            ? 'Great job! You are saving well.'
            : 'Try to save at least 20% of income.'
          : 'No income recorded this month',
      accent: savingsRate >= 20 ? '#6366f1' : '#eab308',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {insights.map(
        ({ id, icon: Icon, iconBg, iconColor, label, value, sub, accent }) => (
          <div
            key={id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex gap-4 transition-colors duration-200"
            style={{ borderLeftColor: accent, borderLeftWidth: '3px' }}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
            >
              <Icon size={18} className={iconColor} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                {label}
              </p>
              <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white truncate">
                {value}
              </p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                {sub}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default InsightsPanel;
