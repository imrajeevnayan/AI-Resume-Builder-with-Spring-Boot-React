import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, GraduationCap, Loader2 } from 'lucide-react'
import { Education } from '../../types'
import { educationService } from '../../services/resumeService'

interface EducationFormProps {
    resumeId: number
    resume: any
}

export default function EducationForm({ resumeId }: EducationFormProps) {
    const [educations, setEducations] = useState<Education[]>([])

    const addEducationMutation = useMutation({
        mutationFn: (data: Education) => educationService.addEducation(resumeId, data),
    })

    const addEducation = () => {
        const newEducation: Education = {
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            gpa: '',
            location: '',
            description: '',
        }
        setEducations([...educations, newEducation])
    }

    const removeEducation = (index: number) => {
        setEducations(educations.filter((_, i) => i !== index))
    }

    const handleChange = (index: number, field: string, value: any) => {
        const updated = [...educations]
        updated[index] = { ...updated[index], [field]: value }
        setEducations(updated)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-brand-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                </div>
                <button
                    type="button"
                    onClick={addEducation}
                    className="btn-secondary gap-2 text-sm"
                >
                    <Plus className="h-4 w-4" />
                    Add Education
                </button>
            </div>

            <AnimatePresence>
                {educations.map((education, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="card p-4"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label" htmlFor={`institution-${index}`}>Institution</label>
                                    <input
                                        id={`institution-${index}`}
                                        type="text"
                                        value={education.institution}
                                        onChange={(e) => handleChange(index, 'institution', e.target.value)}
                                        className="input"
                                        placeholder="University Name"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor={`degree-${index}`}>Degree</label>
                                    <input
                                        id={`degree-${index}`}
                                        type="text"
                                        value={education.degree}
                                        onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                        className="input"
                                        placeholder="Bachelor of Science"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {educations.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No education added yet</p>
                </div>
            )}
        </div>
    )
}
