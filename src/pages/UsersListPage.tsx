import { useEffect } from 'react';
import { UsersTable } from '../components/UsersTable';
import { useUsers } from '../hooks/useUsers';

export function UsersListPage() {
  const { fetchAllUsers, loading, error } = useUsers();
  
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">User Dashboard</h1>
      
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {!loading && !error && <UsersTable />}
    </div>
  );
}
