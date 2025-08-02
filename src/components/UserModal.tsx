import type { User } from '../types/User';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn" 
      aria-modal="true" 
      role="dialog"
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose} 
        aria-hidden="true"
      ></div>
      
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 z-10 transform transition-all duration-300 animate-slideUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-2xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="size-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-white/80">@{user.username}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
            aria-label="Close"
          >
            <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📞 Contact Information
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Email Address</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900">{user.email}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(user.email)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    title="Copy email"
                  >
                    📋
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-500 mb-1">Phone Number</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900">{user.phone}</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText(user.phone)}
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                    title="Copy phone"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              📍 Address
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-gray-900 leading-relaxed">
                {user.address.street}, {user.address.suite}<br />
                {user.address.city}, {user.address.zipcode}
              </div>
            </div>
          </div>
          
          {/* Online Presence */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              🌐 Online Presence
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Website</p>
              <a 
                href={`https://${user.website}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                <span>{user.website}</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              🏢 Company
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">{user.company.name}</h4>
              <p className="text-sm text-gray-600 italic">"{user.company.catchPhrase}"</p>
              <p className="text-xs text-gray-500 mt-1">{user.company.bs}</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
