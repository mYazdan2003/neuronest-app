import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { User } from '@/lib/db/models';

// Get all users (admin only)
export async function getUsers(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Check if user is admin
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR') {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Get team filter if provided
    const url = new URL(request.url);
    const teamId = url.searchParams.get('team_id');
    
    let users;
    if (teamId) {
      // Get users by team
      users = await userRepository.findByTeam(parseInt(teamId));
    } else {
      // Get all users (would need to implement this method in the repository)
      // For now, we'll return an empty array
      users = [];
    }
    
    // Map users to remove sensitive information
    const mappedUsers = users.map(user => ({
      id: user.user_id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      team_id: user.team_id,
      phone_number: user.phone_number,
      subscription_plan: user.subscription_plan
    }));
    
    return Response.json({ success: true, users: mappedUsers });
  } catch (error) {
    console.error('Get users error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get user by ID
export async function getUserById(request: NextRequest, userId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Check if user is authorized (admin or self)
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && authResult.user.id !== userId) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Get user by ID
    const user = await userRepository.findById(userId);
    if (!user) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    // Return user data (excluding password)
    return Response.json({ 
      success: true, 
      user: {
        id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        team_id: user.team_id,
        phone_number: user.phone_number,
        subscription_plan: user.subscription_plan
      }
    });
  } catch (error) {
    console.error('Get user by ID error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Update user
export async function updateUser(request: NextRequest, userId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Check if user is authorized (admin or self)
    if (authResult.user.role !== 'STAFF' && authResult.user.role !== 'DIRECTOR' && authResult.user.id !== userId) {
      return Response.json({ success: false, message: 'Unauthorized' }, { status: 403 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Get user by ID
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      return Response.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
    // Get request body
    const body = await request.json();
    const { full_name, phone_number, subscription_plan, team_id } = body;
    
    // Update user object
    const updatedUser: User = {
      ...existingUser,
      full_name: full_name || existingUser.full_name,
      phone_number: phone_number !== undefined ? phone_number : existingUser.phone_number,
      subscription_plan: subscription_plan !== undefined ? subscription_plan : existingUser.subscription_plan,
      team_id: team_id !== undefined ? team_id : existingUser.team_id
    };
    
    // Only admins can change roles or teams
    if (body.role && (authResult.user.role === 'STAFF' || authResult.user.role === 'DIRECTOR')) {
      updatedUser.role = body.role;
    }
    
    // Update user in database
    const success = await userRepository.update(updatedUser);
    if (!success) {
      return Response.json({ success: false, message: 'Failed to update user' }, { status: 500 });
    }
    
    // Return updated user data
    return Response.json({ 
      success: true, 
      message: 'User updated successfully',
      user: {
        id: updatedUser.user_id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
        role: updatedUser.role,
        team_id: updatedUser.team_id,
        phone_number: updatedUser.phone_number,
        subscription_plan: updatedUser.subscription_plan
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
