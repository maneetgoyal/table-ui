import type { User } from '../types/User';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserModal({ user, onClose }: UserModalProps) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-8"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white/80 shadow-2xl ring-1 ring-gray-200 backdrop-blur-lg
                   dark:bg-neutral-800/90 dark:ring-neutral-700 animate-slideUp"
      >
        {/* Header */}
        <header className="relative rounded-t-3xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-xl font-bold backdrop-blur-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-shadow-sm">{user.name}</h2>
              <p className="text-white/80">@{user.username}</p>
            </div>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-white/80
                       transition hover:bg-white/20 hover:text-white focus:outline-none"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-8">
          {/* Contact Information */}
          <section className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              📞 Contact Information
            </h3>
            <div className="space-y-4">
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-gray-200 dark:bg-neutral-900/70 dark:ring-neutral-700">
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100">{user.email}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(user.email)}
                    className="text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    title="Copy email"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-gray-200 dark:bg-neutral-900/70 dark:ring-neutral-700">
                <p className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-900 dark:text-gray-100">{user.phone}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(user.phone)}
                    className="text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                    title="Copy phone"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              📍 Address
            </h3>
            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-gray-200 dark:bg-neutral-900/70 dark:ring-neutral-700">
              <p className="leading-relaxed text-gray-900 dark:text-gray-100">
                {user.address.street}, {user.address.suite}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          </section>

          {/* Online Presence */}
          <section className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              🌐 Online Presence
            </h3>
            <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-gray-200 dark:bg-neutral-900/70 dark:ring-neutral-700">
              <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">Website</p>
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 font-medium text-blue-600 transition-colors hover:text-blue-800
                           dark:text-blue-400 dark:hover:text-blue-500"
              >
                <span>{user.website}</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>

          {/* Company */}
          <section className="space-y-4">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
              🏢 Company
            </h3>
            <div
              className="rounded-2xl bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 p-4 ring-1 ring-blue-200
                         dark:from-neutral-800/50 dark:via-neutral-800/40 dark:to-neutral-800/50 dark:ring-neutral-700"
            >
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{user.company.name}</h4>
              <p className="italic text-sm text-gray-600 dark:text-gray-400">"{user.company.catchPhrase}"</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{user.company.bs}</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="rounded-b-3xl bg-gray-50 p-6 dark:bg-neutral-900/80">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white
                       transition-transform duration-300 hover:scale-105 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/25"
          >
            Close Profile
          </button>
        </footer>
      </div>
    </div>
  );
}
