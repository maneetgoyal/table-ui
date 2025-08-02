import { AddUserForm } from '../components/AddUserForm';

export function AddUserPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Add New User
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Create a new user profile with their essential information. All fields marked with an asterisk (*) are required.
        </p>
      </div>
      
      {/* Form Container */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <AddUserForm />
          </div>
        </div>
      </div>
    </div>
  );
}
