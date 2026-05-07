-- V1__Initial_Schema.sql
-- Initial database schema for AI Resume Builder

CREATE TABLE IF NOT EXISTS resume (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    template_type VARCHAR(50) DEFAULT 'MODERN',
    status VARCHAR(50) DEFAULT 'DRAFT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_draft BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS personal_details (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    website VARCHAR(255),
    linked_in VARCHAR(255),
    github VARCHAR(255),
    photo_url TEXT,
    job_title VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS professional_summary (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL UNIQUE,
    summary TEXT,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS work_experience (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    summary TEXT,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    location VARCHAR(255),
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS bullet_point (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT NOT NULL,
    parent_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS education (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255),
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    gpa VARCHAR(10),
    location VARCHAR(255),
    description TEXT,
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS skill (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    proficiency VARCHAR(50),
    category VARCHAR(100) DEFAULT 'General',
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    technologies TEXT,
    link VARCHAR(255),
    start_date DATE,
    end_date DATE,
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS certification (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    issue_date DATE,
    expiry_date DATE,
    url VARCHAR(512),
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS language (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(50),
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS social_link (
    id BIGSERIAL PRIMARY KEY,
    resume_id BIGINT NOT NULL,
    platform VARCHAR(100) NOT NULL,
    url VARCHAR(512) NOT NULL,
    display_order INT DEFAULT 0,
    FOREIGN KEY (resume_id) REFERENCES resume(id) ON DELETE CASCADE
);
