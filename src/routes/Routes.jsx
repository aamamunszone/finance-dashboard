import { createBrowserRouter } from 'react-router';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Transactions from '../pages/Transactions';
import Insights from '../pages/Insights';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  // MainLayout Routes
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'transactions', Component: Transactions },
      { path: 'insights', Component: Insights },
    ],
  },

  // Error Route
  {
    path: '*',
    Component: NotFound,
  },
]);
