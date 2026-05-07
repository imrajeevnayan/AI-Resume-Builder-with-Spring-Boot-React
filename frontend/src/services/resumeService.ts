import api from './api'
import {
    Resume,
    ResumeCreateRequest,
    ResumeUpdateRequest,
    PersonalDetails,
    ProfessionalSummary,
    WorkExperience,
    Education,
    Skill,
    Project,
    Certification,
    Language,
    SocialLink,
    TemplateType,
    ResumeStatus,
} from '../types'

// Resume CRUD
export const resumeService = {
    createResume: (data: ResumeCreateRequest) =>
        api.post<Resume>('/resumes', data).then(res => res.data),

    getAllResumes: () =>
        api.get<Resume[]>('/resumes').then(res => res.data),

    getResumeById: (id: number) =>
        api.get<Resume>(`/resumes/${id}`).then(res => res.data),

    updateResume: (id: number, data: ResumeUpdateRequest) =>
        api.put<Resume>(`/resumes/${id}`, data).then(res => res.data),

    deleteResume: (id: number) =>
        api.delete(`/resumes/${id}`).then(() => true),

    duplicateResume: (id: number) =>
        api.post<Resume>(`/resumes/${id}/duplicate`).then(res => res.data),

    changeTemplate: (id: number, template: TemplateType) =>
        api.put<Resume>(`/resumes/${id}/template?templateType=${template}`).then(res => res.data),

    publishResume: (id: number) =>
        api.put<Resume>(`/resumes/${id}/publish`).then(res => res.data),

    draftResume: (id: number) =>
        api.put<Resume>(`/resumes/${id}/draft`).then(res => res.data),

    searchResumes: (query: string) =>
        api.get<Resume[]>(`/resumes/search?query=${query}`).then(res => res.data),

    getByTemplate: (template: TemplateType) =>
        api.get<Resume[]>(`/resumes/template/${template}`).then(res => res.data),

    getByStatus: (status: ResumeStatus) =>
        api.get<Resume[]>(`/resumes/status/${status}`).then(res => res.data),
}

// Personal Details
export const personalDetailsService = {
    addPersonalDetails: (resumeId: number, data: PersonalDetails) =>
        api.post(`/sections/resumes/${resumeId}/personal-details`, data).then(res => res.data),

    updatePersonalDetails: (id: number, data: Partial<PersonalDetails>) =>
        api.put(`/sections/personal-details/${id}`, data).then(res => res.data),
}

// Professional Summary
export const professionalSummaryService = {
    addProfessionalSummary: (resumeId: number, data: ProfessionalSummary) =>
        api.post(`/sections/resumes/${resumeId}/professional-summary`, data).then(res => res.data),

    updateProfessionalSummary: (id: number, data: Partial<ProfessionalSummary>) =>
        api.put(`/sections/professional-summary/${id}`, data).then(res => res.data),
}

// Work Experience
export const workExperienceService = {
    addWorkExperience: (resumeId: number, data: WorkExperience) =>
        api.post(`/sections/resumes/${resumeId}/work-experiences`, data).then(res => res.data),

    updateWorkExperience: (id: number, data: Partial<WorkExperience>) =>
        api.put(`/sections/work-experiences/${id}`, data).then(res => res.data),

    deleteWorkExperience: (id: number) =>
        api.delete(`/sections/work-experiences/${id}`).then(() => true),
}

// Education
export const educationService = {
    addEducation: (resumeId: number, data: Education) =>
        api.post(`/sections/resumes/${resumeId}/educations`, data).then(res => res.data),

    updateEducation: (id: number, data: Partial<Education>) =>
        api.put(`/sections/educations/${id}`, data).then(res => res.data),

    deleteEducation: (id: number) =>
        api.delete(`/sections/educations/${id}`).then(() => true),
}

// Skills
export const skillService = {
    addSkill: (resumeId: number, data: Skill) =>
        api.post(`/sections/resumes/${resumeId}/skills`, data).then(res => res.data),

    updateSkill: (id: number, data: Partial<Skill>) =>
        api.put(`/sections/skills/${id}`, data).then(res => res.data),

    deleteSkill: (id: number) =>
        api.delete(`/sections/skills/${id}`).then(() => true),
}

// Projects
export const projectService = {
    addProject: (resumeId: number, data: Project) =>
        api.post(`/sections/resumes/${resumeId}/projects`, data).then(res => res.data),

    updateProject: (id: number, data: Partial<Project>) =>
        api.put(`/sections/projects/${id}`, data).then(res => res.data),

    deleteProject: (id: number) =>
        api.delete(`/sections/projects/${id}`).then(() => true),
}

// Certifications
export const certificationService = {
    addCertification: (resumeId: number, data: Certification) =>
        api.post(`/sections/resumes/${resumeId}/certifications`, data).then(res => res.data),

    updateCertification: (id: number, data: Partial<Certification>) =>
        api.put(`/sections/certifications/${id}`, data).then(res => res.data),

    deleteCertification: (id: number) =>
        api.delete(`/sections/certifications/${id}`).then(() => true),
}

// Languages
export const languageService = {
    addLanguage: (resumeId: number, data: Language) =>
        api.post(`/sections/resumes/${resumeId}/languages`, data).then(res => res.data),

    updateLanguage: (id: number, data: Partial<Language>) =>
        api.put(`/sections/languages/${id}`, data).then(res => res.data),

    deleteLanguage: (id: number) =>
        api.delete(`/sections/languages/${id}`).then(() => true),
}

// Social Links
export const socialLinkService = {
    addSocialLink: (resumeId: number, data: SocialLink) =>
        api.post(`/sections/resumes/${resumeId}/social-links`, data).then(res => res.data),

    updateSocialLink: (id: number, data: Partial<SocialLink>) =>
        api.put(`/sections/social-links/${id}`, data).then(res => res.data),

    deleteSocialLink: (id: number) =>
        api.delete(`/sections/social-links/${id}`).then(() => true),
}

// AI Assistant
export const aiService = {
    generateSummary: (role: string, years: number, skills: string[]) =>
        api.post('/ai/generate-summary', { role, yearsOfExperience: years, skills }).then(res => res.data),

    enhanceBullets: (bullets: string[]) =>
        api.post('/ai/enhance-bullets', { bulletPoints: bullets }).then(res => res.data),

    suggestSkills: (role: string, currentSkills: string[]) =>
        api.post('/ai/suggest-skills', { role, currentSkills }).then(res => res.data),

    optimizeAts: (content: string) =>
        api.post('/ai/optimize-ats', { content }).then(res => res.data),

    suggestKeywords: (jobDescription: string) =>
        api.post('/ai/keyword-recommendations', { jobDescription }).then(res => res.data),

    getRoleSkills: (role: string, level: string) =>
        api.post('/ai/role-specific-skills', { role, level }).then(res => res.data),
}

// Export
export const exportService = {
    exportToPdf: (resumeId: number) =>
        api.get(`/resumes/${resumeId}/export/pdf`, { responseType: 'blob' }).then(res => res.data),

    exportToJson: (resumeId: number) =>
        api.get<Resume>(`/resumes/${resumeId}/export/json`).then(res => res.data),

    getPrintData: (resumeId: number) =>
        api.get(`/resumes/${resumeId}/export/print`).then(res => res.data),
}
