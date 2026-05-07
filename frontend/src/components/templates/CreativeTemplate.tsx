import { Resume } from '../../types'

interface CreativeTemplateProps {
    resume: Resume
}

export default function CreativeTemplate({ resume }: CreativeTemplateProps) {
    return (
        <div className="bg-white text-gray-900 font-sans">
            {/* Colorful Header */}
            {resume.personalDetails && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl font-extrabold tracking-tight">{resume.personalDetails.fullName}</h1>
                        <p className="text-xl mt-2 text-purple-100 font-medium">{resume.personalDetails.jobTitle}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-purple-200">
                            {resume.personalDetails.email && <span>{resume.personalDetails.email}</span>}
                            {resume.personalDetails.phone && <span>{resume.personalDetails.phone}</span>}
                            {resume.personalDetails.website && <span>{resume.personalDetails.website}</span>}
                        </div>
                    </div>
                </div>
            )}

            <div className="p-8 space-y-8 max-w-4xl mx-auto">
                {/* Professional Summary */}
                {resume.professionalSummary && (
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-3">Professional Summary</h2>
                        <p className="text-gray-700 leading-relaxed">{resume.professionalSummary.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">Work Experience</h2>
                        <div className="space-y-6">
                            {resume.workExperiences.map((exp: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-purple-200">
                                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                                    <h3 className="text-lg font-bold text-gray-900">{exp.company}</h3>
                                    <p className="text-purple-600 font-medium">{exp.position}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                    </p>
                                    <p className="text-gray-700 mt-2">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.educations && resume.educations.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">Education</h2>
                        <div className="space-y-4">
                            {resume.educations.map((edu: any, i: number) => (
                                <div key={i} className="relative pl-6 border-l-2 border-purple-200">
                                    <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                                    <h3 className="font-bold text-gray-900">{edu.institution}</h3>
                                    <p className="text-purple-600">{edu.degree}{edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ''}</p>
                                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-3">
                            {resume.skills.map((skill: any, i: number) => (
                                <span
                                    key={i}
                                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
