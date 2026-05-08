import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Sparkles, Loader2, TrendingUp } from 'lucide-react'
import { aiService } from '../services/resumeService'

export default function AIAssistant() {
    const [role, setRole] = useState('')
    const [years, setYears] = useState(3)
    const [content, setContent] = useState('')
    const [activeTab, setActiveTab] = useState('summary')

    const generateSummaryMutation = useMutation({
        mutationFn: () => aiService.generateSummary(role, years, []),
    })

    const atsMutation = useMutation({
        mutationFn: () => aiService.optimizeAts(content),
    })

    const handleGenerate = () => {
        if (activeTab === 'summary') generateSummaryMutation.mutate()
        if (activeTab === 'ats') atsMutation.mutate()
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-brand-600" />
                <h2 className="text-2xl font-bold text-gray-900">AI Assistant</h2>
            </div>

            <div className="card p-6">
                <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-4">
                    {['summary', 'ats', 'skills', 'keywords'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setContent('') }}
                            className={`pb-2 px-1 text-sm font-medium ${activeTab === tab
                                ? 'border-b-2 border-brand-600 text-brand-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab === 'summary' && 'Generate Summary'}
                            {tab === 'ats' && 'ATS Optimization'}
                            {tab === 'skills' && 'Skill Suggestions'}
                            {tab === 'keywords' && 'Keywords'}
                        </button>
                    ))}
                </div>

                {activeTab === 'summary' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Job Role</label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="input"
                                    placeholder="e.g., Software Engineer"
                                />
                            </div>
                            <div>
                                <label className="form-label">Years of Experience</label>
                                <input
                                    type="number"
                                    value={years}
                                    onChange={(e) => setYears(Number(e.target.value))}
                                    className="input"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={generateSummaryMutation.isPending}
                            className="btn-primary gap-2"
                        >
                            {generateSummaryMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="h-4 w-4" />
                            )}
                            Generate Summary
                        </button>
                        {generateSummaryMutation.data && (
                            <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 mt-4">
                                <h4 className="text-sm font-medium text-brand-900 mb-2">Generated Summary</h4>
                                <p className="text-brand-800 text-sm">{generateSummaryMutation.data.summary}</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'ats' && (
                    <div className="space-y-4">
                        <div>
                            <label className="form-label">Resume Content</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="input"
                                placeholder="Paste your resume content here..."
                            />
                        </div>
                        <button
                            onClick={handleGenerate}
                            disabled={atsMutation.isPending}
                            className="btn-primary gap-2"
                        >
                            {atsMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <TrendingUp className="h-4 w-4" />
                            )}
                            Optimize for ATS
                        </button>
                        {atsMutation.data && (
                            <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 mt-4">
                                <h4 className="text-sm font-medium text-brand-900 mb-2">ATS Score: {atsMutation.data.score}</h4>
                                <p className="text-sm text-brand-700">Missing keywords:</p>
                                <ul className="list-disc list-inside text-sm text-brand-700 mt-1">
                                    {atsMutation.data.missingKeywords?.map((keyword: string, i: number) => (
                                        <li key={i}>{keyword}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
