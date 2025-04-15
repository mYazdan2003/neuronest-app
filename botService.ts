import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

// Bot types
export type BotType = 'SALES' | 'LEASE' | 'CASE_STUDY' | 'DESCRIPTION';

// Sales Bot implementation
export async function salesBot(emailContent: string, propertyAddress: string, inquiryCount: number) {
  try {
    // Determine which response flow to use based on inquiry count
    let responseFlow = 'first';
    if (inquiryCount === 2) {
      responseFlow = 'second';
    } else if (inquiryCount >= 3) {
      responseFlow = 'third';
    }

    // Create prompt for OpenAI
    const prompt = `
You are a professional real estate sales assistant responding to an inquiry about ${propertyAddress}.
This is the ${responseFlow} time this client has inquired.

The client's email is:
"""
${emailContent}
"""

Please analyze the email and:
1. Determine the main category of inquiry (Price Information, Property Features, Inspection Times, etc.)
2. Create a professional, helpful response that addresses their specific questions
3. Include relevant details about the property if needed
4. If this is their first inquiry, include a link to a survey: https://xbt2ggc0jum.typeform.com/to/rM0mzI2I
5. If this is their second inquiry, include a different survey link: https://forms.gle/ZCENeL8bSyqTqtHi6
6. If this is their third or more inquiry, suggest scheduling a viewing

Format your response as a JSON object with the following fields:
- email_body: The complete email response
- category: The main category of the inquiry
- survey_link: The appropriate survey link if applicable
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const response = JSON.parse(responseContent);
    
    return {
      success: true,
      bot_response: response
    };
  } catch (error) {
    console.error('Sales Bot error:', error);
    return {
      success: false,
      message: 'Error processing sales inquiry',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Lease Bot implementation
export async function leaseBot(emailContent: string, propertyAddress: string, inquiryCount: number) {
  try {
    // Determine which response flow to use based on inquiry count
    let responseFlow = 'first';
    if (inquiryCount === 2) {
      responseFlow = 'second';
    } else if (inquiryCount >= 3) {
      responseFlow = 'third';
    }

    // Create prompt for OpenAI
    const prompt = `
You are a professional real estate leasing assistant responding to an inquiry about renting ${propertyAddress}.
This is the ${responseFlow} time this client has inquired.

The client's email is:
"""
${emailContent}
"""

Please analyze the email and:
1. Determine the main category of inquiry (Rental Price, Lease Terms, Inspection Times, etc.)
2. Create a professional, helpful response that addresses their specific questions
3. Include relevant details about the property if needed
4. If this is their first inquiry, include a link to a survey: https://xbt2ggc0jum.typeform.com/to/rM0mzI2I
5. If this is their second inquiry, include a different survey link: https://forms.gle/ZCENeL8bSyqTqtHi6
6. If this is their third or more inquiry, suggest scheduling a viewing or application process

Format your response as a JSON object with the following fields:
- email_body: The complete email response
- category: The main category of the inquiry
- survey_link: The appropriate survey link if applicable
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const response = JSON.parse(responseContent);
    
    return {
      success: true,
      bot_response: response
    };
  } catch (error) {
    console.error('Lease Bot error:', error);
    return {
      success: false,
      message: 'Error processing lease inquiry',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Case Study Bot implementation
export async function caseStudyBot(
  clientName: string, 
  propertyAddress: string, 
  surveyResponses: any, 
  pastInquiries: string[]
) {
  try {
    // Create prompt for OpenAI
    const prompt = `
You are a professional real estate case study generator. Create a detailed case study for a client interested in a property.

Client: ${clientName}
Property: ${propertyAddress}
Past Inquiries: ${pastInquiries.join(', ') || 'None'}

Survey Responses:
${JSON.stringify(surveyResponses, null, 2)}

Please generate a comprehensive case study with the following sections:
1. Buyer Profile: A brief description of the client and their needs
2. Property Journey: How the client discovered this property and their journey so far
3. What They Love: Features of the property that align with the client's preferences
4. Differences: Areas where the property differs from the client's ideal preferences
5. Agent Brief: Suggestions for the listing agent on how to approach this client

Format your response as a JSON object with the following fields:
- buyer_profile_text: Text for the Buyer Profile section
- property_journey_text: Text for the Property Journey section
- what_they_love_text: Text for the What They Love section
- differences_text: Text for the Differences section
- agent_brief_text: Text for the Agent Brief section
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const caseStudy = JSON.parse(responseContent);
    
    return {
      success: true,
      case_study: caseStudy
    };
  } catch (error) {
    console.error('Case Study Bot error:', error);
    return {
      success: false,
      message: 'Error generating case study',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Property Description Bot implementation
export async function propertyDescriptionBot(
  propertyAddress: string,
  propertyFeatures: any,
  locationInfo: string,
  propertyImages?: string[]
) {
  try {
    // Create prompt for OpenAI
    const prompt = `
You are a professional real estate copywriter. Create a compelling property description for marketing purposes.

Property Address: ${propertyAddress}
Property Features: ${JSON.stringify(propertyFeatures, null, 2)}
Location Information: ${locationInfo}
${propertyImages ? `Property has ${propertyImages.length} images available` : 'No property images available'}

Please generate a professional, engaging property description that:
1. Has an attention-grabbing headline
2. Highlights the key features of the property
3. Describes the location and its benefits
4. Creates emotional appeal for potential buyers
5. Includes a call to action

The description should be approximately 300-400 words and use professional real estate language.

Format your response as a JSON object with the following fields:
- headline: An attention-grabbing headline for the property
- description_text: The full property description
- key_features: Array of 3-5 key selling points
- seo_keywords: Array of 5-8 SEO keywords for this property
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the response
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }

    const description = JSON.parse(responseContent);
    
    return {
      success: true,
      description: description
    };
  } catch (error) {
    console.error('Property Description Bot error:', error);
    return {
      success: false,
      message: 'Error generating property description',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
