import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { categoryColors } from '../../data/mockData';
import useApp from '../../hooks/useApp';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-200">{name}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-0.5">
        ৳{value.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

const SpendingChart = () => {
  const { transactions } = useApp();
  const [activeIndex, setActiveIndex] = useState(null);

  const data = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {}),
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-colors duration-200">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Spending Breakdown
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          By category - all time
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={categoryColors[entry.name] ?? '#6b7280'}
                opacity={
                  activeIndex === null || activeIndex === index ? 1 : 0.5
                }
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-2 space-y-2">
        {data.map((entry) => {
          const pct = total > 0 ? ((entry.value / total) * 100).toFixed(1) : 0;
          return (
            <div
              key={entry.name}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    background: categoryColors[entry.name] ?? '#6b7280',
                  }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {entry.name}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  ৳ {entry.value.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 w-10 text-right">
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingChart;
