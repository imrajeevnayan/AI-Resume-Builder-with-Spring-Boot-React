import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Save, Eye, Loader2 } from 'lucide-react'
import { Resume, ResumeCreateRequest, TemplateType, ResumeStatus } from '../types'
import { resumeService } from '../services/resumeService'
import PersonalDetailsForm from '../components/resume-builder/PersonalDetailsForm'
import ProfessionalSummaryForm from '../components/resume-builder/ProfessionalSummaryForm'
import ExperienceForm from '../components/resume-builder/ExperienceForm'
import EducationForm from '../components/resume-builder/EducationForm'
import SkillsForm from '../components/resume-builder/SkillsForm'

const steps = [
    { id: 1, name: 'Personal Details', component: PersonalDetailsForm },
    { id: 2, name: 'Professional Summary', component: ProfessionalSummaryForm },
    { id: 3, name: 'Work Experience', component: ExperienceForm },
    { id: 4, name: 'Education', component: EducationForm },
    { id: 5, name: 'Skills & More', component: SkillsForm },
]

export default function ResumeBuilder() {
    const { id } = useParams<{ id?: string }>()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [currentStep, setCurrentStep] = useState(1)
    const [isSaving, setIsSaving] = useState(false)

    const { data: resume, isLoading } = useQuery<Resume>({
        queryKey: ['resume', id],
        queryFn: () => (id ? resumeService.getResumeById(Number(id)) : null as any),
        enabled: !!id,
    })

    const createResumeMutation = useMutation({
        mutationFn: (data: ResumeCreateRequest) => resumeService.createResume(data),
        onSuccess: (newResume) => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] })
            if (newResume.id) {
                navigate(`/builder/${newResume.id}`)
            }
        },
    })

    useEffect(() => {
        if (!id) {
            setInitialEmptyResume()
        }
    }, [id])

    const setInitialEmptyResume = () => {
        const emptyResume: Resume = {
            title: 'Untitled Resume',
            templateType: TemplateType.MODERN,
            status: ResumeStatus.DRAFT,
            isDraft: true,
            workExperiences: [],
            educations: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            socialLinks: [],
        }
        console.log('Initialized empty resume', emptyResume)
    }

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            if (id) {
                await resumeService.publishResume(Number(id))
                await queryClient.invalidateQueries({ queryKey: ['resume', id] })
            } else if (resume) {
                const newResume = await createResumeMutation.mutateAsync({
                    title: 'New Resume',
                    templateType: TemplateType.MODERN,
                })
                if (newResume.id) {
                    navigate(`/builder/${newResume.id}`)
                }
            }
        } catch (error) {
            console.error('Failed to save', error)
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            </div>
        )
    }

    const CurrentStepComponent = steps[currentStep - 1].component

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Resume Builder</h2>
                    <p className="text-gray-500 text-sm mt-1">Step {currentStep} of {steps.length}: {steps[currentStep - 1].name}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn-primary gap-2 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Save Resume
                    </button>
                    {id && (
                        <button
                            onClick={() => navigate(`/preview/${id}`)}
                            className="btn-secondary gap-2"
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step.id <= currentStep
                                    ? 'bg-brand-600 text-white'
                                    : 'bg-gray-200 text-gray-500'
                            }`}>
                                {step.id}
                            </div>
                            <span className={`hidden sm:block text-sm ${
                                step.id <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                            }`}>
                                {step.name}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-brand-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Form Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="card p-6">
                        <CurrentStepComponent resumeId={Number(id)} resume={resume} />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="btn-secondary gap-2 disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </button>
                <button
                    onClick={handleNext}
                    disabled={currentStep === steps.length}
                    className="btn-primary gap-2 disabled:opacity-50"
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
