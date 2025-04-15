import { DbContext } from './index';
import { 
  User, Team, Client, Property, Inquiry, Vendor, 
  MaintenanceRequest, SocialPost, SocialComment, 
  SocialLike, CaseStudyDoc, PropertyDescriptionVersion,
  PropertyImage, AuditLog
} from './models';

// User repository
export class UserRepository {
  constructor(private dbContext: DbContext) {}

  async findById(id: number): Promise<User | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM users WHERE user_id = ?')
      .bind(id)
      .first();
    return result as User | null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM users WHERE email = ?')
      .bind(email)
      .first();
    return result as User | null;
  }

  async create(user: User): Promise<number> {
    const result = await this.dbContext.db
      .prepare(`
        INSERT INTO users (email, password_hash, full_name, role, team_id, phone_number, subscription_plan, voice_training_ref)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        user.email,
        user.password_hash,
        user.full_name,
        user.role,
        user.team_id || null,
        user.phone_number || null,
        user.subscription_plan || null,
        user.voice_training_ref || null
      )
      .run();
    
    return result.meta.last_row_id as number;
  }

  async update(user: User): Promise<boolean> {
    if (!user.user_id) return false;
    
    const result = await this.dbContext.db
      .prepare(`
        UPDATE users 
        SET email = ?, full_name = ?, role = ?, team_id = ?, 
            phone_number = ?, subscription_plan = ?, voice_training_ref = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `)
      .bind(
        user.email,
        user.full_name,
        user.role,
        user.team_id || null,
        user.phone_number || null,
        user.subscription_plan || null,
        user.voice_training_ref || null,
        user.user_id
      )
      .run();
    
    return result.success;
  }

  async findByTeam(teamId: number): Promise<User[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM users WHERE team_id = ?')
      .bind(teamId)
      .all();
    return result.results as User[];
  }
}

// Team repository
export class TeamRepository {
  constructor(private dbContext: DbContext) {}

  async findById(id: number): Promise<Team | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM teams WHERE team_id = ?')
      .bind(id)
      .first();
    return result as Team | null;
  }

  async findAll(): Promise<Team[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM teams')
      .all();
    return result.results as Team[];
  }

  async create(team: Team): Promise<number> {
    const result = await this.dbContext.db
      .prepare(`
        INSERT INTO teams (team_name, company_name)
        VALUES (?, ?)
      `)
      .bind(
        team.team_name,
        team.company_name || null
      )
      .run();
    
    return result.meta.last_row_id as number;
  }

  async update(team: Team): Promise<boolean> {
    if (!team.team_id) return false;
    
    const result = await this.dbContext.db
      .prepare(`
        UPDATE teams 
        SET team_name = ?, company_name = ?, updated_at = CURRENT_TIMESTAMP
        WHERE team_id = ?
      `)
      .bind(
        team.team_name,
        team.company_name || null,
        team.team_id
      )
      .run();
    
    return result.success;
  }
}

// Client repository
export class ClientRepository {
  constructor(private dbContext: DbContext) {}

  async findById(id: number): Promise<Client | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM clients WHERE client_id = ?')
      .bind(id)
      .first();
    return result as Client | null;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM clients WHERE email = ?')
      .bind(email)
      .first();
    return result as Client | null;
  }

  async create(client: Client): Promise<number> {
    const result = await this.dbContext.db
      .prepare(`
        INSERT INTO clients (email, full_name, phone_number, client_type, buyer_preferences_json, created_by_user_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .bind(
        client.email || null,
        client.full_name || null,
        client.phone_number || null,
        client.client_type || 'UNKNOWN',
        client.buyer_preferences_json || null,
        client.created_by_user_id || null
      )
      .run();
    
    return result.meta.last_row_id as number;
  }

  async update(client: Client): Promise<boolean> {
    if (!client.client_id) return false;
    
    const result = await this.dbContext.db
      .prepare(`
        UPDATE clients 
        SET email = ?, full_name = ?, phone_number = ?, client_type = ?, 
            buyer_preferences_json = ?, last_inquiry_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE client_id = ?
      `)
      .bind(
        client.email || null,
        client.full_name || null,
        client.phone_number || null,
        client.client_type || 'UNKNOWN',
        client.buyer_preferences_json || null,
        client.last_inquiry_at || null,
        client.client_id
      )
      .run();
    
    return result.success;
  }

  async findByCreator(userId: number): Promise<Client[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM clients WHERE created_by_user_id = ?')
      .bind(userId)
      .all();
    return result.results as Client[];
  }
}

// Property repository
export class PropertyRepository {
  constructor(private dbContext: DbContext) {}

  async findById(id: number): Promise<Property | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM properties WHERE property_id = ?')
      .bind(id)
      .first();
    return result as Property | null;
  }

  async findByListedUser(userId: number): Promise<Property[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM properties WHERE listed_by_user_id = ?')
      .bind(userId)
      .all();
    return result.results as Property[];
  }

  async findByStatus(status: string): Promise<Property[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM properties WHERE status = ?')
      .bind(status)
      .all();
    return result.results as Property[];
  }

  async create(property: Property): Promise<number> {
    const result = await this.dbContext.db
      .prepare(`
        INSERT INTO properties (address_line_1, address_line_2, suburb, state, postal_code, 
                               listed_by_user_id, status, property_features_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        property.address_line_1,
        property.address_line_2 || null,
        property.suburb,
        property.state,
        property.postal_code || null,
        property.listed_by_user_id || null,
        property.status || 'FOR_SALE',
        property.property_features_json || null
      )
      .run();
    
    return result.meta.last_row_id as number;
  }

  async update(property: Property): Promise<boolean> {
    if (!property.property_id) return false;
    
    const result = await this.dbContext.db
      .prepare(`
        UPDATE properties 
        SET address_line_1 = ?, address_line_2 = ?, suburb = ?, state = ?, 
            postal_code = ?, listed_by_user_id = ?, status = ?, 
            property_features_json = ?, updated_at = CURRENT_TIMESTAMP
        WHERE property_id = ?
      `)
      .bind(
        property.address_line_1,
        property.address_line_2 || null,
        property.suburb,
        property.state,
        property.postal_code || null,
        property.listed_by_user_id || null,
        property.status || 'FOR_SALE',
        property.property_features_json || null,
        property.property_id
      )
      .run();
    
    return result.success;
  }
}

// Inquiry repository
export class InquiryRepository {
  constructor(private dbContext: DbContext) {}

  async findById(id: number): Promise<Inquiry | null> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM inquiries WHERE inquiry_id = ?')
      .bind(id)
      .first();
    return result as Inquiry | null;
  }

  async findByClient(clientId: number): Promise<Inquiry[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM inquiries WHERE client_id = ?')
      .bind(clientId)
      .all();
    return result.results as Inquiry[];
  }

  async findByProperty(propertyId: number): Promise<Inquiry[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM inquiries WHERE property_id = ?')
      .bind(propertyId)
      .all();
    return result.results as Inquiry[];
  }

  async findByAssignedUser(userId: number): Promise<Inquiry[]> {
    const result = await this.dbContext.db
      .prepare('SELECT * FROM inquiries WHERE assigned_user_id = ?')
      .bind(userId)
      .all();
    return result.results as Inquiry[];
  }

  async create(inquiry: Inquiry): Promise<number> {
    const result = await this.dbContext.db
      .prepare(`
        INSERT INTO inquiries (client_id, property_id, subject, raw_email_body, classification,
                              sub_category, assigned_user_id, do_not_contact_flag, status,
                              urgency_level, received_timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .bind(
        inquiry.client_id || null,
        inquiry.property_id || null,
        inquiry.subject || null,
        inquiry.raw_email_body || null,
        inquiry.classification || 'REAL_ESTATE_INQUIRY',
        inquiry.sub_category || null,
        inquiry.assigned_user_id || null,
        inquiry.do_not_contact_flag ? 1 : 0,
        inquiry.status || 'OPEN',
        inquiry.urgency_level || 'MEDIUM',
        inquiry.received_timestamp || new Date().toISOString()
      )
      .run();
    
    return result.meta.last_row_id as number;
  }

  async update(inquiry: Inquiry): Promise<boolean> {
    if (!inquiry.inquiry_id) return false;
    
    const result = await this.dbContext.db
      .prepare(`
        UPDATE inquiries 
        SET client_id = ?, property_id = ?, subject = ?, raw_email_body = ?,
            classification = ?, sub_category = ?, assigned_user_id = ?,
            do_not_contact_flag = ?, status = ?, urgency_level = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE inquiry_id = ?
      `)
      .bind(
        inquiry.client_id || null,
        inquiry.property_id || null,
        inquiry.subject || null,
        inquiry.raw_email_body || null,
        inquiry.classification || 'REAL_ESTATE_INQUIRY',
        inquiry.sub_category || null,
        inquiry.assigned_user_id || null,
        inquiry.do_not_contact_flag ? 1 : 0,
        inquiry.status || 'OPEN',
        inquiry.urgency_level || 'MEDIUM',
        inquiry.inquiry_id
      )
      .run();
    
    return result.success;
  }
}

// Export other repositories as needed
export class VendorRepository {
  constructor(private dbContext: DbContext) {}
  
  // Implementation similar to other repositories
}

export class MaintenanceRequestRepository {
  constructor(private dbContext: DbContext) {}
  
  // Implementation similar to other repositories
}

export class SocialPostRepository {
  constructor(private dbContext: DbContext) {}
  
  // Implementation similar to other repositories
}

export class CaseStudyDocRepository {
  constructor(private dbContext: DbContext) {}
  
  // Implementation similar to other repositories
}

export class PropertyDescriptionVersionRepository {
  constructor(private dbContext: DbContext) {}
  
  // Implementation similar to other repositories
}

// Repository factory to get all repositories
export class RepositoryFactory {
  private dbContext: DbContext;
  
  constructor(dbContext: DbContext) {
    this.dbContext = dbContext;
  }
  
  getUserRepository(): UserRepository {
    return new UserRepository(this.dbContext);
  }
  
  getTeamRepository(): TeamRepository {
    return new TeamRepository(this.dbContext);
  }
  
  getClientRepository(): ClientRepository {
    return new ClientRepository(this.dbContext);
  }
  
  getPropertyRepository(): PropertyRepository {
    return new PropertyRepository(this.dbContext);
  }
  
  getInquiryRepository(): InquiryRepository {
    return new InquiryRepository(this.dbContext);
  }
  
  getVendorRepository(): VendorRepository {
    return new VendorRepository(this.dbContext);
  }
  
  getMaintenanceRequestRepository(): MaintenanceRequestRepository {
    return new MaintenanceRequestRepository(this.dbContext);
  }
  
  getSocialPostRepository(): SocialPostRepository {
    return new SocialPostRepository(this.dbContext);
  }
  
  getCaseStudyDocRepository(): CaseStudyDocRepository {
    return new CaseStudyDocRepository(this.dbContext);
  }
  
  getPropertyDescriptionVersionRepository(): PropertyDescriptionVersionRepository {
    return new PropertyDescriptionVersionRepository(this.dbContext);
  }
}
