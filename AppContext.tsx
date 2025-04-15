import React, { useState, useEffect } from 'react';

// Context for managing application state
export const AppContext = React.createContext<{
  user: any;
  whiteLabelSettings: any;
  setWhiteLabelSettings: (settings: any) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({
  user: null,
  whiteLabelSettings: {},
  setWhiteLabelSettings: () => {},
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [whiteLabelSettings, setWhiteLabelSettings] = useState({
    companyName: 'NeuroNest',
    primaryColor: '#4f46e5',
    secondaryColor: '#10b981',
    logo: '',
    contactEmail: 'support@neuronest.com',
    contactPhone: '+1 (555) 123-4567',
    customDomain: 'app.neuronest.com',
    welcomeMessage: 'Welcome to NeuroNest, your all-in-one real estate management platform.',
    emailSignature: 'Best regards,\nThe NeuroNest Team\nPhone: +1 (555) 123-4567\nEmail: support@neuronest.com',
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would call an API to check authentication
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would call an API to authenticate
      // For demo purposes, accept any email/password
      const mockUser = {
        id: 1,
        name: 'Demo User',
        email,
        role: 'ADMIN',
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Update white label settings
  const updateWhiteLabelSettings = (settings: any) => {
    setWhiteLabelSettings(settings);
    // In a real app, this would also save to backend
    localStorage.setItem('whiteLabelSettings', JSON.stringify(settings));
  };

  // Load white label settings
  useEffect(() => {
    const storedSettings = localStorage.getItem('whiteLabelSettings');
    if (storedSettings) {
      setWhiteLabelSettings(JSON.parse(storedSettings));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        whiteLabelSettings,
        setWhiteLabelSettings: updateWhiteLabelSettings,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => React.useContext(AppContext);
