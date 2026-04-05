import React, { useEffect, useState } from 'react';
import { mockTransactions } from '../data/mockData';
import { AppContext } from '../contexts/AppContext';

// Detect system preference
const getInitialDarkMode = () => {
  const stored = localStorage.getItem('darkMode');
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('viewer');
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
  });

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  };

  // Global dark mode - applies to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const value = {
    darkMode,
    setDarkMode,
    transactions,
    role,
    setRole,
    filters,
    setFilters,
    addTransaction,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
