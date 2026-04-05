import React from 'react';

const Badge = ({ type }) => {
  const styles = {
    income:
      'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    expense: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize ${styles[type] ?? styles.expense}`}
    >
      {type}
    </span>
  );
};

export default Badge;
