import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddUserForm } from '../components/AddUserForm';
import { BrowserRouter } from 'react-router-dom';
import { UsersProvider } from '../context/UsersProvider';

// Mock react-router's useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('AddUserForm', () => {
  const renderForm = () => {
    return render(
      <BrowserRouter>
        <UsersProvider>
          <AddUserForm />
        </UsersProvider>
      </BrowserRouter>
    );
  };
  
  it('should render form fields correctly', () => {
    renderForm();
    
    // Check that all form fields are rendered
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    
    // Check submit button
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });
  
  it('should show validation errors for invalid inputs', async () => {
    renderForm();
    
    // Submit form without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));
    
    // Check that error messages are displayed
    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/username must be at least 3 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/phone number must be at least 6 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/company name must be at least 2 characters/i)).toBeInTheDocument();
  });
  
  it('should allow filling out and submitting the form', async () => {
    renderForm();
    
    // Fill out form fields
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'janedoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '555-987-6543' } });
    fireEvent.change(screen.getByLabelText(/website/i), { target: { value: 'janedoe.com' } });
    fireEvent.change(screen.getByLabelText(/company/i), { target: { value: 'Jane Co' } });
    
    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /add user/i }));
    
    // No easy way to check navigation in this test, but we can verify no errors are shown
    expect(screen.queryByText(/name must be/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/username must be/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
  });
});
