import { useEffect } from 'react';
import { UsersTable } from '../components/UsersTable';
import { useUsers } from '../hooks/useUsers';

export function UsersListPage() {
  const { fetchAllUsers, loading, error } = useUsers();
  
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          User Management Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover, search, and manage your users with our intuitive dashboard. Click on any user to view detailed information.
        </p>
      </div>
      
      {/* Loading State */}
      {loading && (
                <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="relative">
            <div className="size-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
            <div className="size-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">Loading users...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-6 py-4 rounded-xl shadow-lg" role="alert">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="size-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Oops! Something went wrong</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Users Table */}
      {!loading && !error && (
        <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <UsersTable />
        </div>
      )}
    </div>
  );
}
