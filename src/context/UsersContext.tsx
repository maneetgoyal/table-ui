import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User, UserFormData } from '../types/User';
import { fetchUsers } from '../services/userService';

interface UsersContextType {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  selectedUser: User | null;
  searchTerm: string;
  sortConfig: {
    key: keyof User | null;
    direction: 'ascending' | 'descending' | null;
  };
  fetchAllUsers: () => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setSearchTerm: (term: string) => void;
  setSortConfig: (key: keyof User) => void;
  addUser: (user: UserFormData) => void;
}

export const UsersContext = createContext<UsersContextType | undefined>(undefined);

interface UsersProviderProps {
  children: ReactNode;
}

export function UsersProvider({ children }: UsersProviderProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User | null;
    direction: 'ascending' | 'descending' | null;
  }>({
    key: null,
    direction: null,
  });

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSort = useCallback((key: keyof User) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
    
    if (!direction) {
      setFilteredUsers([...users]);
      return;
    }
    
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === 'address' || key === 'company') {
        return 0; // These are complex objects, handle specific properties instead
      }
      
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredUsers(sortedUsers);
  }, [filteredUsers, sortConfig, users]);

  // Apply search filter when search term changes
  const applySearchFilter = useCallback((term: string) => {
    if (!term.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const lowerTerm = term.toLowerCase();
    const filtered = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm)
      );
    });
    
    setFilteredUsers(filtered);
  }, [users]);
  
  // Add a new user
  const addUser = useCallback((userData: UserFormData) => {
    const newUser: User = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company: {
        name: userData.company,
        catchPhrase: '',
        bs: ''
      },
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      }
    };
    
    setUsers(prevUsers => [...prevUsers, newUser]);
    setFilteredUsers(prevUsers => [...prevUsers, newUser]);
  }, [users]);

  // Update filtered users when search term changes
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    applySearchFilter(term);
  }, [applySearchFilter]);

  const value = {
    users,
    filteredUsers,
    loading,
    error,
    selectedUser,
    searchTerm,
    sortConfig,
    fetchAllUsers,
    setSelectedUser,
    setSearchTerm: handleSearch,
    setSortConfig: handleSort,
    addUser,
  };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}
