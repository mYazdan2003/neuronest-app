import { getDbContext } from '@/lib/db';
import { RepositoryFactory } from '@/lib/db/repositories';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { User } from '@/lib/db/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT secret - in production this should be an environment variable
const JWT_SECRET = 'neuronest-secret-key';

// Generate JWT token
const generateToken = (user: User): string => {
  const payload = {
    id: user.user_id,
    email: user.email,
    role: user.role,
    team_id: user.team_id
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

// Verify JWT token
const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
export const authenticate = async (request: NextRequest) => {
  const token = request.headers.get('Authorization')?.split(' ')[1];
  
  if (!token) {
    return { authenticated: false, message: 'No token provided' };
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return { authenticated: false, message: 'Invalid token' };
  }
  
  return { authenticated: true, user: decoded };
};

// Register a new user
export async function register(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, role, team_id } = body;
    
    // Validate input
    if (!email || !password || !full_name || !role) {
      return Response.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return Response.json({ success: false, message: 'User already exists' }, { status: 400 });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser: User = {
      email,
      password_hash: hashedPassword,
      full_name,
      role,
      team_id: team_id || undefined
    };
    
    const userId = await userRepository.create(newUser);
    newUser.user_id = userId;
    
    // Generate token
    const token = generateToken(newUser);
    
    // Return success response
    return Response.json({ 
      success: true, 
      message: 'User registered successfully',
      token,
      user: {
        id: userId,
        email: newUser.email,
        full_name: newUser.full_name,
        role: newUser.role,
        team_id: newUser.team_id
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Login user
export async function login(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Validate input
    if (!email || !password) {
      return Response.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return Response.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }
    
    // Generate token
    const token = generateToken(user);
    
    // Return success response
    return Response.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: {
        id: user.user_id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        team_id: user.team_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// Get current user
export async function getCurrentUser(request: NextRequest) {
  try {
    const authResult = await authenticate(request);
    
    if (!authResult.authenticated) {
      return Response.json({ success: false, message: authResult.message }, { status: 401 });
    }
    
    // Get database context
    const dbContext = getDbContext(request.env);
    const repositories = new RepositoryFactory(dbContext);
    const userRepository = repositories.getUserRepository();
    
    // Find user by ID
    const user = await userRepository.findById(authResult.user.id);
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
    console.error('Get current user error:', error);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
