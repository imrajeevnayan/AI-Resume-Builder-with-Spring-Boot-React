-- V3__Fix_BulletPoint_Relation.sql
-- Add work_experience_id to support JPA mappedBy relation

ALTER TABLE bullet_point ADD COLUMN IF NOT EXISTS work_experience_id BIGINT;

-- Add foreign key constraint if it doesn't exist
ALTER TABLE bullet_point ADD CONSTRAINT IF NOT EXISTS fk_bullet_point_work_experience FOREIGN KEY (work_experience_id) REFERENCES work_experience(id) ON DELETE CASCADE;