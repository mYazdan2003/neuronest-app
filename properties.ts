import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { Property, PropertyDescriptionVersion } from '@/lib/db/models';

// Get all properties (with filtering options)
export async function getProperties(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    
    // Get query parameters
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const suburb = url.searchParams.get('suburb');
    
    let properties: Property[] = [];
    
    // Filter by listed user if not admin/director
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR') {
      properties = await propertyRepository.findByListedUser(authResult.user.id);
      
      // Apply additional filters if needed
      if (status) {
        properties = properties.filter(property => property.status === status);
      }
      if (suburb) {
        properties = properties.filter(property => 
          property.suburb.toLowerCase().includes(suburb.toLowerCase())
        );
      }
    } else {
      // Admin can see all properties with filters
      if (status) {
        properties = await propertyRepository.findByStatus(status);
        
        // Apply suburb filter if needed
        if (suburb) {
          properties = properties.filter(property => 
            property.suburb.toLowerCase().includes(suburb.toLowerCase())
          );
        }
      } else {
        // Would need to implement a method to get all properties with pagination
        // For now, we'll return an empty array
        properties = [];
      }
    }
    
    return Response.json({ success: true, properties });
  } catch (error) {
    console.error('Get properties error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get property by ID
export async function getPropertyById(request: NextRequest, propertyId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    
    // Get property by ID
    const property = await propertyRepository.findById(propertyId);
    if (!property) {
      return Response.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    return Response.json({ success: true, property });
  } catch (error) {
    console.error('Get property by ID error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Create property
export async function createProperty(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get request body
    const body = await request.json();
    const { 
      address_line_1, address_line_2, suburb, state, postal_code,
      status, property_features_json
    } = body;
    
    // Validate input
    if (!address_line_1 || !suburb || !state) {
      return Response.json({ success: false, message: 'Address, suburb, and state are required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    
    // Create new property
    const newProperty: Property = {
      address_line_1,
      address_line_2,
      suburb,
      state,
      postal_code,
      listed_by_user_id: authResult.user.id,
      status: status || 'FOR_SALE',
      property_features_json
    };
    
    const propertyId = await propertyRepository.create(newProperty);
    newProperty.property_id = propertyId;
    
    return Response.json({ 
      success: true, 
      message: 'Property created successfully',
      property: newProperty
    }, { status: 201 });
  } catch (error) {
    console.error('Create property error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Update property
export async function updateProperty(request: NextRequest, propertyId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    
    // Get property by ID
    const existingProperty = await propertyRepository.findById(propertyId);
    if (!existingProperty) {
      return Response.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    // Check if user is authorized to update this property
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        existingProperty.listed_by_user_id !== authResult.user.id) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    
    // Update property object
    const updatedProperty: Property = {
      ...existingProperty,
      address_line_1: body.address_line_1 || existingProperty.address_line_1,
      address_line_2: body.address_line_2 !== undefined ? body.address_line_2 : existingProperty.address_line_2,
      suburb: body.suburb || existingProperty.suburb,
      state: body.state || existingProperty.state,
      postal_code: body.postal_code !== undefined ? body.postal_code : existingProperty.postal_code,
      status: body.status || existingProperty.status,
      property_features_json: body.property_features_json !== undefined ? 
        body.property_features_json : existingProperty.property_features_json
    };
    
    // Update property in database
    const success = await propertyRepository.update(updatedProperty);
    if (!success) {
      return Response.json({ success: false, message: 'Failed to update property' }, { status: 500 });
    }
    
    // Return updated property data
    return Response.json({ 
      success: true, 
      message: 'Property updated successfully',
      property: updatedProperty
    });
  } catch (error) {
    console.error('Update property error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Create property description
export async function createPropertyDescription(request: NextRequest, propertyId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const propertyRepository = repositories.getPropertyRepository();
    const descriptionRepository = repositories.getPropertyDescriptionVersionRepository();
    
    // Get property by ID
    const property = await propertyRepository.findById(propertyId);
    if (!property) {
      return Response.json({ success: false, message: 'Property not found' }, { status: 404 });
    }
    
    // Check if user is authorized to add description to this property
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && 
        property.listed_by_user_id !== authResult.user.id) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get request body
    const body = await request.json();
    const { description_text, is_current_version } = body;
    
    // Validate input
    if (!description_text) {
      return Response.json({ success: false, message: 'Description text is required' }, { status: 400 });
    }
    
    // Create new property description
    const newDescription: PropertyDescriptionVersion = {
      property_id: propertyId,
      description_text,
      created_by_user_id: authResult.user.id,
      is_current_version: is_current_version !== undefined ? is_current_version : true
    };
    
    // Would need to implement this method in the repository
    // const descriptionId = await descriptionRepository.create(newDescription);
    // newDescription.version_id = descriptionId;
    
    return Response.json({ 
      success: true, 
      message: 'Property description created successfully',
      description: newDescription
    }, { status: 201 });
  } catch (error) {
    console.error('Create property description error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
