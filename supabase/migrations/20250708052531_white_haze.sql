/*
  # EZCode Initial Database Schema

  1. New Tables
    - `profiles` - User profiles extending Supabase auth
    - `categories` - Tool categories
    - `tools` - Main tools table
    - `tool_features` - Features for each tool
    - `tool_screenshots` - Screenshots for tools
    - `reviews` - User reviews and ratings
    - `favorites` - User favorites
    - `tool_views` - Track tool views
    - `submissions` - Tool submissions
    - `comparison_sessions` - Tool comparison tracking
    - `bug_reports` - Bug reports from users
    - `feature_requests` - Feature requests
    - `contact_messages` - Contact form submissions
    - `admin_settings` - Admin configuration

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only policies for management tables
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  bio text,
  website text,
  github_username text,
  twitter_username text,
  linkedin_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  icon text,
  color text DEFAULT '#3B82F6',
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  website_url text NOT NULL,
  github_url text,
  documentation_url text,
  category_id uuid REFERENCES categories(id),
  pricing_model text DEFAULT 'free' CHECK (pricing_model IN ('free', 'freemium', 'paid', 'enterprise')),
  starting_price decimal(10,2) DEFAULT 0,
  has_free_trial boolean DEFAULT false,
  trial_duration integer,
  trial_period text CHECK (trial_period IN ('days', 'weeks', 'months')),
  programming_languages text[] DEFAULT '{}',
  supported_platforms text[] DEFAULT '{}',
  integrations text[] DEFAULT '{}',
  view_count integer DEFAULT 0,
  favorite_count integer DEFAULT 0,
  rating_average decimal(3,2) DEFAULT 0,
  rating_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_trending boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_deal boolean DEFAULT false,
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  submitted_by uuid REFERENCES profiles(id),
  approved_by uuid REFERENCES profiles(id),
  approved_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tool_features table
CREATE TABLE IF NOT EXISTS tool_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  feature_name text NOT NULL,
  feature_description text,
  is_available boolean DEFAULT true,
  category text,
  created_at timestamptz DEFAULT now()
);

-- Create tool_screenshots table
CREATE TABLE IF NOT EXISTS tool_screenshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  alt_text text,
  sort_order integer DEFAULT 0,
  is_main boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  is_verified_purchase boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  is_approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(tool_id, user_id)
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tool_id)
);

-- Create tool_views table
CREATE TABLE IF NOT EXISTS tool_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  ip_address inet,
  user_agent text,
  session_id text,
  view_duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  tool_data jsonb NOT NULL,
  payment_intent_id text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  submission_status text DEFAULT 'pending' CHECK (submission_status IN ('pending', 'reviewing', 'approved', 'rejected')),
  admin_notes text,
  reviewed_by uuid REFERENCES profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create comparison_sessions table
CREATE TABLE IF NOT EXISTS comparison_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  session_id text NOT NULL,
  tool_ids uuid[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bug_reports table
CREATE TABLE IF NOT EXISTS bug_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  page_url text,
  screenshot_url text,
  browser_info text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create feature_requests table
CREATE TABLE IF NOT EXISTS feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status text DEFAULT 'open' CHECK (status IN ('open', 'planned', 'in_progress', 'completed', 'rejected')),
  vote_count integer DEFAULT 0,
  assigned_to uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  replied_by uuid REFERENCES profiles(id),
  replied_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb,
  description text,
  updated_by uuid REFERENCES profiles(id),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bug_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Tools policies
CREATE POLICY "Anyone can view active tools" ON tools FOR SELECT USING (is_active = true);
CREATE POLICY "Authenticated users can submit tools" ON tools FOR INSERT WITH CHECK (auth.uid() = submitted_by);
CREATE POLICY "Admins can manage all tools" ON tools FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Users can update own submitted tools" ON tools FOR UPDATE USING (
  auth.uid() = submitted_by AND approved_at IS NULL
);

-- Tool features policies
CREATE POLICY "Anyone can view tool features" ON tool_features FOR SELECT USING (
  EXISTS (SELECT 1 FROM tools WHERE id = tool_id AND is_active = true)
);
CREATE POLICY "Admins can manage tool features" ON tool_features FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Tool screenshots policies
CREATE POLICY "Anyone can view tool screenshots" ON tool_screenshots FOR SELECT USING (
  EXISTS (SELECT 1 FROM tools WHERE id = tool_id AND is_active = true)
);
CREATE POLICY "Admins can manage tool screenshots" ON tool_screenshots FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Reviews policies
CREATE POLICY "Anyone can view approved reviews" ON reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated users can create reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all reviews" ON reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own favorites" ON favorites FOR ALL USING (auth.uid() = user_id);

-- Tool views policies
CREATE POLICY "Anyone can insert tool views" ON tool_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all tool views" ON tool_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all submissions" ON submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Admins can update submissions" ON submissions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Comparison sessions policies
CREATE POLICY "Users can manage own comparison sessions" ON comparison_sessions FOR ALL USING (
  auth.uid() = user_id OR user_id IS NULL
);

-- Bug reports policies
CREATE POLICY "Users can view own bug reports" ON bug_reports FOR SELECT USING (
  auth.uid() = user_id OR 
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Anyone can create bug reports" ON bug_reports FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage bug reports" ON bug_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Feature requests policies
CREATE POLICY "Anyone can view feature requests" ON feature_requests FOR SELECT USING (true);
CREATE POLICY "Anyone can create feature requests" ON feature_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage feature requests" ON feature_requests FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Contact messages policies
CREATE POLICY "Admins can view contact messages" ON contact_messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);
CREATE POLICY "Anyone can create contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update contact messages" ON contact_messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
);

-- Admin settings policies
CREATE POLICY "Admins can manage settings" ON admin_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_active ON tools(is_active);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_tools_trending ON tools(is_trending);
CREATE INDEX IF NOT EXISTS idx_tools_rating ON tools(rating_average);
CREATE INDEX IF NOT EXISTS idx_tools_views ON tools(view_count);
CREATE INDEX IF NOT EXISTS idx_tools_created ON tools(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_tool ON reviews(tool_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_tool ON favorites(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_views_tool ON tool_views(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_views_created ON tool_views(created_at);

-- Create functions for updating ratings
CREATE OR REPLACE FUNCTION update_tool_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tools 
  SET 
    rating_average = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM reviews 
      WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id) AND is_approved = true
    ),
    rating_count = (
      SELECT COUNT(*) 
      FROM reviews 
      WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id) AND is_approved = true
    )
  WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_tool_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_tool_rating();

-- Create function for updating favorite count
CREATE OR REPLACE FUNCTION update_favorite_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tools 
  SET favorite_count = (
    SELECT COUNT(*) 
    FROM favorites 
    WHERE tool_id = COALESCE(NEW.tool_id, OLD.tool_id)
  )
  WHERE id = COALESCE(NEW.tool_id, OLD.tool_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for favorite count
CREATE TRIGGER update_favorite_count_trigger
  AFTER INSERT OR DELETE ON favorites
  FOR EACH ROW
  EXECUTE FUNCTION update_favorite_count();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();