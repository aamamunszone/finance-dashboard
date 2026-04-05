import React from 'react';
import { Eye, ShieldCheck } from 'lucide-react';
import useApp from '../../hooks/useApp';

const roles = [
  { value: 'viewer', icon: Eye, label: 'Viewer' },
  { value: 'admin', icon: ShieldCheck, label: 'Admin' },
];

const RoleSwitcher = () => {
  const { role, setRole } = useApp();

  return (
    <div
      className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1"
      role="group"
      aria-label="Switch role"
    >
      {roles.map((item) => {
        const { value, icon: Icon, label } = item;
        const isActive = role === value;

        return (
          <button
            key={value}
            onClick={() => setRole(value)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
              isActive
                ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <Icon size={12} className="shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSwitcher;
