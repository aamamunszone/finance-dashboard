import React, { useEffect, useState } from 'react';
import { mockTransactions } from '../data/mockData';
import { AppContext } from '../contexts/AppContext';

const getInitialDarkMode = () => {
  const stored = localStorage.getItem('darkMode');
  if (stored !== null) return stored === 'true';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialTransactions = () => {
  try {
    const stored = localStorage.getItem('transactions');
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return mockTransactions;
};

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [role, setRole] = useState('viewer');
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
  });

  // Persist dark mode
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [{ ...tx, id: Date.now() }, ...prev]);
  };

  // Reset to mock data
  const resetTransactions = () => {
    setTransactions(mockTransactions);
  };

  const value = {
    darkMode,
    setDarkMode,
    transactions,
    role,
    setRole,
    filters,
    setFilters,
    addTransaction,
    resetTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
