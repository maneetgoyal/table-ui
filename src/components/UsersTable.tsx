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
      return <span className="ms-2 text-zinc-400">⇅</span>;
    }
    
    return sortConfig.direction === 'ascending' ? (
      <span className="ms-2 text-sky-600 dark:text-sky-400">↑</span>
    ) : sortConfig.direction === 'descending' ? (
      <span className="ms-2 text-sky-600 dark:text-sky-400">↓</span>
    ) : <span className="ms-2 text-zinc-400">⇅</span>;
  };

  // Helper to get aria-sort value
  const getAriaSort = (key: keyof User) => {
    if (sortConfig.key !== key) return "none";
    return sortConfig.direction === 'ascending' ? "ascending" : 
           sortConfig.direction === 'descending' ? "descending" : "none";
  };

  // Density support
  const isCompact = false; // Can be made configurable
  const headerClasses = isCompact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const cellClasses = isCompact ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 ps-3 flex items-center pointer-events-none">
          <svg className="size-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input 
          type="search"
          id="user-search" 
          className="w-full ps-10 pe-10 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-sky-500 transition-colors placeholder-zinc-500 dark:placeholder-zinc-400" 
          placeholder="Search users..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search users"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pe-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 focus:outline-2 focus:outline-offset-2 focus:outline-sky-500"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
      
      {/* Results Count */}
      <div className="flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-400">
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
      <div className="overflow-x-auto w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <table className="w-full table-auto text-left align-middle">
          <thead>
            <tr className="sticky top-0 z-10 bg-inherit">
              <th scope="col" className="w-1/3" aria-sort={getAriaSort('name')}>
                <button 
                  onClick={() => handleSortClick('name')}
                  className={`${headerClasses} font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left focus:outline-2 focus:outline-offset-2 focus:outline-sky-500`}
                >
                  Name {getSortIndicator('name')}
                </button>
              </th>
              <th scope="col" className="w-1/6" aria-sort={getAriaSort('username')}>
                <button 
                  onClick={() => handleSortClick('username')}
                  className={`${headerClasses} font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left focus:outline-2 focus:outline-offset-2 focus:outline-sky-500`}
                >
                  Username {getSortIndicator('username')}
                </button>
              </th>
              <th scope="col" className="w-1/3" aria-sort={getAriaSort('email')}>
                <button 
                  onClick={() => handleSortClick('email')}
                  className={`${headerClasses} font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left focus:outline-2 focus:outline-offset-2 focus:outline-sky-500`}
                >
                  Email {getSortIndicator('email')}
                </button>
              </th>
              <th scope="col" className="w-1/6" aria-sort={getAriaSort('website')}>
                <button 
                  onClick={() => handleSortClick('website')}
                  className={`${headerClasses} font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left focus:outline-2 focus:outline-offset-2 focus:outline-sky-500`}
                >
                  Website {getSortIndicator('website')}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-zinc-500 dark:text-zinc-400">
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
                  className="odd:bg-white even:bg-zinc-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer border-b border-zinc-200 dark:border-zinc-800"
                  onClick={() => handleRowClick(user)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className={`${cellClasses} text-zinc-800 dark:text-zinc-200`}>
                    <div className="flex items-center">
                      <div className="size-10 rounded-full flex items-center justify-center text-white text-base font-bold bg-gradient-to-br from-sky-600 to-sky-700 shadow">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ms-4">
                        <div className="font-medium text-zinc-800 dark:text-zinc-200">{user.name}</div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{user.company.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`${cellClasses} text-zinc-800 dark:text-zinc-200`}>
                    <span className="whitespace-nowrap">@{user.username}</span>
                  </td>
                  <td className={`${cellClasses} text-zinc-800 dark:text-zinc-200`}>
                    <div className="truncate max-w-[16rem]">{user.email}</div>
                  </td>
                  <td className={`${cellClasses} text-zinc-800 dark:text-zinc-200`}>
                    <a 
                      href={`https://${user.website}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors inline-block truncate max-w-[16rem] focus:outline-2 focus:outline-offset-2 focus:outline-sky-500"
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
