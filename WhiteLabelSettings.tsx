import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormInput from '@/components/ui/FormInput';
import FormSelect from '@/components/ui/FormSelect';
import FormTextarea from '@/components/ui/FormTextarea';

interface WhiteLabelSettingsProps {
  settings: {
    companyName: string;
    primaryColor: string;
    secondaryColor: string;
    logo: string;
    contactEmail: string;
    contactPhone: string;
    customDomain: string;
    welcomeMessage: string;
    emailSignature: string;
  };
  onSaveSettings: (settings: any) => void;
}

export default function WhiteLabelSettings({ settings, onSaveSettings }: WhiteLabelSettingsProps) {
  const [formData, setFormData] = useState({
    companyName: settings.companyName || '',
    primaryColor: settings.primaryColor || '#4f46e5',
    secondaryColor: settings.secondaryColor || '#10b981',
    logo: settings.logo || '',
    contactEmail: settings.contactEmail || '',
    contactPhone: settings.contactPhone || '',
    customDomain: settings.customDomain || '',
    welcomeMessage: settings.welcomeMessage || '',
    emailSignature: settings.emailSignature || '',
  });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo || null);
  const [isSaving, setIsSaving] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setFormData({
          ...formData,
          logo: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would call an API to save the settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSaveSettings(formData);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handlePreview = () => {
    // In a real app, this would show a preview of the white-labeled application
    console.log('Preview white-labeled application');
  };

  return (
    <div>
      <Header 
        title="White Label Settings" 
        subtitle="Customize the appearance and branding of your application"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Branding">
            <div className="space-y-4">
              <FormInput
                id="companyName"
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your Company Name"
                required
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="h-10 w-10 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="ml-2 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Secondary Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      id="secondaryColor"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      className="h-10 w-10 rounded-md border border-gray-300"
                    />
                    <input
                      type="text"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      className="ml-2 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                  Logo
                </label>
                <div className="mt-1 flex items-center">
                  {logoPreview ? (
                    <div className="relative">
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
                        className="h-16 w-auto object-contain"
                      />
                      <button
                        onClick={() => {
                          setLogoPreview(null);
                          setFormData({
                            ...formData,
                            logo: '',
                          });
                        }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                      >
                        <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="h-16 w-32 flex items-center justify-center bg-gray-100 rounded-md">
                      <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <label htmlFor="logo-upload" className="ml-4 cursor-pointer text-indigo-600 hover:text-indigo-500">
                    <span>Upload Logo</span>
                    <input 
                      id="logo-upload" 
                      name="logo" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Recommended size: 200x50 pixels. PNG or SVG with transparent background.
                </p>
              </div>
            </div>
          </Card>
          
          <Card title="Contact Information" className="mt-6">
            <div className="space-y-4">
              <FormInput
                id="contactEmail"
                name="contactEmail"
                label="Contact Email"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="contact@yourcompany.com"
              />
              
              <FormInput
                id="contactPhone"
                name="contactPhone"
                label="Contact Phone"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
              
              <FormInput
                id="customDomain"
                name="customDomain"
                label="Custom Domain"
                value={formData.customDomain}
                onChange={handleInputChange}
                placeholder="app.yourcompany.com"
              />
            </div>
          </Card>
          
          <Card title="Messaging" className="mt-6">
            <div className="space-y-4">
              <FormTextarea
                id="welcomeMessage"
                name="welcomeMessage"
                label="Welcome Message"
                value={formData.welcomeMessage}
                onChange={handleInputChange}
                placeholder="Welcome to our real estate platform. We're here to help you find your perfect property."
                rows={3}
              />
              
              <FormTextarea
                id="emailSignature"
                name="emailSignature"
                label="Email Signature"
                value={formData.emailSignature}
                onChange={handleInputChange}
                placeholder="Best regards,\nThe [Company Name] Team\nPhone: [Contact Phone]\nEmail: [Contact Email]"
                rows={4}
              />
            </div>
          </Card>
        </div>
        
        <div>
          <Card title="Preview">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  {logoPreview ? (
                    <img 
                      src={logoPreview} 
                      alt="Logo Preview" 
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <div className="h-8 w-16 bg-gray-200 rounded"></div>
                  )}
                  <div className="ml-2 text-sm font-medium" style={{ color: formData.primaryColor }}>
                    {formData.companyName || 'Your Company Name'}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <div className="h-8 w-24 rounded-md flex items-center justify-center text-white text-xs" style={{ backgroundColor: formData.primaryColor }}>
                    Primary Button
                  </div>
                  <div className="h-8 w-24 rounded-md flex items-center justify-center text-white text-xs" style={{ backgroundColor: formData.secondaryColor }}>
                    Secondary Button
                  </div>
                </div>
                
                <div className="mt-4 text-xs">
                  <div className="font-medium mb-1">Welcome Message:</div>
                  <div className="text-gray-600">
                    {formData.welcomeMessage || 'Your welcome message will appear here.'}
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handlePreview}
              >
                Preview Full Application
              </Button>
            </div>
          </Card>
          
          <div className="mt-6">
            <Button
              variant="primary"
              fullWidth
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
