import React, { useState } from 'react';
import Header from '@/components/ui/Header';
import BotResponseGenerator from '@/components/bots/BotResponseGenerator';
import BotResponseDisplay from '@/components/bots/BotResponseDisplay';

interface BotPageProps {
  botType: 'sales' | 'lease' | 'case_study' | 'description';
  propertyId?: number;
  clientId?: number;
  onUseResponse: (response: any) => void;
}

export default function BotPage({
  botType,
  propertyId,
  clientId,
  onUseResponse
}: BotPageProps) {
  const [response, setResponse] = useState<any>(null);
  
  const handleGenerateResponse = async (data: any) => {
    // This would be replaced with actual API calls
    try {
      const endpoint = `/api/bots/${
        botType === 'sales' ? 'sales' : 
        botType === 'lease' ? 'lease' : 
        botType === 'case_study' ? 'case-study' : 
        'description'
      }`;
      
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await res.json();
      return responseData;
    } catch (error) {
      console.error('Error generating response:', error);
      return {
        success: false,
        message: 'Failed to generate response'
      };
    }
  };
  
  const handleResponseGenerated = (generatedResponse: any) => {
    setResponse(generatedResponse);
  };
  
  const handleReset = () => {
    setResponse(null);
  };
  
  const title = 
    botType === 'sales' ? 'Sales Bot' : 
    botType === 'lease' ? 'Lease Bot' : 
    botType === 'case_study' ? 'Case Study Bot' : 
    'Property Description Bot';
  
  const subtitle = 
    botType === 'sales' ? 'Generate responses to sales inquiries' : 
    botType === 'lease' ? 'Generate responses to leasing inquiries' : 
    botType === 'case_study' ? 'Create detailed case studies for clients' : 
    'Create compelling property descriptions';

  return (
    <div>
      <Header 
        title={title}
        subtitle={subtitle}
      />
      
      {!response ? (
        <BotResponseGenerator
          botType={botType}
          propertyId={propertyId}
          clientId={clientId}
          onGenerateResponse={handleGenerateResponse}
          onResponseGenerated={handleResponseGenerated}
        />
      ) : (
        <BotResponseDisplay
          botType={botType}
          response={response}
          onUseResponse={onUseResponse}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
