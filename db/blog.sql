CREATE TYPE comment_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE ai_recommendation AS ENUM ('approve', 'reject', 'flagged', 'pending');

CREATE TABLE admins (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE refresh_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    token TEXT UNIQUE NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens (token);
CREATE INDEX idx_refresh_tokens_admin_id ON refresh_tokens (admin_id);

CREATE TABLE blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT NOT NULL,             
    additional_images TEXT[] DEFAULT '{}', 
    is_published BOOLEAN DEFAULT FALSE,
    view_count INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_blogs_title ON blogs (title);
CREATE INDEX idx_blogs_is_published ON blogs (is_published);
CREATE INDEX idx_blogs_published_at ON blogs (published_at DESC);

CREATE TABLE comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blog_id UUID NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    sender_name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status comment_status DEFAULT 'pending', 
    ai_suggestion ai_recommendation DEFAULT 'pending',
    ai_reason TEXT,                              
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_comments_blog_id_status ON comments (blog_id, status);
CREATE INDEX idx_comments_ai_suggestion ON comments (ai_suggestion);
