/*
  # Seed Initial Data for EZCode

  1. Categories
  2. Sample Tools
  3. Admin Settings
*/

-- Insert categories
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
('AI Assistant', 'ai-assistant', 'AI-powered coding assistants and completion tools', 'Bot', '#3B82F6', 1),
('Code Editor', 'code-editor', 'Advanced code editors and IDEs', 'Code', '#8B5CF6', 2),
('Browser IDE', 'browser-ide', 'Web-based development environments', 'Globe', '#10B981', 3),
('Debugging Tools', 'debugging-tools', 'Tools for debugging and code analysis', 'Bug', '#F59E0B', 4),
('Code Generators', 'code-generators', 'AI-powered code generation tools', 'Zap', '#EF4444', 5),
('DevOps', 'devops', 'Development operations and deployment tools', 'Settings', '#6366F1', 6),
('Testing Tools', 'testing-tools', 'Automated testing and QA tools', 'TestTube', '#EC4899', 7),
('Documentation', 'documentation', 'Documentation generation and management', 'FileText', '#14B8A6', 8);

-- Insert sample tools
INSERT INTO tools (
  title, slug, tagline, description, thumbnail_url, website_url, github_url,
  category_id, pricing_model, starting_price, has_free_trial,
  programming_languages, supported_platforms, integrations,
  is_featured, is_trending, is_new, is_verified, is_active
) VALUES
(
  'GitHub Copilot',
  'github-copilot',
  'Your AI pair programmer',
  'GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor. Trained on billions of lines of code, it turns natural language prompts into coding suggestions across dozens of languages.',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
  'https://github.com/features/copilot',
  'https://github.com/github/copilot',
  (SELECT id FROM categories WHERE slug = 'ai-assistant'),
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
),
(
  'Cursor IDE',
  'cursor-ide',
  'AI-first code editor',
  'Cursor is the IDE of the future, built for pair-programming with AI. Built to make you extraordinarily productive, Cursor is the best way to code with AI.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  'https://cursor.sh',
  null,
  (SELECT id FROM categories WHERE slug = 'code-editor'),
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
),
(
  'Tabnine',
  'tabnine',
  'AI code completion tool',
  'Tabnine is an AI assistant that speeds up delivery and keeps your code safe. It provides intelligent code completions based on context and syntax.',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
  'https://tabnine.com',
  null,
  (SELECT id FROM categories WHERE slug = 'ai-assistant'),
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
),
(
  'Replit',
  'replit',
  'Browser-based IDE',
  'Replit is a simple yet powerful online IDE, Editor, Compiler, Interpreter, and REPL. Code, compile, run, and host in 50+ programming languages.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
  'https://replit.com',
  null,
  (SELECT id FROM categories WHERE slug = 'browser-ide'),
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
),
(
  'CodeT5',
  'codet5',
  'AI code generation model',
  'CodeT5 is a pre-trained encoder-decoder Transformer model for code understanding and generation. It can perform various code-related tasks.',
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
  'https://huggingface.co/Salesforce/codet5-base',
  'https://github.com/salesforce/CodeT5',
  (SELECT id FROM categories WHERE slug = 'code-generators'),
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

-- Insert tool features
INSERT INTO tool_features (tool_id, feature_name, feature_description, category) VALUES
-- GitHub Copilot features
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'Code Completion', 'AI-powered code suggestions and completions', 'core'),
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'Multi-language Support', 'Supports dozens of programming languages', 'languages'),
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'Context Awareness', 'Understands code context for better suggestions', 'ai'),
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'Function Generation', 'Generates entire functions from comments', 'ai'),
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'IDE Integration', 'Seamless integration with popular IDEs', 'integration'),

-- Cursor IDE features
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'AI Chat', 'Built-in AI chat for code assistance', 'ai'),
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'Code Generation', 'Generate code from natural language', 'ai'),
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'Refactoring', 'AI-powered code refactoring', 'ai'),
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'Debugging', 'Advanced debugging capabilities', 'debugging'),
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'Version Control', 'Built-in Git integration', 'collaboration'),

-- Tabnine features
((SELECT id FROM tools WHERE slug = 'tabnine'), 'Code Completion', 'AI code completion and suggestions', 'core'),
((SELECT id FROM tools WHERE slug = 'tabnine'), 'Team Learning', 'Learns from your team\'s code patterns', 'ai'),
((SELECT id FROM tools WHERE slug = 'tabnine'), 'Privacy First', 'Code never leaves your environment', 'security'),
((SELECT id FROM tools WHERE slug = 'tabnine'), 'Multi-IDE Support', 'Works with multiple IDEs and editors', 'integration'),

-- Replit features
((SELECT id FROM tools WHERE slug = 'replit'), 'Browser IDE', 'Full IDE experience in the browser', 'core'),
((SELECT id FROM tools WHERE slug = 'replit'), 'Real-time Collaboration', 'Collaborate with others in real-time', 'collaboration'),
((SELECT id FROM tools WHERE slug = 'replit'), 'Instant Deployment', 'Deploy your projects instantly', 'deployment'),
((SELECT id FROM tools WHERE slug = 'replit'), 'Package Management', 'Built-in package management', 'core'),

-- CodeT5 features
((SELECT id FROM tools WHERE slug = 'codet5'), 'Code Generation', 'Generate code from natural language', 'ai'),
((SELECT id FROM tools WHERE slug = 'codet5'), 'Code Summarization', 'Summarize code functionality', 'ai'),
((SELECT id FROM tools WHERE slug = 'codet5'), 'Code Translation', 'Translate between programming languages', 'ai'),
((SELECT id FROM tools WHERE slug = 'codet5'), 'Bug Detection', 'Identify potential bugs in code', 'debugging');

-- Insert tool screenshots
INSERT INTO tool_screenshots (tool_id, image_url, caption, alt_text, sort_order, is_main) VALUES
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop', 'GitHub Copilot in action', 'GitHub Copilot suggesting code in VS Code', 1, true),
((SELECT id FROM tools WHERE slug = 'github-copilot'), 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop', 'Code completion example', 'Example of AI code completion', 2, false),

((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 'Cursor IDE interface', 'Main interface of Cursor IDE', 1, true),
((SELECT id FROM tools WHERE slug = 'cursor-ide'), 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop', 'AI chat feature', 'AI chat assistant in Cursor', 2, false),

((SELECT id FROM tools WHERE slug = 'tabnine'), 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop', 'Tabnine suggestions', 'Tabnine providing code suggestions', 1, true),

((SELECT id FROM tools WHERE slug = 'replit'), 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop', 'Replit workspace', 'Replit online IDE workspace', 1, true),

((SELECT id FROM tools WHERE slug = 'codet5'), 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', 'CodeT5 model interface', 'CodeT5 code generation interface', 1, true);

-- Insert sample reviews (you'll need to create user profiles first)
-- This will be handled when users actually sign up and create reviews

-- Insert admin settings
INSERT INTO admin_settings (key, value, description) VALUES
('site_name', '"EZCode"', 'The name of the website'),
('site_description', '"Discover the best AI-powered coding tools for developers"', 'Site description for SEO'),
('featured_tools_limit', '8', 'Number of tools to show in featured section'),
('trending_algorithm', '{"views_weight": 0.4, "rating_weight": 0.3, "recency_weight": 0.3}', 'Algorithm weights for trending calculation'),
('submission_fee', '2.00', 'Fee for tool submission in USD'),
('max_comparison_tools', '3', 'Maximum number of tools that can be compared'),
('enable_user_submissions', 'true', 'Whether to allow user tool submissions'),
('enable_reviews', 'true', 'Whether to allow user reviews'),
('auto_approve_reviews', 'false', 'Whether to auto-approve user reviews');