import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface MaintenanceDetailProps {
  request: any;
  onBack: () => void;
  onUpdateStatus: (id: number, status: string) => void;
  onAssignVendor: (id: number, vendorId: number) => void;
  vendors: any[];
}

export default function MaintenanceDetail({ 
  request, 
  onBack, 
  onUpdateStatus, 
  onAssignVendor,
  vendors 
}: MaintenanceDetailProps) {
  const [status, setStatus] = useState(request.status);
  const [selectedVendor, setSelectedVendor] = useState(request.vendor_id || '');
  const [note, setNote] = useState('');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onUpdateStatus(request.request_id, e.target.value);
  };

  const handleVendorAssign = () => {
    if (selectedVendor) {
      onAssignVendor(request.request_id, parseInt(selectedVendor));
    }
  };

  const handleAddNote = () => {
    // This would be implemented to add a note to the maintenance request
    console.log('Adding note:', note);
    setNote('');
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <button
          onClick={onBack}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <Header 
          title={`Maintenance Request #${request.request_id}`} 
          subtitle={request.property_address}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Request Details">
            <div className="prose max-w-none">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">{request.description}</p>
                </div>
              </div>
              
              {request.photos && request.photos.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Photos</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {request.photos.map((photo: string, index: number) => (
                      <div key={index} className="aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                        <img 
                          src={photo} 
                          alt={`Maintenance photo ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add Note</h3>
                <FormTextarea
                  id="note"
                  label=""
                  placeholder="Add a note about this maintenance request..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="primary"
                    onClick={handleAddNote}
                    disabled={!note.trim()}
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {request.timeline && request.timeline.length > 0 && (
            <Card title="Timeline" className="mt-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {request.timeline.map((event: any, index: number) => (
                    <li key={index}>
                      <div className="relative pb-8">
                        {index !== request.timeline.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                              event.type === 'status_change' ? 'bg-blue-500' :
                              event.type === 'vendor_assigned' ? 'bg-yellow-500' :
                              event.type === 'note_added' ? 'bg-green-500' :
                              'bg-gray-500'
                            }`}>
                              {event.type === 'status_change' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              )}
                              {event.type === 'vendor_assigned' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                              )}
                              {event.type === 'note_added' && (
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{event.description}</p>
                              {event.note && (
                                <p className="mt-1 text-sm text-gray-500">{event.note}</p>
                              )}
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={event.date}>{event.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          )}
        </div>
        
        <div>
          <Card title="Request Information">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <FormSelect
                  id="status"
                  label=""
                  value={status}
                  onChange={handleStatusChange}
                  options={[
                    { value: 'OPEN', label: 'Open' },
                    { value: 'ASSIGNED', label: 'Assigned' },
                    { value: 'IN_PROGRESS', label: 'In Progress' },
                    { value: 'COMPLETED', label: 'Completed' },
                  ]}
                  className="mt-1"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="mt-1 text-sm text-gray-900">{request.category}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Property</h4>
                <p className="mt-1 text-sm text-gray-900">{request.property_address}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Reported By</h4>
                <p className="mt-1 text-sm text-gray-900">{request.reported_by || 'Unknown'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Date Reported</h4>
                <p className="mt-1 text-sm text-gray-900">{request.created_date}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Vendor</h4>
                {request.vendor_name ? (
                  <div className="mt-1">
                    <p className="text-sm text-gray-900">{request.vendor_name}</p>
                    <p className="text-sm text-gray-500">{request.vendor_phone}</p>
                    <p className="text-sm text-gray-500">{request.vendor_email}</p>
                  </div>
                ) : (
                  <div className="mt-1">
                    <FormSelect
                      id="vendor"
                      label=""
                      value={selectedVendor}
                      onChange={(e) => setSelectedVendor(e.target.value)}
                      options={[
                        { value: '', label: 'Select a vendor' },
                        ...vendors.map(vendor => ({ 
                          value: vendor.vendor_id.toString(), 
                          label: vendor.name 
                        }))
                      ]}
                    />
                    <div className="mt-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={handleVendorAssign}
                        disabled={!selectedVendor}
                        fullWidth
                      >
                        Assign Vendor
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {request.estimated_cost && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estimated Cost</h4>
                  <p className="mt-1 text-sm text-gray-900">${request.estimated_cost.toLocaleString()}</p>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Button 
                  variant="outline"
                  fullWidth
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Email Vendor
                </Button>
                
                <Button 
                  variant="outline"
                  fullWidth
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
