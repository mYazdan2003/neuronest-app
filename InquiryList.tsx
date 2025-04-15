import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface InquiryListProps {
  inquiries: any[];
  onViewInquiry: (id: number) => void;
  onCreateInquiry: () => void;
}

export default function InquiryList({ inquiries, onViewInquiry, onCreateInquiry }: InquiryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = searchTerm === '' || 
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.client_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || inquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <Header 
        title="Inquiries" 
        subtitle="Manage and respond to client inquiries"
      />
      
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormInput
            id="search"
            label="Search"
            placeholder="Search by subject or client name"
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
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
            ]}
            className="w-full sm:w-48"
          />
        </div>
        
        <Button 
          variant="primary"
          onClick={onCreateInquiry}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          New Inquiry
        </Button>
      </div>
      
      <Card>
        <Table
          data={filteredInquiries}
          columns={[
            {
              header: 'Subject',
              accessor: 'subject',
              render: (item) => (
                <div className="text-sm font-medium text-indigo-600 truncate max-w-xs">
                  {item.subject}
                </div>
              ),
            },
            {
              header: 'Client',
              accessor: 'client_name',
              render: (item) => (
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.client_name}</div>
                  <div className="text-sm text-gray-500">{item.email}</div>
                </div>
              ),
            },
            {
              header: 'Property',
              accessor: 'property',
              render: (item) => (
                <div className="text-sm text-gray-900 truncate max-w-xs">
                  {item.property || 'N/A'}
                </div>
              ),
            },
            {
              header: 'Status',
              accessor: 'status',
              render: (item) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  item.status === 'OPEN' ? 'bg-green-100 text-green-800' : 
                  item.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.status}
                </span>
              ),
            },
            {
              header: 'Date',
              accessor: 'date',
              render: (item) => (
                <div className="text-sm text-gray-500">
                  {item.date}
                </div>
              ),
            },
            {
              header: 'Actions',
              accessor: 'inquiry_id',
              render: (item) => (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewInquiry(item.inquiry_id);
                    }}
                  >
                    View
                  </Button>
                </div>
              ),
            },
          ]}
          onRowClick={(item) => onViewInquiry(item.inquiry_id)}
          emptyMessage="No inquiries found"
        />
      </Card>
    </div>
  );
}
