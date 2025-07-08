import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';

// Custom hook for fetching tools
export const useTools = (filters = {}) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.getTools(filters);
        if (error) throw error;
        setTools(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [JSON.stringify(filters)]);

  return { tools, loading, error, refetch: () => fetchTools() };
};

// Custom hook for fetching a single tool
export const useTool = (slug) => {
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchTool = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.getTool(slug);
        if (error) throw error;
        setTool(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTool();
  }, [slug]);

  return { tool, loading, error };
};

// Custom hook for fetching categories
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.getCategories();
        if (error) throw error;
        setCategories(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Custom hook for fetching reviews
export const useReviews = (toolId, limit = 10) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchReviews = async (reset = false) => {
    if (!toolId) return;

    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const { data, error } = await db.getReviews(toolId, limit, currentOffset);
      if (error) throw error;

      if (reset) {
        setReviews(data || []);
        setOffset(limit);
      } else {
        setReviews(prev => [...prev, ...(data || [])]);
        setOffset(prev => prev + limit);
      }

      setHasMore((data || []).length === limit);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(true);
  }, [toolId]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchReviews(false);
    }
  };

  return { reviews, loading, error, hasMore, loadMore, refetch: () => fetchReviews(true) };
};

// Custom hook for managing favorites
export const useFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.getFavorites(userId);
        if (error) throw error;
        setFavorites(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const addFavorite = async (toolId) => {
    if (!userId) return { error: new Error('User not logged in') };

    try {
      const { data, error } = await db.addFavorite(userId, toolId);
      if (error) throw error;
      setFavorites(prev => [...prev, data]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const removeFavorite = async (toolId) => {
    if (!userId) return { error: new Error('User not logged in') };

    try {
      const { error } = await db.removeFavorite(userId, toolId);
      if (error) throw error;
      setFavorites(prev => prev.filter(fav => fav.tool_id !== toolId));
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const isFavorite = (toolId) => {
    return favorites.some(fav => fav.tool_id === toolId);
  };

  return { favorites, loading, error, addFavorite, removeFavorite, isFavorite };
};

// Custom hook for submissions
export const useSubmissions = (userId = null) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.getSubmissions(userId);
        if (error) throw error;
        setSubmissions(data || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [userId]);

  const createSubmission = async (submission) => {
    try {
      const { data, error } = await db.createSubmission(submission);
      if (error) throw error;
      setSubmissions(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const updateSubmission = async (id, updates) => {
    try {
      const { data, error } = await db.updateSubmission(id, updates);
      if (error) throw error;
      setSubmissions(prev => prev.map(sub => sub.id === id ? data : sub));
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return { submissions, loading, error, createSubmission, updateSubmission };
};

export default {
  useTools,
  useTool,
  useCategories,
  useReviews,
  useFavorites,
  useSubmissions
};