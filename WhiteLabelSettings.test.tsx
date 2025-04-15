import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WhiteLabelSettings from '@/components/settings/WhiteLabelSettings';

describe('WhiteLabelSettings Component', () => {
  const mockSettings = {
    companyName: 'NeuroNest',
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    logo: 'https://example.com/logo.png',
    contactEmail: 'support@neuronest.com',
    contactPhone: '+1 (555) 123-4567',
    customDomain: 'app.neuronest.com',
    welcomeMessage: 'Welcome to NeuroNest, your all-in-one real estate management platform.',
    emailSignature: 'Best regards,\nThe NeuroNest Team\nPhone: +1 (555) 123-4567\nEmail: support@neuronest.com',
  };
  
  const mockOnSaveSettings = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders white label settings form correctly', () => {
    render(
      <WhiteLabelSettings 
        settings={mockSettings}
        onSaveSettings={mockOnSaveSettings}
      />
    );
    
    // Check if header is rendered
    expect(screen.getByText('White Label Settings')).toBeInTheDocument();
    expect(screen.getByText('Customize the appearance and branding of your application')).toBeInTheDocument();
    
    // Check if form sections are rendered
    expect(screen.getByText('Branding')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Messaging')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
    
    // Check if form inputs are rendered with correct values
    expect(screen.getByLabelText(/company name/i)).toHaveValue('NeuroNest');
    expect(screen.getByLabelText(/contact email/i)).toHaveValue('support@neuronest.com');
    expect(screen.getByLabelText(/contact phone/i)).toHaveValue('+1 (555) 123-4567');
    expect(screen.getByLabelText(/custom domain/i)).toHaveValue('app.neuronest.com');
    expect(screen.getByLabelText(/welcome message/i)).toHaveValue('Welcome to NeuroNest, your all-in-one real estate management platform.');
    expect(screen.getByLabelText(/email signature/i)).toHaveValue('Best regards,\nThe NeuroNest Team\nPhone: +1 (555) 123-4567\nEmail: support@neuronest.com');
    
    // Check if preview section shows company name
    expect(screen.getByText('NeuroNest')).toBeInTheDocument();
    
    // Check if buttons are rendered
    expect(screen.getByRole('button', { name: /preview full application/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save settings/i })).toBeInTheDocument();
  });
  
  test('updates form values when inputs change', () => {
    render(
      <WhiteLabelSettings 
        settings={mockSettings}
        onSaveSettings={mockOnSaveSettings}
      />
    );
    
    // Change company name
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: 'New Company Name' },
    });
    
    // Change contact email
    fireEvent.change(screen.getByLabelText(/contact email/i), {
      target: { value: 'new@example.com' },
    });
    
    // Change welcome message
    fireEvent.change(screen.getByLabelText(/welcome message/i), {
      target: { value: 'New welcome message' },
    });
    
    // Check that form values were updated
    expect(screen.getByLabelText(/company name/i)).toHaveValue('New Company Name');
    expect(screen.getByLabelText(/contact email/i)).toHaveValue('new@example.com');
    expect(screen.getByLabelText(/welcome message/i)).toHaveValue('New welcome message');
    
    // Check that preview was updated
    expect(screen.getByText('New Company Name')).toBeInTheDocument();
    expect(screen.getByText('New welcome message')).toBeInTheDocument();
  });
  
  test('calls onSaveSettings when save button is clicked', async () => {
    render(
      <WhiteLabelSettings 
        settings={mockSettings}
        onSaveSettings={mockOnSaveSettings}
      />
    );
    
    // Change company name
    fireEvent.change(screen.getByLabelText(/company name/i), {
      target: { value: 'New Company Name' },
    });
    
    // Click save button
    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    
    // Check that button shows saving state
    expect(screen.getByRole('button', { name: /saving/i })).toBeInTheDocument();
    
    // Check that onSaveSettings was called with updated settings
    await waitFor(() => {
      expect(mockOnSaveSettings).toHaveBeenCalledWith(
        expect.objectContaining({
          companyName: 'New Company Name',
          contactEmail: 'support@neuronest.com',
          contactPhone: '+1 (555) 123-4567',
        })
      );
    });
  });
});
