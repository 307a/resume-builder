import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, userManager } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      try {
        const savedUser = userManager.getUser();
        if (savedUser) {
          setUser(savedUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        userManager.removeUser();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);
      const response = await authAPI.register(userData);
      userManager.setUser(response.user);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setError('');
      setLoading(true);
      const response = await authAPI.login(credentials);
      userManager.setUser(response.user);
      setUser(response.user);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    userManager.removeUser();
    setUser(null);
    setError('');
  };

  const clearError = () => {
    setError('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        clearError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
