import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface MatchmakingProps {
  clients: any[];
  properties: any[];
  onViewClient: (id: number) => void;
  onViewProperty: (id: number) => void;
  onCreateMatch: (clientId: number, propertyId: number) => void;
}

export default function Matchmaking({ 
  clients, 
  properties, 
  onViewClient, 
  onViewProperty,
  onCreateMatch
}: MatchmakingProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [clientSearchTerm, setClientSearchTerm] = useState('');
  const [propertySearchTerm, setPropertySearchTerm] = useState('');
  const [matchNote, setMatchNote] = useState('');

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    clientSearchTerm === '' || 
    client.full_name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(clientSearchTerm.toLowerCase())
  );

  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    propertySearchTerm === '' || 
    property.address.toLowerCase().includes(propertySearchTerm.toLowerCase()) ||
    property.suburb.toLowerCase().includes(propertySearchTerm.toLowerCase())
  );

  // Get selected client and property objects
  const client = clients.find(c => c.client_id.toString() === selectedClient);
  const property = properties.find(p => p.property_id.toString() === selectedProperty);

  // Handle match creation
  const handleCreateMatch = () => {
    if (selectedClient && selectedProperty) {
      onCreateMatch(parseInt(selectedClient), parseInt(selectedProperty));
      setMatchNote('');
    }
  };

  return (
    <div>
      <Header 
        title="Home Matchmaking" 
        subtitle="Match clients with their perfect properties"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Select Client">
          <div className="mb-4">
            <FormInput
              id="clientSearch"
              label="Search Clients"
              placeholder="Search by name or email"
              value={clientSearchTerm}
              onChange={(e) => setClientSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto max-h-96">
            <Table
              data={filteredClients}
              columns={[
                {
                  header: 'Name',
                  accessor: 'full_name',
                  render: (item) => (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="selectedClient"
                        value={item.client_id}
                        checked={selectedClient === item.client_id.toString()}
                        onChange={() => setSelectedClient(item.client_id.toString())}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{item.full_name}</div>
                        <div className="text-sm text-gray-500">{item.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Budget',
                  accessor: 'budget',
                  render: (item) => (
                    <div className="text-sm text-gray-900">
                      {item.budget ? `$${item.budget.toLocaleString()}` : 'N/A'}
                    </div>
                  ),
                },
                {
                  header: 'Preferences',
                  accessor: 'preferences',
                  render: (item) => (
                    <div className="text-sm text-gray-900">
                      {item.preferences ? `${item.preferences.bedrooms} bed, ${item.preferences.bathrooms} bath` : 'N/A'}
                    </div>
                  ),
                },
              ]}
              onRowClick={(item) => setSelectedClient(item.client_id.toString())}
              emptyMessage="No clients found"
            />
          </div>
          
          {selectedClient && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewClient(parseInt(selectedClient))}
              >
                View Client Details
              </Button>
            </div>
          )}
        </Card>
        
        <Card title="Select Property">
          <div className="mb-4">
            <FormInput
              id="propertySearch"
              label="Search Properties"
              placeholder="Search by address or suburb"
              value={propertySearchTerm}
              onChange={(e) => setPropertySearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-y-auto max-h-96">
            <Table
              data={filteredProperties}
              columns={[
                {
                  header: 'Address',
                  accessor: 'address',
                  render: (item) => (
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="selectedProperty"
                        value={item.property_id}
                        checked={selectedProperty === item.property_id.toString()}
                        onChange={() => setSelectedProperty(item.property_id.toString())}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{item.address}</div>
                        <div className="text-sm text-gray-500">{item.suburb}, {item.state}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  header: 'Price',
                  accessor: 'price',
                  render: (item) => (
                    <div className="text-sm text-gray-900">
                      {item.price ? `$${item.price.toLocaleString()}` : 'N/A'}
                    </div>
                  ),
                },
                {
                  header: 'Details',
                  accessor: 'details',
                  render: (item) => (
                    <div className="text-sm text-gray-900">
                      {item.bedrooms} bed, {item.bathrooms} bath
                    </div>
                  ),
                },
              ]}
              onRowClick={(item) => setSelectedProperty(item.property_id.toString())}
              emptyMessage="No properties found"
            />
          </div>
          
          {selectedProperty && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProperty(parseInt(selectedProperty))}
              >
                View Property Details
              </Button>
            </div>
          )}
        </Card>
      </div>
      
      {selectedClient && selectedProperty && (
        <Card title="Create Match">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Client</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-900">{client?.full_name}</p>
                <p className="text-gray-500">{client?.email}</p>
                <p className="text-gray-500">{client?.phone}</p>
                {client?.preferences && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      Looking for: {client.preferences.bedrooms} bed, {client.preferences.bathrooms} bath
                    </p>
                    <p className="text-sm text-gray-700">
                      Budget: ${client.budget?.toLocaleString()}
                    </p>
                    {client.preferences.suburbs && (
                      <p className="text-sm text-gray-700">
                        Preferred suburbs: {client.preferences.suburbs.join(', ')}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Property</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-900">{property?.address}</p>
                <p className="text-gray-500">{property?.suburb}, {property?.state}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    {property?.bedrooms} bed, {property?.bathrooms} bath, {property?.parking} parking
                  </p>
                  <p className="text-sm text-gray-700">
                    Price: ${property?.price?.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    Status: {property?.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <FormTextarea
              id="matchNote"
              label="Match Notes"
              placeholder="Add notes about why this property is a good match for the client..."
              value={matchNote}
              onChange={(e) => setMatchNote(e.target.value)}
              rows={4}
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedClient('');
                setSelectedProperty('');
                setMatchNote('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateMatch}
            >
              Create Match
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Match Analysis</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    {property?.price && client?.budget && property.price > client.budget
                      ? `This property is ${(((property.price - client.budget) / client.budget) * 100).toFixed(1)}% above the client's budget.`
                      : 'This property is within the client\'s budget.'}
                  </p>
                  <p className="mt-1">
                    {property?.suburb && client?.preferences?.suburbs && !client.preferences.suburbs.includes(property.suburb)
                      ? `The property is not in the client's preferred suburbs.`
                      : 'The property is in one of the client\'s preferred suburbs.'}
                  </p>
                  <p className="mt-1">
                    {property?.bedrooms && client?.preferences?.bedrooms && property.bedrooms < client.preferences.bedrooms
                      ? `The property has fewer bedrooms than the client prefers.`
                      : 'The property meets or exceeds the client\'s bedroom requirements.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
