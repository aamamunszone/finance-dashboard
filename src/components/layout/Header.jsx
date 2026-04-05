import React from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import RoleSwitcher from '../ui/RoleSwitcher';
import useApp from '../../hooks/useApp';

const Header = ({ onMenuClick }) => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <header className="h-16 shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-5 transition-colors duration-200">
      {/* Left - mobile hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-colors lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Left - desktop greeting */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-800 dark:text-white">
          Welcome back 👋
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        <RoleSwitcher />

        <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1 shrink-0" />

        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
