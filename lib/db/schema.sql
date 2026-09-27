-- StackWorks Neon PostgreSQL Production Schema

CREATE TABLE IF NOT EXISTS project_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(160),
  project_type VARCHAR(80) NOT NULL,
  budget_range VARCHAR(80) NOT NULL,
  timeline VARCHAR(80) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(120) PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(80) NOT NULL,
  summary TEXT NOT NULL,
  problem TEXT NOT NULL,
  approach TEXT NOT NULL,
  solution TEXT NOT NULL,
  architecture JSONB NOT NULL DEFAULT '[]'::jsonb,
  technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
  outcome TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  is_confidential BOOLEAN DEFAULT false,
  confidentiality_note TEXT,
  status VARCHAR(20) DEFAULT 'published',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(120) PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(160) NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  capabilities JSONB NOT NULL DEFAULT '[]'::jsonb,
  tech_highlight JSONB NOT NULL DEFAULT '[]'::jsonb,
  icon VARCHAR(50) DEFAULT 'LayoutGrid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(80) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON project_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
