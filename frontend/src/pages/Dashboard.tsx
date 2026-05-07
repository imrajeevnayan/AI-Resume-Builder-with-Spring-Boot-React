import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, FileText, Clock, CheckCircle, Trash2, Copy, MoreHorizontal } from 'lucide-react'
import { Resume } from '../types'
import { resumeService } from '../services/resumeService'

export default function Dashboard() {
    const navigate = useNavigate()

    const { data: resumes, isLoading, isError } = useQuery<Resume[]>({
        queryKey: ['resumes'],
        queryFn: resumeService.getAllResumes,
    })

    const handleCreateNew = async () => {
        const newResume = await resumeService.createResume({
            title: 'Untitled Resume',
            templateType: 'MODERN' as const,
        })
        if (newResume.id) {
            navigate(`/builder/${newResume.id}`)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and create professional resumes</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="btn-primary gap-2"
                >
                    <Plus className="h-4 w-4" />
                    Create New Resume
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard title="Total Resumes" value={resumes?.length || 0} icon={FileText} />
                <StatCard title="Drafts" value={resumes?.filter(r => r.isDraft).length || 0} icon={Clock} color="yellow" />
                <StatCard title="Published" value={resumes?.filter(r => !r.isDraft).length || 0} icon={CheckCircle} color="green" />
            </div>

            {/* Resumes List */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Resumes</h3>
                {isLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-600 border-t-transparent" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500">Unable to fetch resumes. Please try again later.</p>
                    </div>
                ) : resumes && resumes.length === 0 ? (
                    <EmptyState onCreateNew={handleCreateNew} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {resumes?.map((resume: any, index: number) => (
                            <motion.div
                                key={resume.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="p-5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                                {resume.title || 'Untitled'}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">{resume.templateType} &bull; {new Date(resume.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`inline-flex items-center rounded px-2 py-1 text-xs font-medium ${
                                            resume.isDraft
                                                ? 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                                                : 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                        }`}>
                                            {resume.isDraft ? 'Draft' : 'Published'}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/builder/${resume.id}`)}
                                            className="flex-1 btn-secondary text-xs py-1.5 px-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => navigate(`/preview/${resume.id}`)}
                                            className="flex-1 btn-secondary text-xs py-1.5 px-3"
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, color = 'blue' }: { title: string, value: number, icon: any, color?: string }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-700',
        green: 'bg-green-50 text-green-700',
        yellow: 'bg-yellow-50 text-yellow-700',
        red: 'bg-red-50 text-red-700',
        purple: 'bg-purple-50 text-purple-700',
    }[color] || 'bg-gray-50 text-gray-700'

    return (
        <div className="card p-5">
            <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${colorClasses}`}>
                    <Icon className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    )
}

function EmptyState({ onCreateNew }: { onCreateNew: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Resumes Yet</h3>
            <p className="text-gray-500 mb-6 max-w-sm text-center">
                Create your first resume to get started. Our AI will help you build a professional resume in minutes.
            </p>
            <button onClick={onCreateNew} className="btn-primary gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Resume
            </button>
        </div>
    )
}
