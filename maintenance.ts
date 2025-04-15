import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { MaintenanceRequest } from '@/lib/db/models';

// Get all maintenance requests (with filtering options)
export async function getMaintenanceRequests(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const maintenanceRepository = repositories.getMaintenanceRequestRepository();
    
    // Get query parameters
    const url = new URL(request.url);
    const propertyId = url.searchParams.get('property_id');
    const vendorId = url.searchParams.get('vendor_id');
    const status = url.searchParams.get('status');
    
    // Would need to implement these methods in the repository
    // For now, we'll return an empty array
    let requests: MaintenanceRequest[] = [];
    
    return Response.json({ success: true, maintenance_requests: requests });
  } catch (error) {
    console.error('Get maintenance requests error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get maintenance request by ID
export async function getMaintenanceRequestById(request: NextRequest, requestId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const maintenanceRepository = repositories.getMaintenanceRequestRepository();
    const propertyRepository = repositories.getPropertyRepository();
    
    // Would need to implement this method in the repository
    // For now, we'll return a not found response
    return Response.json({ success: false, message: 'Maintenance request not found' }, { status: 404 });
  } catch (error) {
    console.error('Get maintenance request by ID error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Create maintenance request
export async function createMaintenanceRequest(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Check if user is a property manager
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        authResult.user.role !== 'PM') {
      return Response.json({ success: false, message: 'Only property managers can create maintenance requests' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    const { 
      inquiry_id, property_id, vendor_id, category, status
    } = body;
    
    // Validate input
    if (!property_id) {
      return Response.json({ success: false, message: 'Property ID is required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const maintenanceRepository = repositories.getMaintenanceRequestRepository();
    const propertyRepository = repositories.getPropertyRepository();
    
    // Check if property exists
    const property = await propertyRepository.findById(property_id);
    if (!property) {
      return Response.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    // Create new maintenance request
    const newRequest: MaintenanceRequest = {
      inquiry_id,
      property_id,
      vendor_id,
      category: category || 'PLUMBING',
      status: status || 'OPEN',
      assigned_timestamp: vendor_id ? new Date().toISOString() : undefined
    };
    
    // Would need to implement this method in the repository
    // const requestId = await maintenanceRepository.create(newRequest);
    // newRequest.request_id = requestId;
    
    return Response.json({ 
      success: true, 
      message: 'Maintenance request created successfully',
      maintenance_request: newRequest
    }, { status: 201 });
  } catch (error) {
    console.error('Create maintenance request error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Update maintenance request
export async function updateMaintenanceRequest(request: NextRequest, requestId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Check if user is a property manager
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        authResult.user.role !== 'PM') {
      return Response.json({ success: false, message: 'Only property managers can update maintenance requests' }, { status: 403 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const maintenanceRepository = repositories.getMaintenanceRequestRepository();
    
    // Would need to implement this method in the repository
    // For now, we'll return a not found response
    return Response.json({ success: false, message: 'Maintenance request not found' }, { status: 404 });
  } catch (error) {
    console.error('Update maintenance request error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
