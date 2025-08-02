import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserModal } from './UserModal';
import type { User } from '../types/User';

export function UsersTable() {
  const { filteredUsers, searchTerm, setSearchTerm, sortConfig, setSortConfig } = useUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleSortClick = (key: keyof User) => {
    setSortConfig(key);
  };

  // Helper to render sort indicator
  const getSortIndicator = (key: keyof User) => {
    if (sortConfig.key !== key) return null;
    
    return sortConfig.direction === 'ascending' ? (
      <span className="ml-1">↑</span>
    ) : sortConfig.direction === 'descending' ? (
      <span className="ml-1">↓</span>
    ) : null;
  };

  return (
    <div>
      {/* Search input */}
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search"
            id="user-search" 
            className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search users by name or email" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search users"
          />
        </div>
      </div>
      
      {/* Users table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortClick('name')}>
                Name {getSortIndicator('name')}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortClick('username')}>
                Username {getSortIndicator('username')}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortClick('email')}>
                Email {getSortIndicator('email')}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSortClick('website')}>
                Website {getSortIndicator('website')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  {searchTerm ? 'No matching users found.' : 'No users available.'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleRowClick(user)}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.website}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* User modal */}
      {selectedUser && (
        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
}
