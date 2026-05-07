import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { TemplateType } from '../types'

const templates = [
    {
        id: TemplateType.MODERN,
        name: 'Modern',
        description: 'Clean, contemporary design with a dark header and structured layout',
        features: ['Dark header', 'Structured layout', 'Professional fonts'],
        color: 'from-gray-900 to-gray-700',
    },
    {
        id: TemplateType.MINIMAL,
        name: 'Minimal',
        description: 'Simple, elegant design with minimal styling and maximum readability',
        features: ['Clean white', 'Light borders', 'Easy scanning'],
        color: 'from-gray-100 to-gray-200',
    },
    {
        id: TemplateType.CORPORATE,
        name: 'Corporate',
        description: 'Professional corporate style with blue accents and formal structure',
        features: ['Blue accents', 'Formal structure', 'Executive feel'],
        color: 'from-blue-900 to-blue-700',
    },
    {
        id: TemplateType.CREATIVE,
        name: 'Creative',
        description: 'Vibrant colors and innovative layout for creative professionals',
        features: ['Vibrant colors', 'Innovative layout', 'Stand out'],
        color: 'from-purple-600 to-pink-500',
    },
]

export default function Templates() {
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TemplateType.MODERN)
    const navigate = useNavigate()

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                <p className="text-gray-500 text-sm mt-1">Select a professional template for your resume</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template, index) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`card cursor-pointer transition-all duration-200 ${
                            selectedTemplate === template.id
                                ? 'ring-2 ring-brand-600 shadow-lg'
                                : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                    >
                        {/* Template Preview */}
                        <div className={`h-48 bg-gradient-to-br ${template.color} rounded-t-lg overflow-hidden relative`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-2">
                                        <div className="h-2 w-16 bg-white/60 rounded mb-2" />
                                        <div className="h-2 w-12 bg-white/40 rounded" />
                                    </div>
                                    <span className="text-lg font-bold">{template.name}</span>
                                </div>
                            </div>
                            {selectedTemplate === template.id && (
                                <div className="absolute top-4 right-4 bg-brand-600 rounded-full p-1">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {template.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-end mt-8">
                <button
                    onClick={() => navigate('/builder')}
                    className="btn-primary gap-2"
                >
                    Continue with {templates.find((t) => t.id === selectedTemplate)?.name}
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
