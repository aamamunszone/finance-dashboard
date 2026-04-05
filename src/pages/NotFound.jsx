import React from 'react';
import { Link } from 'react-router';
import { AlertCircle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      <div className="text-center max-w-sm w-full">
        {/* Icon */}
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle
            size={36}
            className="text-indigo-500 dark:text-indigo-400"
          />
        </div>

        {/* Code */}
        <p className="text-8xl font-black text-indigo-600 dark:text-indigo-500 leading-none select-none">
          404
        </p>

        <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
        >
          <Home size={15} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
