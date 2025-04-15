import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BotResponseGenerator from '@/components/bots/BotResponseGenerator';

describe('BotResponseGenerator Component', () => {
  const mockOnGenerateResponse = jest.fn().mockResolvedValue({ success: true, data: {} });
  const mockOnResponseGenerated = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders sales bot form correctly', () => {
    render(
      <BotResponseGenerator 
        botType="sales"
        onGenerateResponse={mockOnGenerateResponse}
        onResponseGenerated={mockOnResponseGenerated}
      />
    );
    
    expect(screen.getByLabelText(/client email content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/inquiry count/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate response/i })).toBeInTheDocument();
  });
  
  test('renders case study bot form correctly', () => {
    render(
      <BotResponseGenerator 
        botType="case_study"
        onGenerateResponse={mockOnGenerateResponse}
        onResponseGenerated={mockOnResponseGenerated}
      />
    );
    
    expect(screen.getByLabelText(/survey responses/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/past inquiries/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate response/i })).toBeInTheDocument();
  });
  
  test('renders property description bot form correctly', () => {
    render(
      <BotResponseGenerator 
        botType="description"
        propertyId={1}
        onGenerateResponse={mockOnGenerateResponse}
        onResponseGenerated={mockOnResponseGenerated}
      />
    );
    
    expect(screen.getByLabelText(/additional location information/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate response/i })).toBeInTheDocument();
  });
  
  test('validates sales bot form inputs', async () => {
    render(
      <BotResponseGenerator 
        botType="sales"
        onGenerateResponse={mockOnGenerateResponse}
        onResponseGenerated={mockOnResponseGenerated}
      />
    );
    
    // Try to submit without filling in email content
    fireEvent.click(screen.getByRole('button', { name: /generate response/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/email content is required/i)).toBeInTheDocument();
    });
  });
  
  test('submits sales bot form with valid data', async () => {
    render(
      <BotResponseGenerator 
        botType="sales"
        propertyId={1}
        onGenerateResponse={mockOnGenerateResponse}
        onResponseGenerated={mockOnResponseGenerated}
      />
    );
    
    // Fill in form with valid data
    fireEvent.change(screen.getByLabelText(/client email content/i), {
      target: { value: 'I am interested in this property. Can you tell me more about it?' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /generate response/i }));
    
    // Check that the form submission is in progress
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /generating/i })).toBeInTheDocument();
    });
    
    // Check that the onGenerateResponse function was called with correct data
    await waitFor(() => {
      expect(mockOnGenerateResponse).toHaveBeenCalledWith({
        email_content: 'I am interested in this property. Can you tell me more about it?',
        property_id: 1,
        inquiry_count: 1
      });
    });
    
    // Check that the onResponseGenerated function was called
    await waitFor(() => {
      expect(mockOnResponseGenerated).toHaveBeenCalled();
    });
  });
});
