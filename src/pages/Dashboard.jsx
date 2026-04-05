import React, { useMemo } from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowLeftRight } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingChart from '../components/dashboard/SpendingChart';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import useApp from '../hooks/useApp';
import { formatCurrency, formatDate } from '../utils/helpers';

const Dashboard = () => {
  const { transactions } = useApp();

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = (t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    };
    const lastMonth = (t) => {
      const d = new Date(t.date);
      const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return (
        d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear()
      );
    };

    const sumIncome = (arr) =>
      arr.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const sumExpense = (arr) =>
      arr.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

    const tmTx = transactions.filter(thisMonth);
    const lmTx = transactions.filter(lastMonth);

    const tmIncome = sumIncome(tmTx);
    const lmIncome = sumIncome(lmTx);
    const tmExpense = sumExpense(tmTx);
    const lmExpense = sumExpense(lmTx);
    const totalBalance = transactions.reduce(
      (s, t) => (t.type === 'income' ? s + t.amount : s - t.amount),
      0,
    );

    const pct = (curr, prev) =>
      prev === 0 ? 0 : Math.round(((curr - prev) / prev) * 100);

    return {
      totalBalance,
      tmIncome,
      tmExpense,
      incomeChange: pct(tmIncome, lmIncome),
      expenseChange: pct(tmExpense, lmExpense),
    };
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);

  const summaryCards = [
    {
      title: 'Total Balance',
      amount: formatCurrency(stats.totalBalance),
      icon: Wallet,
      iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      change: 0,
      changeLabel: 'Overall balance',
    },
    {
      title: 'Monthly Income',
      amount: formatCurrency(stats.tmIncome),
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 dark:bg-emerald-900/20',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      change: stats.incomeChange,
      changeLabel: 'vs last month',
    },
    {
      title: 'Monthly Expenses',
      amount: formatCurrency(stats.tmExpense),
      icon: TrendingDown,
      iconBg: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      change: -stats.expenseChange,
      changeLabel: 'vs last month',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Your financial summary at a glance
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="xl:col-span-1">
          <SpendingChart />
        </div>
      </div>

      {/* Recent transactions */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <ArrowLeftRight size={15} className="text-gray-400" />
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
              Recent Transactions
            </h3>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Last 5
          </span>
        </div>

        {recentTransactions.length === 0 ? (
          <EmptyState
            title="No transactions yet"
            description="Add a transaction to get started."
          />
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    {tx.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    {formatDate(tx.date)} · {tx.category}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge type={tx.type} />
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
