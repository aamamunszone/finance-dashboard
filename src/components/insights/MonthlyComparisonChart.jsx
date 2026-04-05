import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { monthlyTrend } from '../../data/mockData';
import useApp from '../../hooks/useApp';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 text-xs">
      <p className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          style={{ color: entry.color }}
          className="flex items-center gap-2"
        >
          <span className="capitalize">{entry.name}:</span>
          <span className="font-bold">
            ৳ {entry.value.toLocaleString('en-IN')}
          </span>
        </p>
      ))}
    </div>
  );
};

const MonthlyComparisonChart = () => {
  const { darkMode } = useApp();
  const axisColor = darkMode ? '#6b7280' : '#9ca3af';
  const gridColor = darkMode ? '#1f2937' : '#f3f4f6';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-colors duration-200">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Monthly Comparison
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Income vs expenses over the last 6 months
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={monthlyTrend}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={gridColor}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `৳ ${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            formatter={(value) => (
              <span className="text-gray-500 dark:text-gray-400 capitalize">
                {value}
              </span>
            )}
          />
          <Bar dataKey="income" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
