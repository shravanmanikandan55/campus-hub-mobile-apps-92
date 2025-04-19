
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Preferences } from '@capacitor/preferences';

// Define types for our authentication
type User = {
  userId: string;
  collegeName: string;
  collegeCode: string;
  fullName?: string;
  dob?: string;
  place?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (userData: { userId: string; collegeName: string; collegeCode: string; password: string }) => Promise<void>;
  signup: (userData: User & { password: string }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user data on component mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { value } = await Preferences.get({ key: 'user' });
        if (value) {
          setUser(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (userData: { userId: string; collegeName: string; collegeCode: string; password: string }) => {
    setIsLoading(true);
    try {
      // In a real app, this would validate credentials against a backend
      // For this demo, we'll just save the user data
      const user: User = {
        userId: userData.userId,
        collegeName: userData.collegeName,
        collegeCode: userData.collegeCode,
      };
      
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(user),
      });
      
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: User & { password: string }) => {
    setIsLoading(true);
    try {
      // In a real app, this would register the user with a backend
      // For this demo, we'll just save the user data
      const { password, ...userWithoutPassword } = userData;
      
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(userWithoutPassword),
      });
      
      setUser(userWithoutPassword);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await Preferences.remove({ key: 'user' });
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData: Partial<User>) => {
    if (!user) {
      throw new Error('No user is logged in');
    }

    setIsLoading(true);
    try {
      const updatedUser = { ...user, ...profileData };
      
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(updatedUser),
      });
      
      setUser(updatedUser);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
