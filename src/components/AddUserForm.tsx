import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import type { UserFormData } from '../types/User';

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Phone number must be at least 6 characters'),
  website: z.string().optional(),
  company: z.string().min(2, 'Company name must be at least 2 characters')
});

export function AddUserForm() {
  const navigate = useNavigate();
  const { addUser } = useUsers();
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: ''
    }
  });

  const onSubmit = (data: UserFormData) => {
    addUser(data);
    navigate('/');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Add New User</h2>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Name*
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic mt-1">{errors.name.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Username*
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="johndoe"
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic mt-1">{errors.username.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Email*
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Phone*
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="123-456-7890"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="website" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Website
          </label>
          <input
            type="text"
            id="website"
            {...register('website')}
            className={`shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="example.com"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
            Company*
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className={`shadow appearance-none border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Acme Inc."
          />
          {errors.company && (
            <p className="text-red-500 text-xs italic mt-1">{errors.company.message}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add User'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
      
      <p className="text-center text-gray-500 text-xs dark:text-gray-400">
        Fields marked with * are required
      </p>
    </div>
  );
}
