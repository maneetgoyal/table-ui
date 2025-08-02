import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-0">
              <Link to="/" className="hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                User Dashboard
              </Link>
            </h1>
            
            <nav className="bg-gray-100 rounded-full p-1">
              <ul className="flex space-x-1">
                <li>
                  <Link 
                    to="/" 
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      location.pathname === '/' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                  >
                    📊 User List
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/add" 
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      location.pathname === '/add' 
                        ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                    aria-current={location.pathname === '/add' ? 'page' : undefined}
                  >
                    ➕ Add User
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
      
      <footer className="bg-white/60 backdrop-blur-md shadow-inner mt-16 border-t border-gray-200/50">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              User Dashboard © {new Date().getFullYear()} • Built with ❤️ using React & TypeScript
            </p>
            <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center">⚡ Powered by Vite</span>
              <span className="flex items-center">🎨 Styled with Tailwind</span>
              <span className="flex items-center">🔧 TypeScript Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
