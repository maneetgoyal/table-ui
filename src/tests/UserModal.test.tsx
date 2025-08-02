import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserModal } from '../components/UserModal';

// Mock user data
const mockUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john@example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 4B',
    city: 'Cityville',
    zipcode: '12345',
    geo: {
      lat: '0',
      lng: '0'
    }
  },
  phone: '555-123-4567',
  website: 'johndoe.com',
  company: {
    name: 'Test Company',
    catchPhrase: 'We test things',
    bs: 'testing'
  }
};

describe('UserModal', () => {
  const onCloseMock = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should not render when user is null', () => {
    render(<UserModal user={null} onClose={onCloseMock} />);
    expect(screen.queryByText('Username')).not.toBeInTheDocument();
  });
  
  it('should render user details correctly', () => {
    render(<UserModal user={mockUser} onClose={onCloseMock} />);
    
    // Check that the user's information is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Apt 4B')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });
  
  it('should call onClose when the close button is clicked', () => {
    render(<UserModal user={mockUser} onClose={onCloseMock} />);
    
    // Find the close button by its aria-label and click it
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  
  it('should call onClose when the overlay is clicked', () => {
    render(<UserModal user={mockUser} onClose={onCloseMock} />);
    
    // Find the overlay by its aria-hidden attribute and click it
    const overlay = screen.getByRole('dialog').querySelector('[aria-hidden="true"]');
    if (overlay) {
      fireEvent.click(overlay);
    }
    
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
