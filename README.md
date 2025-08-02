# User Dashboard Application

A modern React application that provides a dashboard to view, search, and manage users.

## Features

- **User List View**: A responsive, searchable, and sortable table of users fetched from a public API
- **User Details**: View detailed user information in a modal by clicking on a table row
- **Add User**: Form to create new users with validation
- **Routing**: Client-side navigation between views
- **Dark/Light Mode**: Automatic theme detection based on system preferences

## Tech Stack

- **React**: Functional components with hooks
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling and responsive design
- **React Router**: For client-side routing
- **Tanstack Table**: For advanced table features
- **React Hook Form**: For form management with validation
- **Zod**: Schema validation
- **Axios**: API requests
- **Vitest**: Testing framework
- **React Testing Library**: Component testing

## Architecture Decisions

### State Management
- **Context API**: Used for global state management since the application has moderate complexity.
  - Provides shared user data and actions across components
  - Avoids prop drilling
  - Simpler than Redux for this scale of application

### Component Structure
- **Feature-based organization**: Components are organized by feature rather than type
- **Atomic Design Principles**: Smaller, reusable components that can be composed into larger interfaces

### Styling
- **Tailwind CSS**: Used for utility-first CSS approach
  - Faster development with predefined utilities
  - Consistent design system
  - Built-in responsive design utilities

### Performance Optimizations
- **React.memo & useCallback**: Used to prevent unnecessary re-renders
- **Lazy Loading**: Routes are loaded lazily to improve initial load time
- **Optimized Rendering**: Table rows render efficiently even with large datasets

### Accessibility
- **ARIA attributes**: Used throughout for improved screen reader support
- **Keyboard Navigation**: All interactions can be performed via keyboard
- **Semantic HTML**: Proper HTML elements used for better accessibility

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
## Setup Instructions

### Prerequisites
- Node.js (version 18+)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/user-dashboard.git
cd user-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Running Tests
```bash
npm run test
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React Context for state management
├── hooks/           # Custom React hooks
├── pages/           # Route-level components
├── services/        # API services
├── types/           # TypeScript type definitions
├── tests/           # Test files
└── utils/           # Helper functions and utilities
```

## Assumptions & Decisions

1. **API**: Using JSONPlaceholder for demo purposes, in a real application would connect to a real backend
2. **Local State**: New users are only stored in local state, not persisted to a backend
3. **Form Validation**: Implemented client-side validation with Zod and React Hook Form
4. **Performance**: Table virtualization would be implemented for larger datasets
5. **Testing**: Focus on component testing rather than e2e for this demo
