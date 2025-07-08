import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helpers
export const auth = {
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    return { data, error };
  },

  updatePassword: async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    return { data, error };
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Database helpers
export const db = {
  // Tools
  getTools: async (filters = {}) => {
    let query = supabase
      .from('tools')
      .select(`
        *,
        categories (name, slug, color),
        tool_features (feature_name, feature_description, category),
        tool_screenshots (image_url, caption, is_main),
        profiles!tools_submitted_by_fkey (full_name, avatar_url)
      `)
      .eq('is_active', true);

    if (filters.category) {
      query = query.eq('categories.slug', filters.category);
    }
    if (filters.featured) {
      query = query.eq('is_featured', true);
    }
    if (filters.trending) {
      query = query.eq('is_trending', true);
    }
    if (filters.new) {
      query = query.eq('is_new', true);
    }
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%`);
    }
    if (filters.limit) {
      query = query.limit(filters.limit);
    }
    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  getTool: async (slug) => {
    const { data, error } = await supabase
      .from('tools')
      .select(`
        *,
        categories (name, slug, color),
        tool_features (feature_name, feature_description, category),
        tool_screenshots (image_url, caption, alt_text, sort_order, is_main),
        profiles!tools_submitted_by_fkey (full_name, avatar_url)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    return { data, error };
  },

  // Categories
  getCategories: async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    return { data, error };
  },

  // Reviews
  getReviews: async (toolId, limit = 10, offset = 0) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (full_name, avatar_url)
      `)
      .eq('tool_id', toolId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    return { data, error };
  },

  createReview: async (review) => {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();

    return { data, error };
  },

  updateReview: async (id, updates) => {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  deleteReview: async (id) => {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    return { error };
  },

  // Favorites
  getFavorites: async (userId) => {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        tools (*)
      `)
      .eq('user_id', userId);

    return { data, error };
  },

  addFavorite: async (userId, toolId) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, tool_id: toolId })
      .select()
      .single();

    return { data, error };
  },

  removeFavorite: async (userId, toolId) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('tool_id', toolId);

    return { error };
  },

  // Tool views
  addToolView: async (toolId, userId = null, sessionId = null) => {
    const { data, error } = await supabase
      .from('tool_views')
      .insert({
        tool_id: toolId,
        user_id: userId,
        session_id: sessionId,
        ip_address: null, // Will be handled by edge function
        user_agent: navigator.userAgent
      });

    return { data, error };
  },

  // Submissions
  createSubmission: async (submission) => {
    const { data, error } = await supabase
      .from('submissions')
      .insert(submission)
      .select()
      .single();

    return { data, error };
  },

  getSubmissions: async (userId = null) => {
    let query = supabase
      .from('submissions')
      .select(`
        *,
        profiles!submissions_user_id_fkey (full_name, email)
      `);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    return { data, error };
  },

  updateSubmission: async (id, updates) => {
    const { data, error } = await supabase
      .from('submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  // Profiles
  getProfile: async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    return { data, error };
  },

  updateProfile: async (userId, updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  },

  // Bug reports
  createBugReport: async (report) => {
    const { data, error } = await supabase
      .from('bug_reports')
      .insert(report)
      .select()
      .single();

    return { data, error };
  },

  // Feature requests
  createFeatureRequest: async (request) => {
    const { data, error } = await supabase
      .from('feature_requests')
      .insert(request)
      .select()
      .single();

    return { data, error };
  },

  // Contact messages
  createContactMessage: async (message) => {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert(message)
      .select()
      .single();

    return { data, error };
  },

  // Admin settings
  getSettings: async () => {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('*');

    return { data, error };
  },

  updateSetting: async (key, value) => {
    const { data, error } = await supabase
      .from('admin_settings')
      .upsert({ key, value })
      .select()
      .single();

    return { data, error };
  }
};

export default supabase;