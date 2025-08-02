import { createContext } from 'react';
import type { User, UserFormData } from '../types/User';

export interface UsersContextType {
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
