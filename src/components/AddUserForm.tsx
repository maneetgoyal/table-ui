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

  // Shared input classes to reduce redundancy
  const inputBaseClasses = "w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:outline-none transition-all duration-300";
  const inputErrorClasses = "border-red-300 focus:border-red-500 focus:ring-red-500/20";
  const inputNormalClasses = "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20";

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Form Header */}
        <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">👤 User Information</h2>
          <p className="text-gray-600 dark:text-gray-400">Fill in the details to create a new user profile</p>
        </div>
        
        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">👤</span>
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}
              className={`${inputBaseClasses} ${
                errors.name ? inputErrorClasses : inputNormalClasses
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <span className="mr-1">⚠️</span>
                {errors.name.message}
              </p>
            )}
          </div>
          
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">🏷️</span>
              Username*
            </label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`${inputBaseClasses} ${
                errors.username ? inputErrorClasses : inputNormalClasses
              }`}
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <span className="mr-1">⚠️</span>
                {errors.username.message}
              </p>
            )}
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">📧</span>
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`${inputBaseClasses} ${
                errors.email ? inputErrorClasses : inputNormalClasses
              }`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <span className="mr-1">⚠️</span>
                {errors.email.message}
              </p>
            )}
          </div>
          
          {/* Phone Field */}
          <div className="space-y-2">
            <label htmlFor="phone" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">📱</span>
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className={`${inputBaseClasses} ${
                errors.phone ? inputErrorClasses : inputNormalClasses
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <span className="mr-1">⚠️</span>
                {errors.phone.message}
              </p>
            )}
          </div>
          
          {/* Website Field */}
          <div className="space-y-2">
            <label htmlFor="website" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">🌐</span>
              Website
              <span className="ml-1 text-gray-400 text-xs">(optional)</span>
            </label>
            <input
              type="text"
              id="website"
              {...register('website')}
              className={`${inputBaseClasses} ${inputNormalClasses}`}
              placeholder="www.example.com"
            />
          </div>
          
          {/* Company Field */}
          <div className="space-y-2">
            <label htmlFor="company" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span className="mr-2">🏢</span>
              Company*
            </label>
            <input
              type="text"
              id="company"
              {...register('company')}
              className={`${inputBaseClasses} ${
                errors.company ? inputErrorClasses : inputNormalClasses
              }`}
              placeholder="Company name"
            />
            {errors.company && (
              <p className="flex items-center text-red-500 text-sm mt-1">
                <span className="mr-1">⚠️</span>
                {errors.company.message}
              </p>
            )}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 size-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding User...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">✨</span>
                Add User
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl focus:outline-none focus:ring-4 focus:ring-gray-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">↩️</span>
              Cancel
            </span>
          </button>
        </div>
      </form>
      
      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-center text-blue-700 dark:text-blue-300 text-sm">
          <span className="mr-1">💡</span>
          <strong>Tip:</strong> Make sure all required fields are filled out correctly before submitting
        </p>
      </div>
    </div>
  );
}
