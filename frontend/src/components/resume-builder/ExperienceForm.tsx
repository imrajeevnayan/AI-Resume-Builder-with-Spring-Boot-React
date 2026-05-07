import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Save, Briefcase, Loader2, Sparkles } from 'lucide-react'
import { WorkExperience } from '../../types'
import { workExperienceService } from '../../services/resumeService'

interface ExperienceFormProps {
    resumeId: number
    resume: any
}

export default function ExperienceForm({ resumeId }: ExperienceFormProps) {
    const [experiences, setExperiences] = useState<WorkExperience[]>([])

    const addExperienceMutation = useMutation({
        mutationFn: (data: WorkExperience) => workExperienceService.addWorkExperience(resumeId, data),
    })

    const addExperience = () => {
        const newExperience: WorkExperience = {
            company: '',
            position: '',
            summary: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            location: '',
        }
        setExperiences([...experiences, newExperience])
    }

    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index))
    }

    const handleChange = (index: number, field: string, value: any) => {
        const updated = [...experiences]
        updated[index] = { ...updated[index], [field]: value }
        setExperiences(updated)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-brand-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                </div>
                <button
                    type="button"
                    onClick={addExperience}
                    className="btn-secondary gap-2 text-sm"
                >
                    <Plus className="h-4 w-4" />
                    Add Experience
                </button>
            </div>

            <AnimatePresence>
                {experiences.map((experience, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="card p-4"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-900">Position {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => removeExperience(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label" htmlFor={`company-${index}`}>Company</label>
                                    <input
                                        id={`company-${index}`}
                                        type="text"
                                        value={experience.company}
                                        onChange={(e) => handleChange(index, 'company', e.target.value)}
                                        className="input"
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor={`position-${index}`}>Position</label>
                                    <input
                                        id={`position-${index}`}
                                        type="text"
                                        value={experience.position}
                                        onChange={(e) => handleChange(index, 'position', e.target.value)}
                                        className="input"
                                        placeholder="Job Title"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="form-label" htmlFor={`summary-${index}`}>Summary</label>
                                <textarea
                                    id={`summary-${index}`}
                                    value={experience.summary}
                                    onChange={(e) => handleChange(index, 'summary', e.target.value)}
                                    rows={3}
                                    className="input"
                                    placeholder="Describe your role and achievements..."
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {experiences.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No work experience added yet</p>
                </div>
            )}
        </div>
    )
}
