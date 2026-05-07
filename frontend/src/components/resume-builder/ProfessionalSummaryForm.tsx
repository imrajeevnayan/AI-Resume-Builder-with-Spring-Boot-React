import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Loader2, Save, Sparkles } from 'lucide-react'
import { professionalSummaryService } from '../../services/resumeService'
import { aiService } from '../../services/resumeService'

interface ProfessionalSummaryFormProps {
    resumeId: number
    resume: any
}

export default function ProfessionalSummaryForm({ resumeId }: ProfessionalSummaryFormProps) {
    const [summary, setSummary] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)

    const addSummaryMutation = useMutation({
        mutationFn: (summaryData: { summary: string }) =>
            professionalSummaryService.addProfessionalSummary(resumeId, summaryData),
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addSummaryMutation.mutate({ summary })
    }

    const handleAiGenerate = async () => {
        setIsGenerating(true)
        try {
            const response = await aiService.generateSummary('Software Engineer', 3, ['JavaScript', 'React', 'Node.js'])
            if (response.summary) {
                setSummary(response.summary)
            }
        } catch (error) {
            console.error('Failed to generate summary', error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Professional Summary</h3>
                </div>
                <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={isGenerating}
                    className="btn-secondary gap-2 text-sm"
                >
                    {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4" />
                    )}
                    AI Generate
                </button>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="form-label" htmlFor="summary">Summary</label>
                    <textarea
                        id="summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={8}
                        className="input"
                        placeholder="Write a brief summary highlighting your key skills and experience..."
                    />
                    <p className="text-sm text-gray-500 mt-2">
                        Describe your professional background, key skills, and career goals in 2-4 sentences.
                    </p>
                </div>

                <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-brand-900 mb-2">Tips for a great summary:</h4>
                    <ul className="text-sm text-brand-800 space-y-1 list-disc list-inside">
                        <li>Highlight your most relevant experience</li>
                        <li>Mention key achievements with measurable results</li>
                        <li>Include your most important skills and technologies</li>
                        <li>Keep it concise and impactful</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={addSummaryMutation.isPending}
                    className="btn-primary gap-2"
                >
                    {addSummaryMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Save Summary
                </button>
            </div>
        </form>
    )
}
