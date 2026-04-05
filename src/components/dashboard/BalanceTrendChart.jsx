import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
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

const BalanceTrendChart = () => {
  const { darkMode } = useApp();
  const axisColor = darkMode ? '#6b7280' : '#9ca3af';
  const gridColor = darkMode ? '#1f2937' : '#f3f4f6';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 transition-colors duration-200">
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
          Balance Trend
        </h3>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
          Last 6 months overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={monthlyTrend}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
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
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
            formatter={(value) => (
              <span className="text-gray-500 dark:text-gray-400 capitalize">
                {value}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3, fill: '#6366f1' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ r: 3, fill: '#f43f5e' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ r: 3, fill: '#10b981' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
