import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface BotResponseDisplayProps {
  botType: 'sales' | 'lease' | 'case_study' | 'description';
  response: any;
  onUseResponse: (response: any) => void;
  onReset: () => void;
}

export default function BotResponseDisplay({
  botType,
  response,
  onUseResponse,
  onReset
}: BotResponseDisplayProps) {
  
  const handleUseResponse = () => {
    onUseResponse(response);
  };

  return (
    <Card title={`${botType === 'sales' ? 'Sales' : botType === 'lease' ? 'Lease' : botType === 'case_study' ? 'Case Study' : 'Property Description'} Bot Response`}>
      {(botType === 'sales' || botType === 'lease') && response.bot_response && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category</h3>
            <p className="mt-1 text-sm text-gray-900">{response.bot_response.category}</p>
          </div>
          
          {response.bot_response.survey_link && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Survey Link</h3>
              <p className="mt-1 text-sm text-indigo-600">
                <a href={response.bot_response.survey_link} target="_blank" rel="noopener noreferrer">
                  {response.bot_response.survey_link}
                </a>
              </p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email Response</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{response.bot_response.email_body}</p>
            </div>
          </div>
        </div>
      )}
      
      {botType === 'case_study' && response.case_study && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Buyer Profile</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{response.case_study.buyer_profile_text}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Property Journey</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{response.case_study.property_journey_text}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">What They Love</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{response.case_study.what_they_love_text}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Differences</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{response.case_study.differences_text}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Agent Brief</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900">{response.case_study.agent_brief_text}</p>
            </div>
          </div>
        </div>
      )}
      
      {botType === 'description' && response.description && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Headline</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{response.description.headline}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <div className="mt-1 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{response.description.description_text}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Key Features</h3>
            <ul className="mt-1 list-disc pl-5 space-y-1">
              {response.description.key_features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-gray-900">{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">SEO Keywords</h3>
            <div className="mt-1 flex flex-wrap gap-2">
              {response.description.seo_keywords.map((keyword: string, index: number) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={onReset}
        >
          Generate New Response
        </Button>
        <Button
          variant="primary"
          onClick={handleUseResponse}
        >
          Use This Response
        </Button>
      </div>
    </Card>
  );
}
