import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, Printer, Download, Share2 } from 'lucide-react'
import { Resume, TemplateType } from '../types'
import { resumeService } from '../services/resumeService'
import ModernTemplate from '../components/templates/ModernTemplate'
import MinimalTemplate from '../components/templates/MinimalTemplate'
import CorporateTemplate from '../components/templates/CorporateTemplate'
import CreativeTemplate from '../components/templates/CreativeTemplate'
import OverleafTemplate from '../components/templates/OverleafTemplate'

export default function ResumePreview() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { data: resume, isLoading } = useQuery<Resume>({
        queryKey: ['resume', id],
        queryFn: () => resumeService.getResumeById(Number(id)),
        enabled: !!id,
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-brand-600 border-t-transparent" />
            </div>
        )
    }

    if (!resume) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Resume not found</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary mt-4">
                    Back to Dashboard
                </button>
            </div>
        )
    }

    const renderTemplate = () => {
        switch (resume.templateType) {
            case TemplateType.MINIMAL:
                return <MinimalTemplate resume={resume} />
            case TemplateType.CORPORATE:
                return <CorporateTemplate resume={resume} />
            case TemplateType.CREATIVE:
                return <CreativeTemplate resume={resume} />
            case TemplateType.OVERLEAF:
                return <OverleafTemplate resume={resume} />
            case TemplateType.MODERN:
            default:
                return <ModernTemplate resume={resume} />
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                        <p className="text-gray-500 text-sm mt-1">{resume.title}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn-secondary gap-2 text-sm">
                        <Printer className="h-4 w-4" />
                        Print
                    </button>
                    <button className="btn-secondary gap-2 text-sm">
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button className="btn-secondary gap-2 text-sm">
                        <Share2 className="h-4 w-4" />
                        Share
                    </button>
                </div>
            </div>

            {/* Resume Preview */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-lg rounded-xl overflow-hidden max-w-4xl mx-auto"
            >
                {renderTemplate()}
            </motion.div>
        </div>
    )
}
