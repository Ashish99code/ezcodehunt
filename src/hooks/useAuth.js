import { useState, useEffect, createContext, useContext } from 'react';
import { auth, db } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { session } = await auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        // Get user profile
        const { data: profileData } = await db.getProfile(session.user.id);
        setProfile(profileData);
      }
      
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user || null);
      
      if (session?.user) {
        // Get user profile
        const { data: profileData } = await db.getProfile(session.user.id);
        setProfile(profileData);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, userData = {}) => {
    setLoading(true);
    try {
      const { data, error } = await auth.signUp(email, password, userData);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    try {
      const { data, error } = await auth.resetPassword(email);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updatePassword = async (password) => {
    try {
      const { data, error } = await auth.updatePassword(password);
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return { data: null, error: new Error('No user logged in') };
    
    try {
      const { data, error } = await db.updateProfile(user.id, updates);
      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const isAdmin = () => {
    return profile?.role === 'admin';
  };

  const isModerator = () => {
    return profile?.role === 'moderator' || profile?.role === 'admin';
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAdmin,
    isModerator
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;