import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Table from '@/components/ui/Table';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';

interface PropertyListProps {
  properties: any[];
  onViewProperty: (id: number) => void;
  onCreateProperty: () => void;
}

export default function PropertyList({ properties, onViewProperty, onCreateProperty }: PropertyListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [suburbFilter, setSuburbFilter] = useState('');

  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchTerm === '' || 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.suburb.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || property.status === statusFilter;
    const matchesSuburb = suburbFilter === '' || property.suburb === suburbFilter;
    
    return matchesSearch && matchesStatus && matchesSuburb;
  });

  // Get unique suburbs for filter
  const suburbs = [...new Set(properties.map(property => property.suburb))];

  return (
    <div>
      <Header 
        title="Properties" 
        subtitle="Manage your property listings"
      />
      
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormInput
            id="search"
            label="Search"
            placeholder="Search by address or suburb"
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
              { value: 'FOR_SALE', label: 'For Sale' },
              { value: 'FOR_RENT', label: 'For Rent' },
              { value: 'SOLD', label: 'Sold' },
              { value: 'LEASED', label: 'Leased' },
            ]}
            className="w-full sm:w-48"
          />
          
          <FormSelect
            id="suburb"
            label="Suburb"
            value={suburbFilter}
            onChange={(e) => setSuburbFilter(e.target.value)}
            options={[
              { value: '', label: 'All Suburbs' },
              ...suburbs.map(suburb => ({ value: suburb, label: suburb }))
            ]}
            className="w-full sm:w-48"
          />
        </div>
        
        <Button 
          variant="primary"
          onClick={onCreateProperty}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        >
          New Property
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Card 
              key={property.property_id} 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => onViewProperty(property.property_id)}
            >
              {property.image_url && (
                <div className="aspect-w-16 aspect-h-9 mb-4 -mx-4 -mt-5 rounded-t-lg overflow-hidden">
                  <img 
                    src={property.image_url} 
                    alt={property.address} 
                    className="object-cover w-full h-48"
                  />
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 truncate">{property.address}</h3>
                <p className="text-sm text-gray-500">{property.suburb}, {property.state}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.status === 'FOR_SALE' ? 'bg-blue-100 text-blue-800' : 
                      property.status === 'FOR_RENT' ? 'bg-green-100 text-green-800' : 
                      property.status === 'SOLD' ? 'bg-purple-100 text-purple-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="text-sm font-medium text-gray-900">
                    {property.price && `$${property.price.toLocaleString()}`}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                    </div>
                  )}
                  
                  {property.parking && (
                    <div className="flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {property.parking} {property.parking === 1 ? 'Park' : 'Parks'}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No properties found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
