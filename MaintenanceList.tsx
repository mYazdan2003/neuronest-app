import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';

interface MaintenanceListProps {
  maintenanceRequests: any[];
  onViewRequest: (id: number) => void;
  onCreateRequest: () => void;
}

export default function MaintenanceList({ maintenanceRequests, onViewRequest, onCreateRequest }: MaintenanceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.vendor_name && request.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === '' || request.status === statusFilter;
    const matchesCategory = categoryFilter === '' || request.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div>
      <Header 
        title="Maintenance Requests" 
        subtitle="Manage property maintenance and repairs"
      />
      
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormInput
            id="search"
            label="Search"
            placeholder="Search by property or vendor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          
          <FormSelect
            id="status"
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: '', label: 'All Statuses' },
              { value: 'OPEN', label: 'Open' },
              { value: 'ASSIGNED', label: 'Assigned' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'COMPLETED', label: 'Completed' },
            ]}
            className="w-full sm:w-48"
          />
          
          <FormSelect
            id="category"
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              { value: 'PLUMBING', label: 'Plumbing' },
              { value: 'ELECTRICAL', label: 'Electrical' },
              { value: 'HVAC', label: 'HVAC' },
              { value: 'STRUCTURAL', label: 'Structural' },
              { value: 'APPLIANCE', label: 'Appliance' },
              { value: 'GENERAL', label: 'General' },
            ]}
            className="w-full sm:w-48"
          />
        </div>
        
        <Button 
          variant="primary"
          onClick={onCreateRequest}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          New Request
        </Button>
      </div>
      
      <Card>
        <Table
          data={filteredRequests}
          columns={[
            {
              header: 'Property',
              accessor: 'property_address',
              render: (item) => (
                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                  {item.property_address}
                </div>
              ),
            },
            {
              header: 'Category',
              accessor: 'category',
              render: (item) => (
                <span className="text-sm text-gray-900">
                  {item.category}
                </span>
              ),
            },
            {
              header: 'Vendor',
              accessor: 'vendor_name',
              render: (item) => (
                <div className="text-sm text-gray-900">
                  {item.vendor_name || 'Not assigned'}
                </div>
              ),
            },
            {
              header: 'Status',
              accessor: 'status',
              render: (item) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'OPEN' ? 'bg-red-100 text-red-800' : 
                  item.status === 'ASSIGNED' ? 'bg-yellow-100 text-yellow-800' : 
                  item.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 
                  item.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              ),
            },
            {
              header: 'Date',
              accessor: 'created_date',
              render: (item) => (
                <div className="text-sm text-gray-500">
                  {item.created_date}
                </div>
              ),
            },
            {
              header: 'Actions',
              accessor: 'request_id',
              render: (item) => (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewRequest(item.request_id);
                    }}
                  >
                    View
                  </Button>
                </div>
              ),
            },
          ]}
          onRowClick={(item) => onViewRequest(item.request_id)}
          emptyMessage="No maintenance requests found"
        />
      </Card>
    </div>
  );
}
