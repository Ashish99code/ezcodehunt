/*
  # Insert sample data for EZCode platform

  1. Categories
    - Insert 8 main tool categories with proper metadata
  
  2. Sample Tools
    - GitHub Copilot (AI Assistant)
    - Cursor IDE (Code Editor) 
    - Tabnine (AI Assistant)
    - Replit (Browser IDE)
    - CodeT5 (Code Generator)
  
  3. Tool Features
    - Add feature lists for each sample tool
  
  4. Tool Screenshots
    - Add sample screenshots for each tool
  
  5. Admin Settings
    - Configure platform settings and defaults
*/

-- Insert categories (only if they don't exist)
INSERT INTO categories (name, slug, description, icon, color, sort_order) 
SELECT * FROM (VALUES
  ('AI Assistant', 'ai-assistant', 'AI-powered coding assistants and completion tools', 'Bot', '#3B82F6', 1),
  ('Code Editor', 'code-editor', 'Advanced code editors and IDEs', 'Code', '#8B5CF6', 2),
  ('Browser IDE', 'browser-ide', 'Web-based development environments', 'Globe', '#10B981', 3),
  ('Debugging Tools', 'debugging-tools', 'Tools for debugging and code analysis', 'Bug', '#F59E0B', 4),
  ('Code Generators', 'code-generators', 'AI-powered code generation tools', 'Zap', '#EF4444', 5),
  ('DevOps', 'devops', 'Development operations and deployment tools', 'Settings', '#6366F1', 6),
  ('Testing Tools', 'testing-tools', 'Automated testing and QA tools', 'TestTube', '#EC4899', 7),
  ('Documentation', 'documentation', 'Documentation generation and management', 'FileText', '#14B8A6', 8)
) AS v(name, slug, description, icon, color, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE categories.slug = v.slug
);

-- Insert sample tools (only if they don't exist)
DO $$
DECLARE
  ai_assistant_category_id uuid;
  code_editor_category_id uuid;
  browser_ide_category_id uuid;
  code_generators_category_id uuid;
BEGIN
  -- Get category IDs
  SELECT id INTO ai_assistant_category_id FROM categories WHERE slug = 'ai-assistant';
  SELECT id INTO code_editor_category_id FROM categories WHERE slug = 'code-editor';
  SELECT id INTO browser_ide_category_id FROM categories WHERE slug = 'browser-ide';
  SELECT id INTO code_generators_category_id FROM categories WHERE slug = 'code-generators';

  -- Insert GitHub Copilot
  IF NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'github-copilot') THEN
    INSERT INTO tools (
      title, slug, tagline, description, thumbnail_url, website_url, github_url,
      category_id, pricing_model, starting_price, has_free_trial,
      programming_languages, supported_platforms, integrations,
      is_featured, is_trending, is_new, is_verified, is_active
    ) VALUES (
      'GitHub Copilot',
      'github-copilot',
      'Your AI pair programmer',
      'GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor. Trained on billions of lines of code, it turns natural language prompts into coding suggestions across dozens of languages.',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      'https://github.com/features/copilot',
      'https://github.com/github/copilot',
      ai_assistant_category_id,
      'paid',
      10.00,
      true,
      ARRAY['JavaScript', 'Python', 'TypeScript', 'Java', 'C++', 'Go', 'Rust'],
      ARRAY['VS Code', 'Visual Studio', 'Neovim', 'JetBrains IDEs'],
      ARRAY['GitHub', 'VS Code', 'JetBrains'],
      true,
      true,
      false,
      true,
      true
    );
  END IF;

  -- Insert Cursor IDE
  IF NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'cursor-ide') THEN
    INSERT INTO tools (
      title, slug, tagline, description, thumbnail_url, website_url, github_url,
      category_id, pricing_model, starting_price, has_free_trial,
      programming_languages, supported_platforms, integrations,
      is_featured, is_trending, is_new, is_verified, is_active
    ) VALUES (
      'Cursor IDE',
      'cursor-ide',
      'AI-first code editor',
      'Cursor is the IDE of the future, built for pair-programming with AI. Built to make you extraordinarily productive, Cursor is the best way to code with AI.',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://cursor.sh',
      null,
      code_editor_category_id,
      'freemium',
      20.00,
      true,
      ARRAY['JavaScript', 'Python', 'TypeScript', 'Go', 'Rust'],
      ARRAY['Windows', 'macOS', 'Linux'],
      ARRAY['GitHub', 'GitLab'],
      true,
      true,
      true,
      true,
      true
    );
  END IF;

  -- Insert Tabnine
  IF NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'tabnine') THEN
    INSERT INTO tools (
      title, slug, tagline, description, thumbnail_url, website_url, github_url,
      category_id, pricing_model, starting_price, has_free_trial,
      programming_languages, supported_platforms, integrations,
      is_featured, is_trending, is_new, is_verified, is_active
    ) VALUES (
      'Tabnine',
      'tabnine',
      'AI code completion tool',
      'Tabnine is an AI assistant that speeds up delivery and keeps your code safe. It provides intelligent code completions based on context and syntax.',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      'https://tabnine.com',
      null,
      ai_assistant_category_id,
      'freemium',
      12.00,
      true,
      ARRAY['JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP'],
      ARRAY['VS Code', 'IntelliJ', 'Sublime Text', 'Vim'],
      ARRAY['VS Code', 'IntelliJ', 'Eclipse'],
      true,
      false,
      false,
      true,
      true
    );
  END IF;

  -- Insert Replit
  IF NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'replit') THEN
    INSERT INTO tools (
      title, slug, tagline, description, thumbnail_url, website_url, github_url,
      category_id, pricing_model, starting_price, has_free_trial,
      programming_languages, supported_platforms, integrations,
      is_featured, is_trending, is_new, is_verified, is_active
    ) VALUES (
      'Replit',
      'replit',
      'Browser-based IDE',
      'Replit is a simple yet powerful online IDE, Editor, Compiler, Interpreter, and REPL. Code, compile, run, and host in 50+ programming languages.',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      'https://replit.com',
      null,
      browser_ide_category_id,
      'freemium',
      7.00,
      true,
      ARRAY['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust', 'PHP'],
      ARRAY['Web Browser'],
      ARRAY['GitHub', 'GitLab', 'Bitbucket'],
      false,
      true,
      false,
      true,
      true
    );
  END IF;

  -- Insert CodeT5
  IF NOT EXISTS (SELECT 1 FROM tools WHERE slug = 'codet5') THEN
    INSERT INTO tools (
      title, slug, tagline, description, thumbnail_url, website_url, github_url,
      category_id, pricing_model, starting_price, has_free_trial,
      programming_languages, supported_platforms, integrations,
      is_featured, is_trending, is_new, is_verified, is_active
    ) VALUES (
      'CodeT5',
      'codet5',
      'AI code generation model',
      'CodeT5 is a pre-trained encoder-decoder Transformer model for code understanding and generation. It can perform various code-related tasks.',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      'https://huggingface.co/Salesforce/codet5-base',
      'https://github.com/salesforce/CodeT5',
      code_generators_category_id,
      'free',
      0.00,
      false,
      ARRAY['Python', 'Java', 'JavaScript', 'C#', 'PHP'],
      ARRAY['API', 'Hugging Face'],
      ARRAY['Hugging Face', 'Transformers'],
      false,
      false,
      true,
      true,
      true
    );
  END IF;
END $$;

-- Insert tool features (only if they don't exist)
DO $$
DECLARE
  current_tool_id uuid;
BEGIN
  -- GitHub Copilot features
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'github-copilot';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_features (tool_id, feature_name, feature_description, category)
    SELECT current_tool_id, v.feature_name, v.feature_description, v.category
    FROM (VALUES
      ('Code Completion', 'AI-powered code suggestions and completions', 'core'),
      ('Multi-language Support', 'Supports dozens of programming languages', 'languages'),
      ('Context Awareness', 'Understands code context for better suggestions', 'ai'),
      ('Function Generation', 'Generates entire functions from comments', 'ai'),
      ('IDE Integration', 'Seamless integration with popular IDEs', 'integration')
    ) AS v(feature_name, feature_description, category)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_features tf
      WHERE tf.tool_id = current_tool_id 
      AND tf.feature_name = v.feature_name
    );
  END IF;

  -- Cursor IDE features
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'cursor-ide';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_features (tool_id, feature_name, feature_description, category)
    SELECT current_tool_id, v.feature_name, v.feature_description, v.category
    FROM (VALUES
      ('AI Chat', 'Built-in AI chat for code assistance', 'ai'),
      ('Code Generation', 'Generate code from natural language', 'ai'),
      ('Refactoring', 'AI-powered code refactoring', 'ai'),
      ('Debugging', 'Advanced debugging capabilities', 'debugging'),
      ('Version Control', 'Built-in Git integration', 'collaboration')
    ) AS v(feature_name, feature_description, category)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_features tf
      WHERE tf.tool_id = current_tool_id 
      AND tf.feature_name = v.feature_name
    );
  END IF;

  -- Tabnine features
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'tabnine';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_features (tool_id, feature_name, feature_description, category)
    SELECT current_tool_id, v.feature_name, v.feature_description, v.category
    FROM (VALUES
      ('Code Completion', 'AI code completion and suggestions', 'core'),
      ('Team Learning', 'Learns from your team code patterns', 'ai'),
      ('Privacy First', 'Code never leaves your environment', 'security'),
      ('Multi-IDE Support', 'Works with multiple IDEs and editors', 'integration')
    ) AS v(feature_name, feature_description, category)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_features tf
      WHERE tf.tool_id = current_tool_id 
      AND tf.feature_name = v.feature_name
    );
  END IF;

  -- Replit features
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'replit';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_features (tool_id, feature_name, feature_description, category)
    SELECT current_tool_id, v.feature_name, v.feature_description, v.category
    FROM (VALUES
      ('Browser IDE', 'Full IDE experience in the browser', 'core'),
      ('Real-time Collaboration', 'Collaborate with others in real-time', 'collaboration'),
      ('Instant Deployment', 'Deploy your projects instantly', 'deployment'),
      ('Package Management', 'Built-in package management', 'core')
    ) AS v(feature_name, feature_description, category)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_features tf
      WHERE tf.tool_id = current_tool_id 
      AND tf.feature_name = v.feature_name
    );
  END IF;

  -- CodeT5 features
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'codet5';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_features (tool_id, feature_name, feature_description, category)
    SELECT current_tool_id, v.feature_name, v.feature_description, v.category
    FROM (VALUES
      ('Code Generation', 'Generate code from natural language', 'ai'),
      ('Code Summarization', 'Summarize code functionality', 'ai'),
      ('Code Translation', 'Translate between programming languages', 'ai'),
      ('Bug Detection', 'Identify potential bugs in code', 'debugging')
    ) AS v(feature_name, feature_description, category)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_features tf
      WHERE tf.tool_id = current_tool_id 
      AND tf.feature_name = v.feature_name
    );
  END IF;
END $$;

-- Insert tool screenshots (only if they don't exist)
DO $$
DECLARE
  current_tool_id uuid;
BEGIN
  -- GitHub Copilot screenshots
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'github-copilot';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main)
    SELECT current_tool_id, v.image_url, v.caption, v.alt_text, v.sort_order, v.is_main
    FROM (VALUES
      ('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'GitHub Copilot in action', 'GitHub Copilot suggesting code in VS Code', 1, true),
      ('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Code completion example', 'Example of AI code completion', 2, false)
    ) AS v(image_url, caption, alt_text, sort_order, is_main)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_screenshots ts
      WHERE ts.tool_id = current_tool_id 
      AND ts.image_url = v.image_url
    );
  END IF;

  -- Cursor IDE screenshots
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'cursor-ide';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main)
    SELECT current_tool_id, v.image_url, v.caption, v.alt_text, v.sort_order, v.is_main
    FROM (VALUES
      ('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'Cursor IDE interface', 'Main interface of Cursor IDE', 1, true),
      ('https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop', 'AI chat feature', 'AI chat assistant in Cursor', 2, false)
    ) AS v(image_url, caption, alt_text, sort_order, is_main)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_screenshots ts
      WHERE ts.tool_id = current_tool_id 
      AND ts.image_url = v.image_url
    );
  END IF;

  -- Tabnine screenshots
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'tabnine';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main)
    SELECT current_tool_id, v.image_url, v.caption, v.alt_text, v.sort_order, v.is_main
    FROM (VALUES
      ('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop', 'Tabnine suggestions', 'Tabnine providing code suggestions', 1, true)
    ) AS v(image_url, caption, alt_text, sort_order, is_main)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_screenshots ts
      WHERE ts.tool_id = current_tool_id 
      AND ts.image_url = v.image_url
    );
  END IF;

  -- Replit screenshots
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'replit';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main)
    SELECT current_tool_id, v.image_url, v.caption, v.alt_text, v.sort_order, v.is_main
    FROM (VALUES
      ('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop', 'Replit workspace', 'Replit online IDE workspace', 1, true)
    ) AS v(image_url, caption, alt_text, sort_order, is_main)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_screenshots ts
      WHERE ts.tool_id = current_tool_id 
      AND ts.image_url = v.image_url
    );
  END IF;

  -- CodeT5 screenshots
  SELECT id INTO current_tool_id FROM tools WHERE slug = 'codet5';
  IF current_tool_id IS NOT NULL THEN
    INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main)
    SELECT current_tool_id, v.image_url, v.caption, v.alt_text, v.sort_order, v.is_main
    FROM (VALUES
      ('https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', 'CodeT5 model interface', 'CodeT5 code generation interface', 1, true)
    ) AS v(image_url, caption, alt_text, sort_order, is_main)
    WHERE NOT EXISTS (
      SELECT 1 FROM tool_screenshots ts
      WHERE ts.tool_id = current_tool_id 
      AND ts.image_url = v.image_url
    );
  END IF;
END $$;

-- Insert admin settings (only if they don't exist)
INSERT INTO admin_settings (key, value, description)
SELECT v.key, v.value, v.description
FROM (VALUES
  ('site_name', '"EZCode"', 'The name of the website'),
  ('site_description', '"Discover the best AI-powered coding tools for developers"', 'Site description for SEO'),
  ('featured_tools_limit', '8', 'Number of tools to show in featured section'),
  ('trending_algorithm', '{"views_weight": 0.4, "rating_weight": 0.3, "recency_weight": 0.3}', 'Algorithm weights for trending calculation'),
  ('submission_fee', '2.00', 'Fee for tool submission in USD'),
  ('max_comparison_tools', '3', 'Maximum number of tools that can be compared'),
  ('enable_user_submissions', 'true', 'Whether to allow user tool submissions'),
  ('enable_reviews', 'true', 'Whether to allow user reviews'),
  ('auto_approve_reviews', 'false', 'Whether to auto-approve user reviews')
) AS v(key, value, description)
WHERE NOT EXISTS (
  SELECT 1 FROM admin_settings ads WHERE ads.key = v.key
);