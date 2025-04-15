import { salesBot, leaseBot, caseStudyBot, propertyDescriptionBot } from '@/lib/bots/botService';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';

// Process email with Sales Bot
export async function processSalesBot(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { email_content, property_address, inquiry_count } = body;
    
    // Validate input
    if (!email_content || !property_address) {
      return Response.json({ success: false, message: 'Email content and property address are required' }, { status: 400 });
    }
    
    // Process email with Sales Bot
    const botResponse = await salesBot(email_content, property_address, inquiry_count || 1);
    
    if (!botResponse.success) {
      return Response.json({ 
        success: false, 
        message: botResponse.message || 'Error processing with Sales Bot'
      }, { status: 500 });
    }
    
    return Response.json({ 
      success: true, 
      bot_response: botResponse.bot_response
    });
  } catch (error) {
    console.error('Sales Bot error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Process email with Lease Bot
export async function processLeaseBot(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { email_content, property_address, inquiry_count } = body;
    
    // Validate input
    if (!email_content || !property_address) {
      return Response.json({ success: false, message: 'Email content and property address are required' }, { status: 400 });
    }
    
    // Process email with Lease Bot
    const botResponse = await leaseBot(email_content, property_address, inquiry_count || 1);
    
    if (!botResponse.success) {
      return Response.json({ 
        success: false, 
        message: botResponse.message || 'Error processing with Lease Bot'
      }, { status: 500 });
    }
    
    return Response.json({ 
      success: true, 
      bot_response: botResponse.bot_response
    });
  } catch (error) {
    console.error('Lease Bot error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Generate case study with Case Study Bot
export async function generateCaseStudy(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { client_id, property_id, survey_responses, past_inquiries } = body;
    
    // Validate input
    if (!client_id || !property_id || !survey_responses) {
      return Response.json({ success: false, message: 'Client ID, property ID, and survey responses are required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const clientRepository = repositories.getClientRepository();
    const propertyRepository = repositories.getPropertyRepository();
    
    // Get client and property data
    const client = await clientRepository.findById(client_id);
    const property = await propertyRepository.findById(property_id);
    
    if (!client || !property) {
      return Response.json({ success: false, message: 'Client or property not found' }, { status: 404 });
    }
    
    // Generate case study using AI
    const fullAddress = `${property.address_line_1}, ${property.suburb}, ${property.state}`;
    const caseStudyResponse = await caseStudyBot(
      client.full_name,
      fullAddress,
      survey_responses,
      past_inquiries || []
    );
    
    if (!caseStudyResponse.success) {
      return Response.json({ 
        success: false, 
        message: caseStudyResponse.message || 'Error generating case study'
      }, { status: 500 });
    }
    
    // Create case study document in database
    const caseStudyRepository = repositories.getCaseStudyRepository();
    const caseStudy = {
      property_id,
      client_id,
      buyer_profile_text: caseStudyResponse.case_study.buyer_profile_text,
      property_journey_text: caseStudyResponse.case_study.property_journey_text,
      what_they_love_text: caseStudyResponse.case_study.what_they_love_text,
      differences_text: caseStudyResponse.case_study.differences_text,
      agent_brief_text: caseStudyResponse.case_study.agent_brief_text,
      created_by_user_id: authResult.user.id
    };
    
    // Would need to implement this method in the repository
    // const caseStudyId = await caseStudyRepository.create(caseStudy);
    // caseStudy.case_study_id = caseStudyId;
    
    return Response.json({ 
      success: true, 
      case_study: caseStudyResponse.case_study
    });
  } catch (error) {
    console.error('Case Study Bot error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Generate property description with Description Generator Bot
export async function generatePropertyDescription(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { property_id, property_images, location_info } = body;
    
    // Validate input
    if (!property_id) {
      return Response.json({ success: false, message: 'Property ID is required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    
    // Get property data
    const property = await propertyRepository.findById(property_id);
    
    if (!property) {
      return Response.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    // Parse property features
    const features = property.property_features_json ? 
      JSON.parse(property.property_features_json) : 
      { bedrooms: 3, bathrooms: 2, parking: 1 };
    
    // Generate property description using AI
    const fullAddress = `${property.address_line_1}, ${property.suburb}, ${property.state}`;
    const locationDetails = location_info || `Located in ${property.suburb}, ${property.state}`;
    
    const descriptionResponse = await propertyDescriptionBot(
      fullAddress,
      features,
      locationDetails,
      property_images
    );
    
    if (!descriptionResponse.success) {
      return Response.json({ 
        success: false, 
        message: descriptionResponse.message || 'Error generating property description'
      }, { status: 500 });
    }
    
    // Create property description version in database
    const descriptionRepository = repositories.getPropertyDescriptionVersionRepository();
    const descriptionVersion = {
      property_id,
      description_text: descriptionResponse.description.description_text,
      headline: descriptionResponse.description.headline,
      key_features: JSON.stringify(descriptionResponse.description.key_features),
      seo_keywords: JSON.stringify(descriptionResponse.description.seo_keywords),
      created_by_user_id: authResult.user.id,
      is_current_version: true
    };
    
    // Would need to implement this method in the repository
    // const descriptionId = await descriptionRepository.create(descriptionVersion);
    // descriptionVersion.version_id = descriptionId;
    
    return Response.json({ 
      success: true, 
      description: descriptionResponse.description
    });
  } catch (error) {
    console.error('Description Generator Bot error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
