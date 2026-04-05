import { createContext, useContext, useState } from 'react';
import { mockTransactions } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
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

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        transactions,
        role,
        setRole,
        filters,
        setFilters,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
};
