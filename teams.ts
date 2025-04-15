import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { authenticate } from '@/lib/auth';
import { Team } from '@/lib/db/models';

// Get all teams
export async function getTeams(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const teamRepository = repositories.getTeamRepository();
    
    // Get all teams
    const teams = await teamRepository.findAll();
    
    return Response.json({ success: true, teams });
  } catch (error) {
    console.error('Get teams error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get team by ID
export async function getTeamById(request: NextRequest, teamId: number) {
  try {
    // Authenticate request
    const authResult = await authenticate(request);
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const teamRepository = repositories.getTeamRepository();
    
    // Get team by ID
    const team = await teamRepository.findById(teamId);
    if (!team) {
      return Response.json({ success: false, message: 'Team not found' }, { status: 404 });
    }
    
    return Response.json({ success: true, team });
  } catch (error) {
    console.error('Get team by ID error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Create team (admin only)
export async function createTeam(request: NextRequest) {
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
    
    // Get request body
    const body = await request.json();
    const { team_name, company_name } = body;
    
    // Validate input
    if (!team_name) {
      return Response.json({ success: false, message: 'Team name is required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const teamRepository = repositories.getTeamRepository();
    
    // Create new team
    const newTeam: Team = {
      team_name,
      company_name
    };
    
    const teamId = await teamRepository.create(newTeam);
    newTeam.team_id = teamId;
    
    return Response.json({ 
      success: true, 
      message: 'Team created successfully',
      team: newTeam
    }, { status: 201 });
  } catch (error) {
    console.error('Create team error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Update team (admin only)
export async function updateTeam(request: NextRequest, teamId: number) {
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
    const teamRepository = repositories.getTeamRepository();
    
    // Get team by ID
    const existingTeam = await teamRepository.findById(teamId);
    if (!existingTeam) {
      return Response.json({ success: false, message: 'Team not found' }, { status: 404 });
    }
    
    // Get request body
    const body = await request.json();
    const { team_name, company_name } = body;
    
    // Update team object
    const updatedTeam: Team = {
      ...existingTeam,
      team_name: team_name || existingTeam.team_name,
      company_name: company_name !== undefined ? company_name : existingTeam.company_name
    };
    
    // Update team in database
    const success = await teamRepository.update(updatedTeam);
    if (!success) {
      return Response.json({ success: false, message: 'Failed to update team' }, { status: 500 });
    }
    
    // Return updated team data
    return Response.json({ 
      success: true, 
      message: 'Team updated successfully',
      team: updatedTeam
    });
  } catch (error) {
    console.error('Update team error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
