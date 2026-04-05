import { useEffect } from 'react';
import { useLocation } from 'react-router';

const titles = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = titles[pathname] ?? 'Not Found';
    document.title = `Finance Dashboard | ${page}`;
  }, [pathname]);

  return null;
};

export default PageTitle;
