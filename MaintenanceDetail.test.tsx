import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MaintenanceDetail from '@/components/maintenance/MaintenanceDetail';

describe('MaintenanceDetail Component', () => {
  const mockRequest = {
    request_id: 1,
    property_address: '123 Main St, Bondi, NSW',
    category: 'PLUMBING',
    description: 'Leaking tap in the kitchen',
    status: 'OPEN',
    created_date: '2025-04-01',
    reported_by: 'John Doe',
    vendor_name: null,
    vendor_id: null,
    timeline: [
      {
        type: 'status_change',
        description: 'Request created',
        date: '2025-04-01',
        note: null
      }
    ]
  };
  
  const mockVendors = [
    {
      vendor_id: 1,
      name: 'ABC Plumbing',
      category: 'PLUMBING',
      phone: '+1 555-1234',
      email: 'abc@example.com'
    },
    {
      vendor_id: 2,
      name: 'XYZ Electrical',
      category: 'ELECTRICAL',
      phone: '+1 555-5678',
      email: 'xyz@example.com'
    }
  ];
  
  const mockOnBack = jest.fn();
  const mockOnUpdateStatus = jest.fn();
  const mockOnAssignVendor = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders maintenance request details correctly', () => {
    render(
      <MaintenanceDetail 
        request={mockRequest}
        vendors={mockVendors}
        onBack={mockOnBack}
        onUpdateStatus={mockOnUpdateStatus}
        onAssignVendor={mockOnAssignVendor}
      />
    );
    
    // Check if header is rendered
    expect(screen.getByText(`Maintenance Request #${mockRequest.request_id}`)).toBeInTheDocument();
    expect(screen.getByText(mockRequest.property_address)).toBeInTheDocument();
    
    // Check if request details are rendered
    expect(screen.getByText('Leaking tap in the kitchen')).toBeInTheDocument();
    expect(screen.getByText('PLUMBING')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2025-04-01')).toBeInTheDocument();
    
    // Check if status dropdown is rendered
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    
    // Check if vendor selection is rendered
    expect(screen.getByText('Select a vendor')).toBeInTheDocument();
    
    // Check if timeline is rendered
    expect(screen.getByText('Request created')).toBeInTheDocument();
  });
  
  test('calls onBack when back button is clicked', () => {
    render(
      <MaintenanceDetail 
        request={mockRequest}
        vendors={mockVendors}
        onBack={mockOnBack}
        onUpdateStatus={mockOnUpdateStatus}
        onAssignVendor={mockOnAssignVendor}
      />
    );
    
    // Click on back button
    fireEvent.click(screen.getByRole('button', { name: /back/i }));
    
    // Check that onBack was called
    expect(mockOnBack).toHaveBeenCalled();
  });
  
  test('calls onUpdateStatus when status is changed', () => {
    render(
      <MaintenanceDetail 
        request={mockRequest}
        vendors={mockVendors}
        onBack={mockOnBack}
        onUpdateStatus={mockOnUpdateStatus}
        onAssignVendor={mockOnAssignVendor}
      />
    );
    
    // Change status
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'IN_PROGRESS' },
    });
    
    // Check that onUpdateStatus was called with correct parameters
    expect(mockOnUpdateStatus).toHaveBeenCalledWith(1, 'IN_PROGRESS');
  });
  
  test('calls onAssignVendor when vendor is assigned', async () => {
    render(
      <MaintenanceDetail 
        request={mockRequest}
        vendors={mockVendors}
        onBack={mockOnBack}
        onUpdateStatus={mockOnUpdateStatus}
        onAssignVendor={mockOnAssignVendor}
      />
    );
    
    // Select a vendor
    fireEvent.change(screen.getByLabelText(/vendor/i), {
      target: { value: '1' },
    });
    
    // Click on assign vendor button
    fireEvent.click(screen.getByRole('button', { name: /assign vendor/i }));
    
    // Check that onAssignVendor was called with correct parameters
    expect(mockOnAssignVendor).toHaveBeenCalledWith(1, 1);
  });
  
  test('displays vendor information when vendor is assigned', () => {
    const requestWithVendor = {
      ...mockRequest,
      vendor_id: 1,
      vendor_name: 'ABC Plumbing',
      vendor_phone: '+1 555-1234',
      vendor_email: 'abc@example.com'
    };
    
    render(
      <MaintenanceDetail 
        request={requestWithVendor}
        vendors={mockVendors}
        onBack={mockOnBack}
        onUpdateStatus={mockOnUpdateStatus}
        onAssignVendor={mockOnAssignVendor}
      />
    );
    
    // Check if vendor information is displayed
    expect(screen.getByText('ABC Plumbing')).toBeInTheDocument();
    expect(screen.getByText('+1 555-1234')).toBeInTheDocument();
    expect(screen.getByText('abc@example.com')).toBeInTheDocument();
    
    // Vendor selection should not be displayed
    expect(screen.queryByText('Select a vendor')).not.toBeInTheDocument();
  });
});
