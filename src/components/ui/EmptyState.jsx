import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({
  title = 'No data found',
  description = 'Nothing to display here yet.',
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mb-4">
        <Inbox size={24} className="text-gray-400 dark:text-gray-500" />
      </div>
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500 max-w-xs">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
