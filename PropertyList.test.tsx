import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PropertyList from '@/components/properties/PropertyList';

describe('PropertyList Component', () => {
  const mockProperties = [
    {
      property_id: 1,
      address: '123 Main St',
      suburb: 'Bondi',
      state: 'NSW',
      status: 'FOR_SALE',
      price: 1000000,
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      image_url: 'https://example.com/image1.jpg'
    },
    {
      property_id: 2,
      address: '456 Park Ave',
      suburb: 'Surry Hills',
      state: 'NSW',
      status: 'FOR_RENT',
      price: 800000,
      bedrooms: 2,
      bathrooms: 1,
      parking: 0,
      image_url: 'https://example.com/image2.jpg'
    }
  ];
  
  const mockOnViewProperty = jest.fn();
  const mockOnCreateProperty = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders property list correctly', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Check if header is rendered
    expect(screen.getByText('Properties')).toBeInTheDocument();
    expect(screen.getByText('Manage your property listings')).toBeInTheDocument();
    
    // Check if search and filter controls are rendered
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/suburb/i)).toBeInTheDocument();
    
    // Check if new property button is rendered
    expect(screen.getByRole('button', { name: /new property/i })).toBeInTheDocument();
    
    // Check if properties are rendered
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('456 Park Ave')).toBeInTheDocument();
    expect(screen.getByText('Bondi, NSW')).toBeInTheDocument();
    expect(screen.getByText('Surry Hills, NSW')).toBeInTheDocument();
    
    // Check if property details are rendered
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('$800,000')).toBeInTheDocument();
    expect(screen.getAllByText('3 Beds').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2 Baths').length).toBeGreaterThan(0);
  });
  
  test('filters properties by search term', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Search for a property
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'Surry' },
    });
    
    // Check that only matching property is displayed
    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
    expect(screen.getByText('456 Park Ave')).toBeInTheDocument();
    expect(screen.getByText('Surry Hills, NSW')).toBeInTheDocument();
  });
  
  test('filters properties by status', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Filter by status
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'FOR_RENT' },
    });
    
    // Check that only matching property is displayed
    expect(screen.queryByText('123 Main St')).not.toBeInTheDocument();
    expect(screen.getByText('456 Park Ave')).toBeInTheDocument();
  });
  
  test('calls onViewProperty when property is clicked', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Click on a property
    fireEvent.click(screen.getByText('123 Main St'));
    
    // Check that onViewProperty was called with correct property ID
    expect(mockOnViewProperty).toHaveBeenCalledWith(1);
  });
  
  test('calls onCreateProperty when new property button is clicked', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Click on new property button
    fireEvent.click(screen.getByRole('button', { name: /new property/i }));
    
    // Check that onCreateProperty was called
    expect(mockOnCreateProperty).toHaveBeenCalled();
  });
  
  test('displays empty message when no properties match filters', () => {
    render(
      <PropertyList 
        properties={mockProperties}
        onViewProperty={mockOnViewProperty}
        onCreateProperty={mockOnCreateProperty}
      />
    );
    
    // Search for a non-existent property
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'nonexistent' },
    });
    
    // Check that empty message is displayed
    expect(screen.getByText('No properties found matching your criteria.')).toBeInTheDocument();
  });
});
