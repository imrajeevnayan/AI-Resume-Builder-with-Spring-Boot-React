-- V2__Seed_Data.sql
-- Seed data for testing and demo purposes

INSERT INTO resume (title, template_type, status, created_at, updated_at, is_draft)
VALUES 
    ('Software Engineer Resume', 'MODERN', 'READY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE),
    ('Full Stack Developer', 'MINIMAL', 'DRAFT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE),
    ('Data Scientist CV', 'CORPORATE', 'READY', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, FALSE);

-- Personal details for Software Engineer Resume
INSERT INTO personal_details (resume_id, full_name, email, phone, address, website, linked_in, github, job_title, city, state, country)
VALUES (
    1, 
    'Alex Johnson', 
    'alex.johnson@example.com', 
    '+1 (555) 123-4567', 
    '123 Developer Lane, Tech Park', 
    'https://alexj.dev', 
    'https://linkedin.com/in/alexjohnson', 
    'https://github.com/alex-johnson',
    'Senior Software Engineer',
    'San Francisco',
    'California',
    'USA'
);

-- Summary for Software Engineer Resume
INSERT INTO professional_summary (resume_id, summary)
VALUES (
    1,
    'Passionate software engineer with 5+ years of experience building scalable web applications. Expert in Java, Python, and cloud technologies. Strong background in microservices architecture and Agile development.'
);

-- Work experiences for Software Engineer Resume
INSERT INTO work_experience (resume_id, company, position, summary, start_date, end_date, is_current, location, display_order)
VALUES 
    (1, 'TechCorp Inc.', 'Senior Software Engineer', 'Leading team of 5 engineers developing cloud-native applications', '2021-03-01', NULL, TRUE, 'San Francisco, CA', 1),
    (1, 'StartupXYZ', 'Software Engineer', 'Built and maintained core platform features', '2018-06-01', '2021-02-28', FALSE, 'Palo Alto, CA', 2),
    (1, 'DevStudio', 'Junior Developer', 'Developed and maintained client websites and applications', '2016-08-01', '2018-05-30', FALSE, 'Austin, TX', 3);

-- Skills for Software Engineer Resume
INSERT INTO skill (resume_id, name, proficiency, category, display_order)
VALUES 
    (1, 'Java', 'Expert', 'Programming', 1),
    (1, 'Python', 'Advanced', 'Programming', 2),
    (1, 'JavaScript', 'Advanced', 'Programming', 3),
    (1, 'React', 'Advanced', 'Frontend', 4),
    (1, 'Spring Boot', 'Expert', 'Backend', 5),
    (1, 'Docker', 'Advanced', 'DevOps', 6),
    (1, 'Kubernetes', 'Intermediate', 'DevOps', 7),
    (1, 'AWS', 'Advanced', 'Cloud', 8),
    (1, 'PostgreSQL', 'Advanced', 'Database', 9),
    (1, 'MongoDB', 'Intermediate', 'Database', 10);

-- Certifications for Software Engineer Resume
INSERT INTO certification (resume_id, name, issuer, issue_date, display_order)
VALUES 
    (1, 'AWS Solutions Architect', 'Amazon Web Services', '2022-05-15', 1),
    (1, 'Oracle Certified Professional', 'Oracle', '2021-11-20', 2);

-- Languages for Software Engineer Resume
INSERT INTO language (resume_id, name, proficiency, display_order)
VALUES 
    (1, 'English', 'Native', 1),
    (1, 'Spanish', 'Intermediate', 2);

-- Social links for Software Engineer Resume
INSERT INTO social_link (resume_id, platform, url, display_order)
VALUES 
    (1, 'GitHub', 'https://github.com/alex-johnson', 1),
    (1, 'LinkedIn', 'https://linkedin.com/in/alexjohnson', 2),
    (1, 'Website', 'https://alexj.dev', 3);

-- Personal details for Full Stack Developer (Draft)
INSERT INTO personal_details (resume_id, full_name, email, phone, job_title, city, country)
VALUES (
    2,
    'Sarah Smith',
    'sarah.smith@example.com',
    '+1 (555) 987-6543',
    'Full Stack Developer',
    'New York',
    'USA'
);

-- Summary for Full Stack Developer
INSERT INTO professional_summary (resume_id, summary)
VALUES (
    2,
    'Full stack developer specializing in modern JavaScript frameworks and Node.js backend development.'
);

-- Work experience for Full Stack Developer
INSERT INTO work_experience (resume_id, company, position, start_date, end_date, is_current, display_order)
VALUES 
    (2, 'WebSolutions', 'Full Stack Developer', '2020-01-01', NULL, TRUE, 1);

-- Skills for Full Stack Developer
INSERT INTO skill (resume_id, name, proficiency, category, display_order)
VALUES 
    (2, 'React', 'Expert', 'Frontend', 1),
    (2, 'Node.js', 'Advanced', 'Backend', 2),
    (2, 'TypeScript', 'Advanced', 'Frontend', 3),
    (2, 'MongoDB', 'Advanced', 'Database', 4),
    (2, 'Express.js', 'Advanced', 'Backend', 5);

-- Personal details for Data Scientist
INSERT INTO personal_details (resume_id, full_name, email, phone, job_title, city, country)
VALUES (
    3,
    'Michael Chen',
    'michael.chen@example.com',
    '+1 (555) 456-7890',
    'Data Scientist',
    'Seattle',
    'USA'
);

-- Summary for Data Scientist
INSERT INTO professional_summary (resume_id, summary)
VALUES (
    3,
    'Data scientist with expertise in machine learning, statistical modeling, and data visualization. Experienced in Python, R, and SQL for extracting actionable insights from complex datasets.'
);

-- Work experience for Data Scientist
INSERT INTO work_experience (resume_id, company, position, summary, start_date, end_date, is_current, display_order)
VALUES 
    (3, 'DataFutures', 'Data Scientist', 'Building predictive models for customer behavior analysis', '2020-06-01', NULL, TRUE, 1),
    (3, 'Analytics Pro', 'Data Analyst', 'Analyzed large datasets to identify business trends', '2018-01-01', '2020-05-30', FALSE, 2);

-- Skills for Data Scientist
INSERT INTO skill (resume_id, name, proficiency, category, display_order)
VALUES 
    (3, 'Python', 'Expert', 'Programming', 1),
    (3, 'R', 'Advanced', 'Programming', 2),
    (3, 'Machine Learning', 'Expert', 'Data Science', 3),
    (3, 'SQL', 'Expert', 'Database', 4),
    (3, 'TensorFlow', 'Advanced', 'Data Science', 5),
    (3, 'Tableau', 'Intermediate', 'Visualization', 6);
