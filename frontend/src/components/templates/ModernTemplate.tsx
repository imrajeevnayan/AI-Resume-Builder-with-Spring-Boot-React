import { Resume } from '../../types'

interface ModernTemplateProps {
    resume: Resume
}

export default function ModernTemplate({ resume }: ModernTemplateProps) {
    return (
        <div className="bg-white text-gray-900 font-sans">
            {/* Header */}
            {resume.personalDetails && (
                <div className="bg-gray-900 text-white p-8">
                    <h1 className="text-3xl font-bold tracking-tight">{resume.personalDetails.fullName}</h1>
                    <p className="text-lg text-gray-400 mt-2">{resume.personalDetails.jobTitle}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-400">
                        {resume.personalDetails.email && <span>{resume.personalDetails.email}</span>}
                        {resume.personalDetails.phone && <span>{resume.personalDetails.phone}</span>}
                        {resume.personalDetails.website && <span>{resume.personalDetails.website}</span>}
                    </div>
                </div>
            )}

            <div className="p-8 space-y-6">
                {/* Professional Summary */}
                {resume.professionalSummary && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">Professional Summary</h2>
                        <p className="text-gray-600 leading-relaxed">{resume.professionalSummary.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">Work Experience</h2>
                        <div className="space-y-4">
                            {resume.workExperiences.map((exp: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                                        <span className="text-sm text-gray-500">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 font-medium">{exp.position}</p>
                                    <p className="text-gray-600 mt-1">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {resume.skills.map((skill: any, i: number) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.educations && resume.educations.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-900 pb-2">Education</h2>
                        <div className="space-y-3">
                            {resume.educations.map((edu: any, i: number) => (
                                <div key={i}>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                                        <span className="text-sm text-gray-500">
                                            {edu.startDate} - {edu.endDate}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
