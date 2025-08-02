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
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: '',
    },
  });

  const onSubmit = (data: UserFormData) => {
    addUser(data);
    navigate('/');
  };

  // Base input classes; dark-mode variants are merged in below
  const inputBase =
    'block w-full rounded-lg px-4 py-3 text-sm transition focus:outline-none disabled:opacity-50';
  const inputNormal =
    'border border-gray-200 bg-white/95 text-gray-900 placeholder-gray-500 ' +
    'focus:border-blue-500 focus:ring-blue-500/30 ' +
    'dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30';
  const inputError =
    'border border-red-300 bg-white/95 text-gray-900 placeholder-gray-500 ' +
    'focus:border-red-500 focus:ring-red-500/30 ' +
    'dark:border-red-700 dark:bg-neutral-900/70 dark:text-gray-200 dark:placeholder-red-500 dark:focus:border-red-500 dark:focus:ring-red-500/30';

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
        {/* Form Header */}
        <div className="border-b border-gray-200 pb-6 text-center dark:border-neutral-700">
          <h2 className="mb-1 text-3xl font-bold text-gray-900 dark:text-gray-100 text-shadow-sm">
            User Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill in the details to create a new user profile.
          </p>
        </div>

        {/* Form Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Name Field */}
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">👤</span>Full Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`${inputBase} ${
                errors.name ? inputError : inputNormal
              }`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <span className="mr-1">⚠️</span>
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Username Field */}
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">🏷️</span>Username<span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`${inputBase} ${
                errors.username ? inputError : inputNormal
              }`}
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <span className="mr-1">⚠️</span>
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">📧</span>Email Address<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`${inputBase} ${
                errors.email ? inputError : inputNormal
              }`}
              placeholder="user@example.com"
            />
            {errors.email && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <span className="mr-1">⚠️</span>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-1">
            <label
              htmlFor="phone"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">📱</span>Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className={`${inputBase} ${
                errors.phone ? inputError : inputNormal
              }`}
              placeholder="+91 98765 43210"
            />
            {errors.phone && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <span className="mr-1">⚠️</span>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Website Field */}
          <div className="space-y-1">
            <label
              htmlFor="website"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">🌐</span>Website<span className="ml-1 text-xs text-gray-400">(optional)</span>
            </label>
            <input
              id="website"
              type="text"
              {...register('website')}
              className={`${inputBase} ${inputNormal}`}
              placeholder="www.example.com"
            />
          </div>

          {/* Company Field */}
          <div className="space-y-1">
            <label
              htmlFor="company"
              className="mb-1 flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <span className="mr-2">🏢</span>Company<span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              {...register('company')}
              className={`${inputBase} ${
                errors.company ? inputError : inputNormal
              }`}
              placeholder="Company name"
            />
            {errors.company && (
              <p className="mt-1 flex items-center text-sm text-red-500">
                <span className="mr-1">⚠️</span>
                {errors.company.message}
              </p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t border-gray-200 pt-6 dark:border-neutral-700">
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative flex-1 inline-flex items-center justify-center rounded-lg px-6 py-4 font-semibold text-white
                         transition-transform duration-300 focus:outline-none focus-visible:ring-4
                         focus-visible:ring-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed
                         bg-linear-to-r from-green-500 via-teal-500 to-teal-600 hover:from-green-600 hover:via-teal-600 hover:to-teal-700
                         hover:scale-105 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="mr-3 -ml-1 size-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding User...
                </span>
              ) : (
                <span className="flex items-center">
                  <span className="mr-2">✨</span>
                  Add User
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 inline-flex items-center justify-center rounded-lg px-6 py-4 font-semibold
                         text-gray-700 dark:text-gray-200
                         bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700
                         transition-transform duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gray-500/25
                         hover:scale-105"
            >
              <span className="flex items-center">
                <span className="mr-2">↩️</span>
                Cancel
              </span>
            </button>
          </div>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950/40">
        <p className="text-center text-sm text-blue-700 dark:text-blue-300">
          <span className="mr-1">💡</span>
          <strong>Tip:</strong> Make sure all required fields are filled out correctly before submitting.
        </p>
      </div>
    </div>
  );
}
