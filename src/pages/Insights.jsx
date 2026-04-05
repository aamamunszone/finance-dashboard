import React from 'react';
import { Lightbulb } from 'lucide-react';
import InsightsPanel from '../components/insights/InsightsPanel';
import MonthlyComparisonChart from '../components/insights/MonthlyComparisonChart';
import CategoryBreakdownTable from '../components/insights/CategoryBreakdownTable';

const Insights = () => {
  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Understand your spending patterns and financial health
        </p>
      </div>

      {/* Key insight cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={14} className="text-amber-500" />
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Key Observations
          </h2>
        </div>
        <InsightsPanel />
      </div>

      {/* Monthly comparison chart */}
      <MonthlyComparisonChart />

      {/* Category breakdown */}
      <CategoryBreakdownTable />
    </div>
  );
};

export default Insights;
