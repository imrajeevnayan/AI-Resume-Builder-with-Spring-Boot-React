import { Resume } from '../../types'

interface MinimalTemplateProps {
    resume: Resume
}

export default function MinimalTemplate({ resume }: MinimalTemplateProps) {
    return (
        <div className="bg-white text-gray-900 font-sans max-w-4xl mx-auto">
            {/* Header */}
            {resume.personalDetails && (
                <div className="pt-8 pb-4 px-8 border-b border-gray-200">
                    <h1 className="text-3xl font-light tracking-wide text-gray-800">{resume.personalDetails.fullName}</h1>
                    <p className="text-lg text-gray-500 mt-1 font-light">{resume.personalDetails.jobTitle}</p>
                </div>
            )}

            <div className="px-8 pt-6 pb-8 space-y-6">
                {/* Professional Summary */}
                {resume.professionalSummary && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Summary</h2>
                        <p className="text-gray-700 leading-relaxed text-sm">{resume.professionalSummary.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">Experience</h2>
                        <div className="space-y-3">
                            {resume.workExperiences.map((exp: any, i: number) => (
                                <div key={i} className="border-b border-gray-100 pb-3 last:border-0">
                                    <div className="flex justify-between items-end">
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-gray-900">{exp.company}</h3>
                                            <p className="text-sm text-gray-600">{exp.position}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400">
                                                {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.educations && resume.educations.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">Education</h2>
                        <div className="space-y-2">
                            {resume.educations.map((edu: any, i: number) => (
                                <div key={i} className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">{edu.institution}</h3>
                                        <p className="text-sm text-gray-600">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                                    </div>
                                    <p className="text-xs text-gray-400">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">Skills</h2>
                        <p className="text-sm text-gray-700">{resume.skills.map((s: any) => s.name).join(', ')}</p>
                    </section>
                )}
            </div>
        </div>
    )
}
