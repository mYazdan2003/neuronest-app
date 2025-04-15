import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { Inquiry } from '@/lib/db/models';

// Get all inquiries (with filtering options)
export async function getInquiries(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const inquiryRepository = repositories.getInquiryRepository();
    
    // Get query parameters
    const url = new URL(request.url);
    const clientId = url.searchParams.get('client_id');
    const propertyId = url.searchParams.get('property_id');
    const status = url.searchParams.get('status');
    
    let inquiries: Inquiry[] = [];
    
    // Filter by assigned user if not admin/director
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR') {
      inquiries = await inquiryRepository.findByAssignedUser(authResult.user.id);
      
      // Apply additional filters if needed
      if (clientId) {
        inquiries = inquiries.filter(inquiry => inquiry.client_id === parseInt(clientId));
      }
      if (propertyId) {
        inquiries = inquiries.filter(inquiry => inquiry.property_id === parseInt(propertyId));
      }
      if (status) {
        inquiries = inquiries.filter(inquiry => inquiry.status === status);
      }
    } else {
      // Admin can see all inquiries with filters
      if (clientId) {
        inquiries = await inquiryRepository.findByClient(parseInt(clientId));
      } else if (propertyId) {
        inquiries = await inquiryRepository.findByProperty(parseInt(propertyId));
      } else {
        // Would need to implement a method to get all inquiries with pagination
        // For now, we'll return an empty array
        inquiries = [];
      }
      
      // Apply status filter if needed
      if (status) {
        inquiries = inquiries.filter(inquiry => inquiry.status === status);
      }
    }
    
    return Response.json({ success: true, inquiries });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get inquiry by ID
export async function getInquiryById(request: NextRequest, inquiryId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const inquiryRepository = repositories.getInquiryRepository();
    
    // Get inquiry by ID
    const inquiry = await inquiryRepository.findById(inquiryId);
    if (!inquiry) {
      return Response.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }
    
    // Check if user is authorized to view this inquiry
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        inquiry.assigned_user_id !== authResult.user.id) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    return Response.json({ success: true, inquiry });
  } catch (error) {
    console.error('Get inquiry by ID error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Create inquiry
export async function createInquiry(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { 
      client_id, property_id, subject, raw_email_body, classification,
      sub_category, assigned_user_id, do_not_contact_flag, status, urgency_level
    } = body;
    
    // Validate input
    if (!raw_email_body) {
      return Response.json({ success: false, message: 'Email body is required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const inquiryRepository = repositories.getInquiryRepository();
    
    // Create new inquiry
    const newInquiry: Inquiry = {
      client_id,
      property_id,
      subject,
      raw_email_body,
      classification,
      sub_category,
      assigned_user_id: assigned_user_id || authResult.user.id,
      do_not_contact_flag,
      status: status || 'OPEN',
      urgency_level: urgency_level || 'MEDIUM',
      received_timestamp: new Date().toISOString()
    };
    
    const inquiryId = await inquiryRepository.create(newInquiry);
    newInquiry.inquiry_id = inquiryId;
    
    return Response.json({ 
      success: true, 
      message: 'Inquiry created successfully',
      inquiry: newInquiry
    }, { status: 201 });
  } catch (error) {
    console.error('Create inquiry error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Update inquiry
export async function updateInquiry(request: NextRequest, inquiryId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const inquiryRepository = repositories.getInquiryRepository();
    
    // Get inquiry by ID
    const existingInquiry = await inquiryRepository.findById(inquiryId);
    if (!existingInquiry) {
      return Response.json({ success: false, message: 'Inquiry not found' }, { status: 404 });
    }
    
    // Check if user is authorized to update this inquiry
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        existingInquiry.assigned_user_id !== authResult.user.id) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    
    // Update inquiry object
    const updatedInquiry: Inquiry = {
      ...existingInquiry,
      client_id: body.client_id !== undefined ? body.client_id : existingInquiry.client_id,
      property_id: body.property_id !== undefined ? body.property_id : existingInquiry.property_id,
      subject: body.subject !== undefined ? body.subject : existingInquiry.subject,
      classification: body.classification || existingInquiry.classification,
      sub_category: body.sub_category !== undefined ? body.sub_category : existingInquiry.sub_category,
      assigned_user_id: body.assigned_user_id !== undefined ? body.assigned_user_id : existingInquiry.assigned_user_id,
      do_not_contact_flag: body.do_not_contact_flag !== undefined ? body.do_not_contact_flag : existingInquiry.do_not_contact_flag,
      status: body.status || existingInquiry.status,
      urgency_level: body.urgency_level || existingInquiry.urgency_level
    };
    
    // Update inquiry in database
    const success = await inquiryRepository.update(updatedInquiry);
    if (!success) {
      return Response.json({ success: false, message: 'Failed to update inquiry' }, { status: 500 });
    }
    
    // Return updated inquiry data
    return Response.json({ 
      success: true, 
      message: 'Inquiry updated successfully',
      inquiry: updatedInquiry
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
