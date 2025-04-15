import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormTextarea from '@/components/ui/FormTextarea';
import FormSelect from '@/components/ui/FormSelect';

interface BotResponseGeneratorProps {
  botType: 'sales' | 'lease' | 'case_study' | 'description';
  propertyId?: number;
  clientId?: number;
  onGenerateResponse: (data: any) => Promise<any>;
  onResponseGenerated: (response: any) => void;
}

export default function BotResponseGenerator({
  botType,
  propertyId,
  clientId,
  onGenerateResponse,
  onResponseGenerated
}: BotResponseGeneratorProps) {
  const [emailContent, setEmailContent] = useState('');
  const [inquiryCount, setInquiryCount] = useState('1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
  // For case study bot
  const [surveyResponses, setSurveyResponses] = useState('');
  const [pastInquiries, setPastInquiries] = useState('');
  
  // For property description bot
  const [locationInfo, setLocationInfo] = useState('');

  const handleGenerateResponse = async () => {
    try {
      setIsGenerating(true);
      setError('');
      
      let requestData = {};
      
      if (botType === 'sales' || botType === 'lease') {
        if (!emailContent.trim()) {
          setError('Email content is required');
          setIsGenerating(false);
          return;
        }
        
        requestData = {
          email_content: emailContent,
          property_id: propertyId,
          inquiry_count: parseInt(inquiryCount)
        };
      } else if (botType === 'case_study') {
        if (!surveyResponses.trim()) {
          setError('Survey responses are required');
          setIsGenerating(false);
          return;
        }
        
        let parsedSurveyResponses;
        try {
          parsedSurveyResponses = JSON.parse(surveyResponses);
        } catch (e) {
          setError('Survey responses must be valid JSON');
          setIsGenerating(false);
          return;
        }
        
        const parsedPastInquiries = pastInquiries.trim() 
          ? pastInquiries.split(',').map(item => item.trim()) 
          : [];
        
        requestData = {
          client_id: clientId,
          property_id: propertyId,
          survey_responses: parsedSurveyResponses,
          past_inquiries: parsedPastInquiries
        };
      } else if (botType === 'description') {
        requestData = {
          property_id: propertyId,
          location_info: locationInfo
        };
      }
      
      const response = await onGenerateResponse(requestData);
      
      if (response.success) {
        onResponseGenerated(response);
      } else {
        setError(response.message || 'Error generating response');
      }
    } catch (error) {
      setError('An error occurred while generating the response');
      console.error('Bot response generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card title={`Generate ${botType === 'sales' ? 'Sales' : botType === 'lease' ? 'Lease' : botType === 'case_study' ? 'Case Study' : 'Property Description'} Bot Response`}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {(botType === 'sales' || botType === 'lease') && (
        <>
          <FormTextarea
            id="emailContent"
            label="Client Email Content"
            placeholder="Paste the client's email content here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            rows={6}
            required
          />
          
          <div className="mt-4">
            <FormSelect
              id="inquiryCount"
              label="Inquiry Count"
              value={inquiryCount}
              onChange={(e) => setInquiryCount(e.target.value)}
              options={[
                { value: '1', label: 'First Inquiry' },
                { value: '2', label: 'Second Inquiry' },
                { value: '3', label: 'Third or More Inquiry' },
              ]}
            />
          </div>
        </>
      )}
      
      {botType === 'case_study' && (
        <>
          <FormTextarea
            id="surveyResponses"
            label="Survey Responses (JSON format)"
            placeholder="Enter survey responses in JSON format..."
            value={surveyResponses}
            onChange={(e) => setSurveyResponses(e.target.value)}
            rows={6}
            required
          />
          
          <div className="mt-4">
            <FormTextarea
              id="pastInquiries"
              label="Past Inquiries (comma-separated)"
              placeholder="Enter past property inquiries, separated by commas..."
              value={pastInquiries}
              onChange={(e) => setPastInquiries(e.target.value)}
              rows={3}
            />
          </div>
        </>
      )}
      
      {botType === 'description' && (
        <FormTextarea
          id="locationInfo"
          label="Additional Location Information"
          placeholder="Enter additional information about the property location..."
          value={locationInfo}
          onChange={(e) => setLocationInfo(e.target.value)}
          rows={4}
        />
      )}
      
      <div className="mt-6 flex justify-end">
        <Button
          variant="primary"
          onClick={handleGenerateResponse}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Response'}
        </Button>
      </div>
    </Card>
  );
}
