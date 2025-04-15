import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface InquiryDetailProps {
  inquiry: any;
  onBack: () => void;
  onUpdateStatus: (id: number, status: string) => void;
  onSendResponse: (id: number, response: string) => void;
}

export default function InquiryDetail({ inquiry, onBack, onUpdateStatus, onSendResponse }: InquiryDetailProps) {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(inquiry.status);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onUpdateStatus(inquiry.inquiry_id, e.target.value);
  };

  const handleSendResponse = () => {
    if (response.trim()) {
      onSendResponse(inquiry.inquiry_id, response);
      setResponse('');
    }
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
          title={inquiry.subject} 
          subtitle={`From ${inquiry.client_name} on ${inquiry.date}`}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="Inquiry Details">
            <div className="prose max-w-none">
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-gray-700">{inquiry.message}</p>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">Response</h3>
              <FormTextarea
                id="response"
                label=""
                placeholder="Type your response here..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={6}
              />
              
              <div className="mt-4 flex justify-end">
                <Button 
                  variant="primary"
                  onClick={handleSendResponse}
                  disabled={!response.trim()}
                >
                  Send Response
                </Button>
              </div>
            </div>
          </Card>
          
          {inquiry.conversation && inquiry.conversation.length > 0 && (
            <Card title="Conversation History" className="mt-6">
              <div className="space-y-6">
                {inquiry.conversation.map((message: any, index: number) => (
                  <div key={index} className={`flex ${message.isAgent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`rounded-lg p-4 max-w-md ${message.isAgent ? 'bg-indigo-50' : 'bg-gray-50'}`}>
                      <p className="text-sm text-gray-900">{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
        
        <div>
          <Card title="Inquiry Information">
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
                    { value: 'IN_PROGRESS', label: 'In Progress' },
                    { value: 'RESOLVED', label: 'Resolved' },
                  ]}
                  className="mt-1"
                />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Client</h4>
                <p className="mt-1 text-sm text-gray-900">{inquiry.client_name}</p>
                <p className="text-sm text-gray-500">{inquiry.email}</p>
                {inquiry.phone && <p className="text-sm text-gray-500">{inquiry.phone}</p>}
              </div>
              
              {inquiry.property && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Property</h4>
                  <p className="mt-1 text-sm text-gray-900">{inquiry.property}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="mt-1 text-sm text-gray-900">{inquiry.category || 'General Inquiry'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Received</h4>
                <p className="mt-1 text-sm text-gray-900">{inquiry.date}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                <p className="mt-1 text-sm text-gray-900">{inquiry.assigned_to || 'You'}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <Button 
                  variant="outline"
                  fullWidth
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Use AI Bot Response
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
