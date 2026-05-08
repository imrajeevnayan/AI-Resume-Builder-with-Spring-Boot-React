// Enums
export enum TemplateType {
    MODERN = 'MODERN',
    MINIMAL = 'MINIMAL',
    CORPORATE = 'CORPORATE',
    CREATIVE = 'CREATIVE',
    OVERLEAF = 'OVERLEAF',
}

export enum ResumeStatus {
    DRAFT = 'DRAFT',
    READY = 'READY',
    ARCHIVED = 'ARCHIVED',
}

export enum ProficiencyLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
    EXPERT = 'EXPERT',
    NATIVE = 'NATIVE',
}

// Interfaces
export interface PersonalDetails {
    id?: number;
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    website?: string;
    linkedIn?: string;
    github?: string;
    photoUrl?: string;
    jobTitle: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface ProfessionalSummary {
    id?: number;
    summary: string;
}

export interface WorkExperience {
    id?: number;
    company: string;
    position: string;
    summary?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    location?: string;
    displayOrder?: number;
}

export interface Education {
    id?: number;
    institution: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    location?: string;
    description?: string;
    displayOrder?: number;
}

export interface Skill {
    id?: number;
    name: string;
    proficiency?: ProficiencyLevel;
    category: string;
    displayOrder?: number;
}

export interface Project {
    id?: number;
    name: string;
    description?: string;
    technologies?: string;
    link?: string;
    startDate?: string;
    endDate?: string;
    displayOrder?: number;
}

export interface Certification {
    id?: number;
    name: string;
    issuer?: string;
    issueDate?: string;
    expiryDate?: string;
    url?: string;
    displayOrder?: number;
}

export interface Language {
    id?: number;
    name: string;
    proficiency?: ProficiencyLevel;
    displayOrder?: number;
}

export interface SocialLink {
    id?: number;
    platform: string;
    url: string;
    displayOrder?: number;
}

export interface Resume {
    id?: number;
    title: string;
    templateType: TemplateType;
    status: ResumeStatus;
    isDraft: boolean;
    createdAt?: string;
    updatedAt?: string;
    personalDetails?: PersonalDetails;
    professionalSummary?: ProfessionalSummary;
    workExperiences: WorkExperience[];
    educations: Education[];
    skills: Skill[];
    projects: Project[];
    certifications: Certification[];
    languages: Language[];
    socialLinks: SocialLink[];
}

export interface ResumeCreateRequest {
    title: string;
    templateType: TemplateType;
}

export interface ResumeUpdateRequest {
    title: string;
    templateType?: TemplateType;
}

export type ApiError = {
    message: string;
    status: number;
    path: string;
}
