import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Analytics from '@/components/analytics/Analytics';

describe('Analytics Component', () => {
  const mockStats = {
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
  };
  
  test('renders analytics dashboard correctly', () => {
    render(<Analytics stats={mockStats} />);
    
    // Check if header is rendered
    expect(screen.getByText('Analytics & Insights')).toBeInTheDocument();
    expect(screen.getByText('Track performance and gain valuable insights')).toBeInTheDocument();
    
    // Check if time range selector is rendered
    expect(screen.getByLabelText(/time range/i)).toBeInTheDocument();
    
    // Check if main sections are rendered
    expect(screen.getByText('Inquiry Trends')).toBeInTheDocument();
    expect(screen.getByText('Property Performance')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rates')).toBeInTheDocument();
    expect(screen.getByText('User Activity')).toBeInTheDocument();
    expect(screen.getByText('Client Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Performance by Location')).toBeInTheDocument();
    
    // Check if key metrics are rendered
    expect(screen.getByText('Total Inquiries')).toBeInTheDocument();
    expect(screen.getByText('Avg. Response Time')).toBeInTheDocument();
    expect(screen.getByText('Active Listings')).toBeInTheDocument();
    expect(screen.getByText('Avg. Days on Market')).toBeInTheDocument();
    
    // Check if conversion stages are rendered
    expect(screen.getByText('Inquiry to Viewing')).toBeInTheDocument();
    expect(screen.getByText('Viewing to Offer')).toBeInTheDocument();
    expect(screen.getByText('Offer to Sale')).toBeInTheDocument();
    
    // Check if user activity section has view all button
    expect(screen.getByRole('button', { name: /view all activity/i })).toBeInTheDocument();
    
    // Check if client satisfaction section has ratings
    expect(screen.getByText('Based on 128 reviews')).toBeInTheDocument();
    
    // Check if location table headers are rendered
    expect(screen.getByText('Suburb')).toBeInTheDocument();
    expect(screen.getByText('Listings')).toBeInTheDocument();
    expect(screen.getByText('Avg. Price')).toBeInTheDocument();
    expect(screen.getByText('Inquiries')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
  });
  
  test('changes time range when selector is changed', () => {
    render(<Analytics stats={mockStats} />);
    
    // Check initial time range
    expect(screen.getByLabelText(/time range/i)).toHaveValue('30');
    
    // Change time range
    fireEvent.change(screen.getByLabelText(/time range/i), {
      target: { value: '7' },
    });
    
    // Check that time range was changed
    expect(screen.getByLabelText(/time range/i)).toHaveValue('7');
  });
});
