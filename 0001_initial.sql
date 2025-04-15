-- Migration number: 0001 	 2025-04-15T09:43:56.000Z
-- NeuroNest Application Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS property_description_versions;
DROP TABLE IF EXISTS case_study_docs;
DROP TABLE IF EXISTS social_likes;
DROP TABLE IF EXISTS social_comments;
DROP TABLE IF EXISTS social_posts;
DROP TABLE IF EXISTS maintenance_requests;
DROP TABLE IF EXISTS vendors;
DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS property_images;

-- Teams Table
CREATE TABLE IF NOT EXISTS teams (
  team_id INTEGER PRIMARY KEY AUTOINCREMENT,
  team_name TEXT NOT NULL,
  company_name TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('STAFF', 'DIRECTOR', 'TEAM_LEAD', 'AGENT', 'PM')),
  team_id INTEGER,
  phone_number TEXT,
  subscription_plan TEXT,
  voice_training_ref TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

-- Clients Table (Leads / Tenants / Buyers / Sellers)
CREATE TABLE IF NOT EXISTS clients (
  client_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  full_name TEXT,
  phone_number TEXT,
  client_type TEXT CHECK (client_type IN ('TENANT', 'BUYER', 'SELLER', 'UNKNOWN')),
  buyer_preferences_json TEXT, -- JSON format for budget range, suburb prefs, property features, etc.
  last_inquiry_at DATETIME,
  created_by_user_id INTEGER,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by_user_id) REFERENCES users(user_id)
);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
  property_id INTEGER PRIMARY KEY AUTOINCREMENT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  listed_by_user_id INTEGER,
  status TEXT CHECK (status IN ('FOR_SALE', 'FOR_RENT', 'SOLD', 'LEASED')),
  property_features_json TEXT, -- JSON format for beds, baths, special features, etc.
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listed_by_user_id) REFERENCES users(user_id)
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  inquiry_id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER,
  property_id INTEGER,
  subject TEXT,
  raw_email_body TEXT,
  classification TEXT CHECK (classification IN ('REAL_ESTATE_INQUIRY', 'SPAM', 'ADVERT')),
  sub_category TEXT,
  assigned_user_id INTEGER,
  do_not_contact_flag BOOLEAN DEFAULT 0,
  status TEXT CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED')),
  urgency_level TEXT CHECK (urgency_level IN ('HIGH', 'MEDIUM', 'LOW')),
  received_timestamp DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(client_id),
  FOREIGN KEY (property_id) REFERENCES properties(property_id),
  FOREIGN KEY (assigned_user_id) REFERENCES users(user_id)
);

-- Vendors Table
CREATE TABLE IF NOT EXISTS vendors (
  vendor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  vendor_name TEXT NOT NULL,
  vendor_email TEXT,
  vendor_phone TEXT,
  specialization TEXT CHECK (specialization IN ('PLUMBING', 'ELECTRICAL', 'HVAC', 'PEST_CONTROL')),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance Requests Table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  request_id INTEGER PRIMARY KEY AUTOINCREMENT,
  inquiry_id INTEGER,
  property_id INTEGER NOT NULL,
  vendor_id INTEGER,
  category TEXT CHECK (category IN ('PLUMBING', 'ELECTRICAL', 'MOLD')),
  status TEXT CHECK (status IN ('OPEN', 'ASSIGNED', 'COMPLETED')),
  assigned_timestamp DATETIME,
  completed_timestamp DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inquiry_id) REFERENCES inquiries(inquiry_id),
  FOREIGN KEY (property_id) REFERENCES properties(property_id),
  FOREIGN KEY (vendor_id) REFERENCES vendors(vendor_id)
);

-- Social Posts Table
CREATE TABLE IF NOT EXISTS social_posts (
  post_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  visibility_scope TEXT CHECK (visibility_scope IN ('PUBLIC', 'TEAM_ONLY', 'CUSTOM')),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Social Comments Table
CREATE TABLE IF NOT EXISTS social_comments (
  comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES social_posts(post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Social Likes Table
CREATE TABLE IF NOT EXISTS social_likes (
  like_id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES social_posts(post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Case Study Docs Table (Automated Home Matchmaking)
CREATE TABLE IF NOT EXISTS case_study_docs (
  case_study_id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  buyer_profile_text TEXT,
  property_journey_text TEXT,
  what_they_love_text TEXT,
  differences_text TEXT,
  agent_brief_text TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(property_id),
  FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- Property Description Versions Table
CREATE TABLE IF NOT EXISTS property_description_versions (
  version_id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  description_text TEXT NOT NULL,
  created_by_user_id INTEGER NOT NULL,
  is_current_version BOOLEAN DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(property_id),
  FOREIGN KEY (created_by_user_id) REFERENCES users(user_id)
);

-- Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
  image_id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  file_url TEXT NOT NULL,
  description TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action_type TEXT NOT NULL,
  description TEXT,
  related_record_type TEXT,
  related_record_id INTEGER,
  timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_team_id ON users(team_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_properties_listed_by_user_id ON properties(listed_by_user_id);
CREATE INDEX idx_inquiries_client_id ON inquiries(client_id);
CREATE INDEX idx_inquiries_property_id ON inquiries(property_id);
CREATE INDEX idx_inquiries_assigned_user_id ON inquiries(assigned_user_id);
CREATE INDEX idx_maintenance_requests_property_id ON maintenance_requests(property_id);
CREATE INDEX idx_maintenance_requests_vendor_id ON maintenance_requests(vendor_id);
CREATE INDEX idx_social_posts_user_id ON social_posts(user_id);
CREATE INDEX idx_social_comments_post_id ON social_comments(post_id);
CREATE INDEX idx_social_likes_post_id ON social_likes(post_id);
CREATE INDEX idx_case_study_docs_property_id ON case_study_docs(property_id);
CREATE INDEX idx_case_study_docs_client_id ON case_study_docs(client_id);
CREATE INDEX idx_property_description_versions_property_id ON property_description_versions(property_id);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_related_record_type ON audit_logs(related_record_type, related_record_id);

-- Insert initial admin user
INSERT INTO teams (team_name, company_name) VALUES ('NeuroNest Staff', 'NeuroNest');

INSERT INTO users (email, password_hash, full_name, role, team_id) VALUES 
('admin@neuronest.com', '$2a$12$1234567890123456789012', 'Admin User', 'STAFF', 1);
