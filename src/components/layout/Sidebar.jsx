import React from 'react';
import {
  ArrowLeftRight,
  LayoutDashboard,
  Lightbulb,
  TrendingUp,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-30 flex flex-col
          bg-gray-950 border-r border-gray-800
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <TrendingUp size={15} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">
                Finance
              </p>
              <p className="text-indigo-400 text-xs font-medium leading-tight">
                Dashboard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="text-gray-500 hover:text-white transition-colors lg:hidden p-1 ml-2 shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav label */}
        <div className="px-4 pt-5 pb-2 shrink-0">
          <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest">
            Navigation
          </p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const { to, icon: Icon, label } = item;
            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                      : 'text-gray-400 hover:bg-gray-800/80 hover:text-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      className={`shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`}
                    />
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-800 shrink-0">
          <p className="text-xs text-gray-600">© 2026 Finance Dashboard</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
