import { Link, Outlet, useLocation } from 'react-router-dom';

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
              <Link to="/">User Dashboard</Link>
            </h1>
            
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link 
                    to="/" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                  >
                    User List
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/add" 
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === '/add' 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-current={location.pathname === '/add' ? 'page' : undefined}
                  >
                    Add User
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            User Dashboard © {new Date().getFullYear()} - Built with React
          </p>
        </div>
      </footer>
    </div>
  );
}
