import type { User } from '../types/User';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-40" onClick={onClose} aria-hidden="true"></div>
      
      {/* Modal */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Username</p>
            <p className="text-gray-900 dark:text-gray-100">{user.username}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p className="text-gray-900 dark:text-gray-100">{user.email}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
            <p className="text-gray-900 dark:text-gray-100">
              {user.address.street}, {user.address.suite}<br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
            <p className="text-gray-900 dark:text-gray-100">{user.phone}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
            <a 
              href={`https://${user.website}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline">
              {user.website}
            </a>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
            <p className="text-gray-900 dark:text-gray-100">{user.company.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{user.company.catchPhrase}"</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
