"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import InquiryList from '@/components/inquiries/InquiryList';
import InquiryDetail from '@/components/inquiries/InquiryDetail';
import PropertyList from '@/components/properties/PropertyList';
import PropertyDetail from '@/components/properties/PropertyDetail';
import MaintenanceList from '@/components/maintenance/MaintenanceList';
import MaintenanceDetail from '@/components/maintenance/MaintenanceDetail';
import Matchmaking from '@/components/matchmaking/Matchmaking';
import Analytics from '@/components/analytics/Analytics';
import Social from '@/components/social/Social';
import BotPage from '@/components/bots/BotPage';

export default function Home() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock data for demonstration
  const [mockData, setMockData] = useState({
    inquiries: [],
    properties: [],
    maintenanceRequests: [],
    clients: [],
    vendors: [],
    stats: {
      inquiries: [],
      properties: [],
      conversions: [],
      userActivity: []
    },
    posts: []
  });
  
  // Load mock data on component mount
  useEffect(() => {
    const loadMockData = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be API calls to the backend
        // For now, we'll simulate loading mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setMockData({
          inquiries: Array.from({ length: 10 }, (_, i) => ({
            inquiry_id: i + 1,
            client_name: `Client ${i + 1}`,
            email: `client${i + 1}@example.com`,
            phone: `+1 555-${100 + i}`,
            subject: `Property Inquiry ${i + 1}`,
            message: `I'm interested in learning more about this property. Please contact me at your earliest convenience.`,
            status: ['NEW', 'IN_PROGRESS', 'CLOSED'][Math.floor(Math.random() * 3)],
            created_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            property_id: Math.floor(Math.random() * 10) + 1
          })),
          properties: Array.from({ length: 10 }, (_, i) => ({
            property_id: i + 1,
            address: `${1000 + i} Main St`,
            address_line_1: `${1000 + i} Main St`,
            address_line_2: '',
            suburb: ['Bondi', 'Surry Hills', 'Paddington', 'Newtown', 'Manly'][Math.floor(Math.random() * 5)],
            state: 'NSW',
            postal_code: '2000',
            status: ['FOR_SALE', 'FOR_RENT', 'SOLD', 'LEASED'][Math.floor(Math.random() * 4)],
            price: Math.floor(Math.random() * 1000000) + 500000,
            bedrooms: Math.floor(Math.random() * 4) + 1,
            bathrooms: Math.floor(Math.random() * 3) + 1,
            parking: Math.floor(Math.random() * 3),
            description: `Beautiful property in the heart of the city. This ${Math.floor(Math.random() * 4) + 1} bedroom home features modern amenities and is close to shops, schools, and public transport.`,
            image_url: `https://placehold.co/600x400?text=Property+${i + 1}`
          })),
          maintenanceRequests: Array.from({ length: 8 }, (_, i) => ({
            request_id: i + 1,
            property_address: `${1000 + i} Main St, ${['Bondi', 'Surry Hills', 'Paddington', 'Newtown', 'Manly'][Math.floor(Math.random() * 5)]}, NSW`,
            category: ['PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL', 'APPLIANCE', 'GENERAL'][Math.floor(Math.random() * 6)],
            description: `Maintenance issue reported: ${['Leaking tap', 'Power outage', 'AC not working', 'Cracked wall', 'Broken dishwasher', 'General repairs'][Math.floor(Math.random() * 6)]}`,
            status: ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 4)],
            created_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            vendor_name: Math.random() > 0.5 ? `Vendor ${Math.floor(Math.random() * 5) + 1}` : null,
            vendor_id: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : null,
            timeline: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, j) => ({
              type: ['status_change', 'vendor_assigned', 'note_added'][Math.floor(Math.random() * 3)],
              description: `Status changed to ${['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'][Math.floor(Math.random() * 4)]}`,
              date: new Date(Date.now() - (Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
              note: Math.random() > 0.5 ? 'Additional note about this change' : null
            }))
          })),
          clients: Array.from({ length: 12 }, (_, i) => ({
            client_id: i + 1,
            full_name: `Client ${i + 1}`,
            email: `client${i + 1}@example.com`,
            phone: `+1 555-${100 + i}`,
            budget: Math.floor(Math.random() * 1000000) + 500000,
            preferences: {
              bedrooms: Math.floor(Math.random() * 4) + 1,
              bathrooms: Math.floor(Math.random() * 3) + 1,
              suburbs: ['Bondi', 'Surry Hills', 'Paddington', 'Newtown', 'Manly'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
            }
          })),
          vendors: Array.from({ length: 5 }, (_, i) => ({
            vendor_id: i + 1,
            name: `Vendor ${i + 1}`,
            category: ['PLUMBING', 'ELECTRICAL', 'HVAC', 'STRUCTURAL', 'GENERAL'][i],
            phone: `+1 555-${200 + i}`,
            email: `vendor${i + 1}@example.com`
          })),
          stats: {
            inquiries: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
              count: Math.floor(Math.random() * 10) + 1
            })),
            properties: Array.from({ length: 10 }, (_, i) => ({
              suburb: ['Bondi', 'Surry Hills', 'Paddington', 'Newtown', 'Manly'][i % 5],
              count: Math.floor(Math.random() * 10) + 1,
              avgPrice: Math.floor(Math.random() * 1000000) + 500000
            })),
            conversions: Array.from({ length: 3 }, (_, i) => ({
              stage: ['Inquiry to Viewing', 'Viewing to Offer', 'Offer to Sale'][i],
              rate: Math.floor(Math.random() * 50) + 20
            })),
            userActivity: Array.from({ length: 10 }, (_, i) => ({
              user: `User ${i + 1}`,
              action: ['Created property', 'Responded to inquiry', 'Updated listing', 'Generated bot response', 'Created case study'][Math.floor(Math.random() * 5)],
              time: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`
            }))
          },
          posts: Array.from({ length: 5 }, (_, i) => ({
            post_id: i + 1,
            author: `User ${Math.floor(Math.random() * 5) + 1}`,
            date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            content: `This is a sample post about real estate. ${Math.random() > 0.5 ? 'Just closed a deal on a beautiful property!' : 'Looking forward to showing some amazing new listings this weekend!'}`,
            image_url: Math.random() > 0.5 ? `https://placehold.co/600x400?text=Post+Image+${i + 1}` : null,
            likes: Math.floor(Math.random() * 20),
            liked: Math.random() > 0.7,
            comments: Array.from({ length: Math.floor(Math.random() * 4) }, (_, j) => ({
              author: `User ${Math.floor(Math.random() * 5) + 1}`,
              content: `This is a sample comment. ${Math.random() > 0.5 ? 'Great work!' : 'Looking forward to more updates!'}`,
              date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
            }))
          }))
        });
      } catch (err) {
        setError('Failed to load data');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMockData();
  }, []);
  
  // Handle navigation
  useEffect(() => {
    const { view, id } = router.query;
    if (view) {
      setCurrentView(view as string);
    }
    if (id) {
      setSelectedItemId(parseInt(id as string));
    }
  }, [router.query]);
  
  // Handle view changes
  const handleViewChange = (view: string, id?: number) => {
    setCurrentView(view);
    if (id !== undefined) {
      setSelectedItemId(id);
      router.push(`/?view=${view}&id=${id}`, undefined, { shallow: true });
    } else {
      setSelectedItemId(null);
      router.push(`/?view=${view}`, undefined, { shallow: true });
    }
  };
  
  // Handle inquiry actions
  const handleViewInquiry = (id: number) => {
    handleViewChange('inquiry-detail', id);
  };
  
  const handleCreateInquiry = () => {
    // In a real app, this would navigate to a form or open a modal
    console.log('Create inquiry');
  };
  
  // Handle property actions
  const handleViewProperty = (id: number) => {
    handleViewChange('property-detail', id);
  };
  
  const handleCreateProperty = () => {
    // In a real app, this would navigate to a form or open a modal
    console.log('Create property');
  };
  
  const handleUpdateProperty = (id: number, data: any) => {
    // In a real app, this would call an API to update the property
    console.log('Update property', id, data);
    
    // Update mock data
    setMockData(prevData => ({
      ...prevData,
      properties: prevData.properties.map(property => 
        property.property_id === id ? { ...property, ...data } : property
      )
    }));
  };
  
  const handleGeneratePropertyDescription = (id: number) => {
    handleViewChange('bot-description', id);
  };
  
  // Handle maintenance actions
  const handleViewRequest = (id: number) => {
    handleViewChange('maintenance-detail', id);
  };
  
  const handleCreateRequest = () => {
    // In a real app, this would navigate to a form or open a modal
    console.log('Create maintenance request');
  };
  
  const handleUpdateRequestStatus = (id: number, status: string) => {
    // In a real app, this would call an API to update the request status
    console.log('Update request status', id, status);
    
    // Update mock data
    setMockData(prevData => ({
      ...prevData,
      maintenanceRequests: prevData.maintenanceRequests.map(request => 
        request.request_id === id ? { ...request, status } : request
      )
    }));
  };
  
  const handleAssignVendor = (id: number, vendorId: number) => {
    // In a real app, this would call an API to assign a vendor
    console.log('Assign vendor', id, vendorId);
    
    // Find vendor
    const vendor = mockData.vendors.find(v => v.vendor_id === vendorId);
    
    // Update mock data
    setMockData(prevData => ({
      ...prevData,
      maintenanceRequests: prevData.maintenanceRequests.map(request => 
        request.request_id === id ? { 
          ...request, 
          vendor_id: vendorId,
          vendor_name: vendor?.name,
          vendor_phone: vendor?.phone,
          vendor_email: vendor?.email
        } : request
      )
    }));
  };
  
  // Handle matchmaking actions
  const handleCreateMatch = (clientId: number, propertyId: number) => {
    // In a real app, this would call an API to create a match
    console.log('Create match', clientId, propertyId);
  };
  
  // Handle social actions
  const handleCreatePost = (content: string, image?: File) => {
    // In a real app, this would call an API to create a post
    console.log('Create post', content, image);
    
    // Update mock data
    const newPost = {
      post_id: mockData.posts.length + 1,
      author: 'You',
      date: new Date().toLocaleDateString(),
      content,
      image_url: image ? URL.createObjectURL(image) : null,
      likes: 0,
      liked: false,
      comments: []
    };
    
    setMockData(prevData => ({
      ...prevData,
      posts: [newPost, ...prevData.posts]
    }));
  };
  
  const handleLikePost = (id: number) => {
    // In a real app, this would call an API to like/unlike a post
    console.log('Like post', id);
    
    // Update mock data
    setMockData(prevData => ({
      ...prevData,
      posts: prevData.posts.map(post => 
        post.post_id === id ? { 
          ...post, 
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        } : post
      )
    }));
  };
  
  const handleCommentPost = (id: number, comment: string) => {
    // In a real app, this would call an API to add a comment
    console.log('Comment post', id, comment);
    
    // Update mock data
    const newComment = {
      author: 'You',
      content: comment,
      date: new Date().toLocaleDateString()
    };
    
    setMockData(prevData => ({
      ...prevData,
      posts: prevData.posts.map(post => 
        post.post_id === id ? { 
          ...post, 
          comments: [...post.comments, newComment]
        } : post
      )
    }));
  };
  
  const handleSharePost = (id: number) => {
    // In a real app, this would open a share dialog
    console.log('Share post', id);
  };
  
  // Handle bot response usage
  const handleUseBotResponse = (response: any) => {
    console.log('Use bot response', response);
    
    // In a real app, this would save the response to the database
    // and navigate back to the appropriate view
    
    // For now, just navigate back
    if (currentView === 'bot-sales' || currentView === 'bot-lease') {
      handleViewChange('inquiries');
    } else if (currentView === 'bot-case-study') {
      handleViewChange('matchmaking');
    } else if (currentView === 'bot-description') {
      // If we have a property ID, update the property description
      if (selectedItemId) {
        handleUpdateProperty(selectedItemId, {
          description: response.description.description_text
        });
        handleViewChange('property-detail', selectedItemId);
      } else {
        handleViewChange('properties');
      }
    }
  };
  
  // Render current view
  const renderView = () => {
    if (isLoading) {
      return <div className="flex items-center justify-center h-64">Loading...</div>;
    }
    
    if (error) {
      return <div className="bg-red-50 p-4 rounded-md text-red-700">{error}</div>;
    }
    
    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={mockData.stats} onViewInquiries={() => handleViewChange('inquiries')} />;
        
      case 'inquiries':
        return (
          <InquiryList 
            inquiries={mockData.inquiries} 
            onViewInquiry={handleViewInquiry}
            onCreateInquiry={handleCreateInquiry}
          />
        );
        
      case 'inquiry-detail':
        const inquiry = mockData.inquiries.find(i => i.inquiry_id === selectedItemId);
        if (!inquiry) return <div>Inquiry not found</div>;
        return (
          <InquiryDetail 
            inquiry={inquiry} 
            onBack={() => handleViewChange('inquiries')}
            onRespondWithSalesBot={() => handleViewChange('bot-sales', inquiry.inquiry_id)}
            onRespondWithLeaseBot={() => handleViewChange('bot-lease', inquiry.inquiry_id)}
          />
        );
        
      case 'properties':
        return (
          <PropertyList 
            properties={mockData.properties} 
            onViewProperty={handleViewProperty}
            onCreateProperty={handleCreateProperty}
          />
(Content truncated due to size limit. Use line ranges to read in chunks)