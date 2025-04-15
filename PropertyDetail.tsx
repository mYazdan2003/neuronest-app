import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface PropertyDetailProps {
  property: any;
  onBack: () => void;
  onUpdateProperty: (id: number, data: any) => void;
  onGenerateDescription: (id: number) => void;
}

export default function PropertyDetail({ property, onBack, onUpdateProperty, onGenerateDescription }: PropertyDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address_line_1: property.address_line_1 || '',
    address_line_2: property.address_line_2 || '',
    suburb: property.suburb || '',
    state: property.state || '',
    postal_code: property.postal_code || '',
    status: property.status || 'FOR_SALE',
    price: property.price ? property.price.toString() : '',
    bedrooms: property.bedrooms ? property.bedrooms.toString() : '',
    bathrooms: property.bathrooms ? property.bathrooms.toString() : '',
    parking: property.parking ? property.parking.toString() : '',
    description: property.description || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    const updatedProperty = {
      ...formData,
      price: formData.price ? parseFloat(formData.price) : null,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      parking: formData.parking ? parseInt(formData.parking) : null,
    };
    
    onUpdateProperty(property.property_id, updatedProperty);
    setIsEditing(false);
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
          title={isEditing ? "Edit Property" : property.address} 
          subtitle={`${property.suburb}, ${property.state}`}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {property.image_url && (
            <Card className="mb-6">
              <div className="aspect-w-16 aspect-h-9 -m-4 rounded-t-lg overflow-hidden">
                <img 
                  src={property.image_url} 
                  alt={property.address} 
                  className="object-cover w-full"
                />
              </div>
            </Card>
          )}
          
          <Card title="Property Details">
            {isEditing ? (
              <div className="space-y-4">
                <FormInput
                  id="address_line_1"
                  name="address_line_1"
                  label="Address Line 1"
                  value={formData.address_line_1}
                  onChange={handleInputChange}
                  required
                />
                
                <FormInput
                  id="address_line_2"
                  name="address_line_2"
                  label="Address Line 2"
                  value={formData.address_line_2}
                  onChange={handleInputChange}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    id="suburb"
                    name="suburb"
                    label="Suburb"
                    value={formData.suburb}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <FormInput
                    id="state"
                    name="state"
                    label="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <FormInput
                    id="postal_code"
                    name="postal_code"
                    label="Postal Code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormSelect
                    id="status"
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleInputChange}
                    options={[
                      { value: 'FOR_SALE', label: 'For Sale' },
                      { value: 'FOR_RENT', label: 'For Rent' },
                      { value: 'SOLD', label: 'Sold' },
                      { value: 'LEASED', label: 'Leased' },
                    ]}
                  />
                  
                  <FormInput
                    id="price"
                    name="price"
                    label="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    type="number"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    id="bedrooms"
                    name="bedrooms"
                    label="Bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    type="number"
                  />
                  
                  <FormInput
                    id="bathrooms"
                    name="bathrooms"
                    label="Bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    type="number"
                  />
                  
                  <FormInput
                    id="parking"
                    name="parking"
                    label="Parking Spaces"
                    value={formData.parking}
                    onChange={handleInputChange}
                    type="number"
                  />
                </div>
                
                <FormTextarea
                  id="description"
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                />
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-6">
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
                  
                  <div className="text-xl font-bold text-gray-900">
                    {property.price && `$${property.price.toLocaleString()}`}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {property.bedrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium text-gray-900">{property.bedrooms}</div>
                      <div className="text-sm text-gray-500">Bedrooms</div>
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium text-gray-900">{property.bathrooms}</div>
                      <div className="text-sm text-gray-500">Bathrooms</div>
                    </div>
                  )}
                  
                  {property.parking && (
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-medium text-gray-900">{property.parking}</div>
                      <div className="text-sm text-gray-500">Parking</div>
                    </div>
                  )}
                </div>
                
                <div className="prose max-w-none">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  {property.description ? (
                    <p className="text-gray-700">{property.description}</p>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">No description available for this property.</p>
                      <Button 
                        variant="primary"
                        onClick={() => onGenerateDescription(property.property_id)}
                      >
                        Generate Description with AI
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Property
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card title="Property Information">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Full Address</h4>
                <p className="mt-1 text-sm text-gray-900">{property.address_line_1}</p>
                {property.address_line_2 && <p className="text-sm text-gray-900">{property.address_line_2}</p>}
                <p className="text-sm text-gray-900">{property.suburb}, {property.state} {property.postal_code}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Listed By</h4>
                <p className="mt-1 text-sm text-gray-900">{property.listed_by || 'You'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Listed Date</h4>
                <p className="mt-1 text-sm text-gray-900">{property.listed_date || 'Unknown'}</p>
              </div>
              
              {property.last_updated && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                  <p className="mt-1 text-sm text-gray-900">{property.last_updated}</p>
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
                  Email Property Details
                </Button>
                
                <Button 
                  variant="outline"
                  fullWidth
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  Schedule Viewing
                </Button>
                
                <Button 
                  variant="outline"
                  fullWidth
                  icon={
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                >
                  Find Matching Buyers
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
