import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Wrench, Loader2, Sparkles } from 'lucide-react'
import { Skill, ProficiencyLevel } from '../../types'
import { aiService } from '../../services/resumeService'

interface SkillsFormProps {
    resumeId: number
    resume: any
}

export default function SkillsForm({ resumeId: _resumeId }: SkillsFormProps) {
    const [skills, setSkills] = useState<Skill[]>([])
    const [isSuggesting, setIsSuggesting] = useState(false)

    const addSkill = () => {
        const newSkill: Skill = {
            name: '',
            category: 'General',
            proficiency: ProficiencyLevel.BEGINNER,
        }
        setSkills([...skills, newSkill])
    }

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index))
    }

    const handleChange = (index: number, field: string, value: any) => {
        const updated = [...skills]
        updated[index] = { ...updated[index], [field]: value }
        setSkills(updated)
    }

    const handleAiSuggest = async () => {
        setIsSuggesting(true)
        try {
            const response = await aiService.getRoleSkills('Software Engineer', 'Mid-level')
            if (response.skills && response.skills.length > 0) {
                const suggestedSkills: Skill[] = response.skills.map((s: string) => ({
                    name: s,
                    category: 'AI Suggestion',
                    proficiency: ProficiencyLevel.INTERMEDIATE,
                }))
                setSkills([...skills, ...suggestedSkills])
            }
        } catch (error) {
            console.error('Failed to get suggestions', error)
        } finally {
            setIsSuggesting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-brand-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={handleAiSuggest}
                        disabled={isSuggesting}
                        className="btn-secondary gap-2 text-sm"
                    >
                        {isSuggesting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        AI Suggest
                    </button>
                    <button
                        type="button"
                        onClick={addSkill}
                        className="btn-secondary gap-2 text-sm"
                    >
                        <Plus className="h-4 w-4" />
                        Add Skill
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="card p-4"
                    >
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h4 className="font-medium text-gray-900">Skill {index + 1}</h4>
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-1">
                                    <label className="form-label" htmlFor={`skill-name-${index}`}>Skill Name</label>
                                    <input
                                        id={`skill-name-${index}`}
                                        type="text"
                                        value={skill.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="input"
                                        placeholder="JavaScript"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor={`skill-category-${index}`}>Category</label>
                                    <input
                                        id={`skill-category-${index}`}
                                        type="text"
                                        value={skill.category}
                                        onChange={(e) => handleChange(index, 'category', e.target.value)}
                                        className="input"
                                        placeholder="Programming"
                                    />
                                </div>
                                <div>
                                    <label className="form-label" htmlFor={`skill-proficiency-${index}`}>Proficiency</label>
                                    <select
                                        id={`skill-proficiency-${index}`}
                                        value={skill.proficiency}
                                        onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                                        className="input"
                                    >
                                        {Object.keys(ProficiencyLevel).map(level => (
                                            <option key={level} value={level}>{level.charAt(0) + level.slice(1).toLowerCase()}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {skills.length === 0 && (
                <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">No skills added yet</p>
                </div>
            )}
        </div>
    )
}
