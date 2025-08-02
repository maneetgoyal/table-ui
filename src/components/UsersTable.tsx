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
    if (sortConfig.key !== key) {
      return <span className="ml-2 text-gray-400">⇅</span>;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <span className="ml-2 text-blue-500">↑</span>
    ) : sortConfig.direction === 'descending' ? (
      <span className="ml-2 text-blue-500">↓</span>
    ) : <span className="ml-2 text-gray-400">⇅</span>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Section */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          type="search"
          id="user-search" 
          className="w-full pl-12 pr-4 py-4 text-lg bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400" 
          placeholder="🔍 Search users by name or email..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      
      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {searchTerm ? (
            <>Found <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredUsers.length}</span> users matching "{searchTerm}"</>
          ) : (
            <>Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{filteredUsers.length}</span> users</>
          )}
        </p>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          💡 Click on any row to view details
        </div>
      </div>
      
      {/* Users table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" 
                onClick={() => handleSortClick('name')}
              >
                <div className="flex items-center">
                  👤 Name {getSortIndicator('name')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" 
                onClick={() => handleSortClick('username')}
              >
                <div className="flex items-center">
                  🏷️ Username {getSortIndicator('username')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" 
                onClick={() => handleSortClick('email')}
              >
                <div className="flex items-center">
                  📧 Email {getSortIndicator('email')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-4 text-left font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200" 
                onClick={() => handleSortClick('website')}
              >
                <div className="flex items-center">
                  🌐 Website {getSortIndicator('website')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="text-4xl">🔍</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {searchTerm ? (
                        <>
                          <p className="font-medium">No users found matching "{searchTerm}"</p>
                          <p className="text-sm mt-1">Try adjusting your search terms</p>
                        </>
                      ) : (
                        <p>No users available</p>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="bg-white dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
                  onClick={() => handleRowClick(user)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{user.company.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      @{user.username}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 dark:text-white">{user.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <a 
                      href={`https://${user.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user.website}
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  </td>
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
