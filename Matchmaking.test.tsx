import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Matchmaking from '@/components/matchmaking/Matchmaking';

describe('Matchmaking Component', () => {
  const mockClients = [
    {
      client_id: 1,
      full_name: 'John Doe',
      email: 'john@example.com',
      budget: 1000000,
      preferences: {
        bedrooms: 3,
        bathrooms: 2,
        suburbs: ['Bondi', 'Surry Hills']
      }
    },
    {
      client_id: 2,
      full_name: 'Jane Smith',
      email: 'jane@example.com',
      budget: 800000,
      preferences: {
        bedrooms: 2,
        bathrooms: 1,
        suburbs: ['Paddington', 'Newtown']
      }
    }
  ];
  
  const mockProperties = [
    {
      property_id: 1,
      address: '123 Main St',
      suburb: 'Bondi',
      state: 'NSW',
      status: 'FOR_SALE',
      price: 950000,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1
    },
    {
      property_id: 2,
      address: '456 Park Ave',
      suburb: 'Paddington',
      state: 'NSW',
      status: 'FOR_SALE',
      price: 850000,
      bedrooms: 2,
      bathrooms: 1,
      parking: 0
    }
  ];
  
  const mockOnViewClient = jest.fn();
  const mockOnViewProperty = jest.fn();
  const mockOnCreateMatch = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders matchmaking interface correctly', () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Check if header is rendered
    expect(screen.getByText('Home Matchmaking')).toBeInTheDocument();
    
    // Check if client and property sections are rendered
    expect(screen.getByText('Select Client')).toBeInTheDocument();
    expect(screen.getByText('Select Property')).toBeInTheDocument();
    
    // Check if clients are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    
    // Check if properties are rendered
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('456 Park Ave')).toBeInTheDocument();
  });
  
  test('filters clients by search term', () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Search for a client
    fireEvent.change(screen.getByLabelText(/search clients/i), {
      target: { value: 'Jane' },
    });
    
    // Check that only matching client is displayed
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
  test('filters properties by search term', () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Search for a property
    fireEvent.change(screen.getByLabelText(/search properties/i), {
      target: { value: 'Park' },
    });
    
    // Check that only matching property is displayed
    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
    expect(screen.getByText('456 Park Ave')).toBeInTheDocument();
  });
  
  test('shows match creation form when client and property are selected', async () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Select a client
    fireEvent.click(screen.getAllByRole('radio')[0]); // First client radio button
    
    // Select a property
    fireEvent.click(screen.getAllByRole('radio')[2]); // First property radio button
    
    // Check that match creation form is displayed
    await waitFor(() => {
      expect(screen.getByText('Create Match')).toBeInTheDocument();
    });
    
    // Check that client and property details are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    
    // Check that match analysis is displayed
    expect(screen.getByText('Match Analysis')).toBeInTheDocument();
    expect(screen.getByText('This property is within the client\'s budget.')).toBeInTheDocument();
  });
  
  test('calls onCreateMatch when create match button is clicked', async () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Select a client
    fireEvent.click(screen.getAllByRole('radio')[0]); // First client radio button
    
    // Select a property
    fireEvent.click(screen.getAllByRole('radio')[2]); // First property radio button
    
    // Wait for match creation form to be displayed
    await waitFor(() => {
      expect(screen.getByText('Create Match')).toBeInTheDocument();
    });
    
    // Click on create match button
    fireEvent.click(screen.getByRole('button', { name: /create match/i }));
    
    // Check that onCreateMatch was called with correct parameters
    expect(mockOnCreateMatch).toHaveBeenCalledWith(1, 1);
  });
  
  test('calls onViewClient when view client details button is clicked', async () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Select a client
    fireEvent.click(screen.getAllByRole('radio')[0]); // First client radio button
    
    // Wait for view client details button to be displayed
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /view client details/i })).toBeInTheDocument();
    });
    
    // Click on view client details button
    fireEvent.click(screen.getByRole('button', { name: /view client details/i }));
    
    // Check that onViewClient was called with correct parameter
    expect(mockOnViewClient).toHaveBeenCalledWith(1);
  });
  
  test('calls onViewProperty when view property details button is clicked', async () => {
    render(
      <Matchmaking 
        clients={mockClients}
        properties={mockProperties}
        onViewClient={mockOnViewClient}
        onViewProperty={mockOnViewProperty}
        onCreateMatch={mockOnCreateMatch}
      />
    );
    
    // Select a property
    fireEvent.click(screen.getAllByRole('radio')[2]); // First property radio button
    
    // Wait for view property details button to be displayed
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /view property details/i })).toBeInTheDocument();
    });
    
    // Click on view property details button
    fireEvent.click(screen.getByRole('button', { name: /view property details/i }));
    
    // Check that onViewProperty was called with correct parameter
    expect(mockOnViewProperty).toHaveBeenCalledWith(1);
  });
});
