import { AddUserForm } from '../components/AddUserForm';

export function AddUserPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New User</h1>
      <AddUserForm />
    </div>
  );
}
