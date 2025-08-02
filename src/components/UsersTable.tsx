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

  // Shared classes to reduce redundancy
  const headerBaseClasses = "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors";
  const cellClasses = "px-6 py-4 whitespace-nowrap";
  const textClasses = "text-sm text-gray-900 dark:text-white";

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          type="search"
          id="user-search" 
          className="w-full pl-10 pr-10 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-colors placeholder-gray-500 dark:placeholder-gray-400" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      
      {/* Results Count */}
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span>
          {searchTerm ? (
            <>Found {filteredUsers.length} users matching "{searchTerm}"</>
          ) : (
            <>{filteredUsers.length} users</>
          )}
        </span>
        <span className="text-xs">
          Click any row for details
        </span>
      </div>
      
      {/* Users table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th 
                scope="col" 
                className={`${headerBaseClasses} w-2/5`}
                onClick={() => handleSortClick('name')}
              >
                Name {getSortIndicator('name')}
              </th>
              <th 
                scope="col" 
                className={`${headerBaseClasses} w-1/5`}
                onClick={() => handleSortClick('username')}
              >
                Username {getSortIndicator('username')}
              </th>
              <th 
                scope="col" 
                className={`${headerBaseClasses} w-1/4`}
                onClick={() => handleSortClick('email')}
              >
                Email {getSortIndicator('email')}
              </th>
              <th 
                scope="col" 
                className={`${headerBaseClasses} w-1/6`}
                onClick={() => handleSortClick('website')}
              >
                Website {getSortIndicator('website')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm ? (
                    <div>
                      <p className="font-medium">No users found matching "{searchTerm}"</p>
                      <p className="text-sm mt-1">Try adjusting your search terms</p>
                    </div>
                  ) : (
                    <p>No users available</p>
                  )}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(user)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className={cellClasses}>
                    <div className="flex items-center">
                      <div className="size-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className={`${textClasses} font-medium`}>{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.company.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={cellClasses}>
                    <span className={textClasses}>@{user.username}</span>
                  </td>
                  <td className={cellClasses}>
                    <div className={textClasses}>{user.email}</div>
                  </td>
                  <td className={cellClasses}>
                    <a 
                      href={`https://${user.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user.website}
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
