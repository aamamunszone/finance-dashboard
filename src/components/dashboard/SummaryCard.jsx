import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SummaryCard = ({
  title,
  amount,
  icon: Icon,
  iconBg,
  iconColor,
  change,
  changeLabel,
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex flex-col gap-4 transition-colors duration-200">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-white truncate">
            {amount}
          </p>
        </div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
        >
          <Icon size={18} className={iconColor} />
        </div>
      </div>

      {/* Bottom row - change indicator */}
      <div className="flex items-center gap-1.5">
        {isNeutral ? (
          <Minus size={13} className="text-gray-400 shrink-0" />
        ) : isPositive ? (
          <TrendingUp size={13} className="text-emerald-500 shrink-0" />
        ) : (
          <TrendingDown size={13} className="text-red-500 shrink-0" />
        )}
        <span
          className={`text-xs font-semibold ${
            isNeutral
              ? 'text-gray-400'
              : isPositive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400'
          }`}
        >
          {isNeutral ? '-' : `${isPositive ? '+' : ''}${change}%`}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {changeLabel}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
