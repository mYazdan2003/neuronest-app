// Types for database models
export interface User {
  user_id?: number;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'STAFF' | 'DIRECTOR' | 'TEAM_LEAD' | 'AGENT' | 'PM';
  team_id?: number;
  phone_number?: string;
  subscription_plan?: string;
  voice_training_ref?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Team {
  team_id?: number;
  team_name: string;
  company_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Client {
  client_id?: number;
  email?: string;
  full_name?: string;
  phone_number?: string;
  client_type?: 'TENANT' | 'BUYER' | 'SELLER' | 'UNKNOWN';
  buyer_preferences_json?: string;
  last_inquiry_at?: string;
  created_by_user_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Property {
  property_id?: number;
  address_line_1: string;
  address_line_2?: string;
  suburb: string;
  state: string;
  postal_code?: string;
  listed_by_user_id?: number;
  status?: 'FOR_SALE' | 'FOR_RENT' | 'SOLD' | 'LEASED';
  property_features_json?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Inquiry {
  inquiry_id?: number;
  client_id?: number;
  property_id?: number;
  subject?: string;
  raw_email_body?: string;
  classification?: 'REAL_ESTATE_INQUIRY' | 'SPAM' | 'ADVERT';
  sub_category?: string;
  assigned_user_id?: number;
  do_not_contact_flag?: boolean;
  status?: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  urgency_level?: 'HIGH' | 'MEDIUM' | 'LOW';
  received_timestamp?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Vendor {
  vendor_id?: number;
  vendor_name: string;
  vendor_email?: string;
  vendor_phone?: string;
  specialization?: 'PLUMBING' | 'ELECTRICAL' | 'HVAC' | 'PEST_CONTROL';
  created_at?: string;
  updated_at?: string;
}

export interface MaintenanceRequest {
  request_id?: number;
  inquiry_id?: number;
  property_id: number;
  vendor_id?: number;
  category?: 'PLUMBING' | 'ELECTRICAL' | 'MOLD';
  status?: 'OPEN' | 'ASSIGNED' | 'COMPLETED';
  assigned_timestamp?: string;
  completed_timestamp?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SocialPost {
  post_id?: number;
  user_id: number;
  content: string;
  visibility_scope?: 'PUBLIC' | 'TEAM_ONLY' | 'CUSTOM';
  created_at?: string;
  updated_at?: string;
}

export interface SocialComment {
  comment_id?: number;
  post_id: number;
  user_id: number;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface SocialLike {
  like_id?: number;
  post_id: number;
  user_id: number;
  created_at?: string;
}

export interface CaseStudyDoc {
  case_study_id?: number;
  property_id: number;
  client_id: number;
  buyer_profile_text?: string;
  property_journey_text?: string;
  what_they_love_text?: string;
  differences_text?: string;
  agent_brief_text?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyDescriptionVersion {
  version_id?: number;
  property_id: number;
  description_text: string;
  created_by_user_id: number;
  is_current_version?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PropertyImage {
  image_id?: number;
  property_id: number;
  file_url: string;
  description?: string;
  created_at?: string;
}

export interface AuditLog {
  audit_id?: number;
  user_id?: number;
  action_type: string;
  description?: string;
  related_record_type?: string;
  related_record_id?: number;
  timestamp?: string;
}
