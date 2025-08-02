import { AddUserForm } from '../components/AddUserForm';

export function AddUserPage() {
  return (
    <div className="space-y-10 px-4 py-10 sm:px-8">
      {/* Header Section */}
      <header className="text-center">
        <h1
          className="mb-3 inline-block bg-linear-to-r from-green-600 via-teal-500 to-teal-400 bg-clip-text text-transparent
                     text-5xl font-extrabold tracking-tight text-shadow-md"
        >
          Add New User
        </h1>
        <p className="mx-auto max-w-prose text-base text-gray-600 dark:text-gray-300">
          Create a new user profile with their essential information. All fields
          marked with an asterisk (*) are required.
        </p>
      </header>

      {/* Form Container */}
      <section className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div
            className="rounded-3xl bg-white/60 p-8 shadow-2xl ring-1 ring-gray-200 backdrop-blur-md
                       dark:bg-neutral-800/60 dark:ring-neutral-700"
          >
            <AddUserForm />
          </div>
        </div>
      </section>
    </div>
  );
}
