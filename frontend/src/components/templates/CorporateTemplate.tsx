import { Resume } from '../../types'

interface CorporateTemplateProps {
    resume: Resume
}

export default function CorporateTemplate({ resume }: CorporateTemplateProps) {
    return (
        <div className="bg-white text-gray-900 font-sans max-w-4xl mx-auto">
            {/* Header with color accent */}
            {resume.personalDetails && (
                <div className="bg-brand-900 text-white p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-800 rounded-full -mr-10 -mt-10 opacity-50" />
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold">{resume.personalDetails.fullName}</h1>
                        <p className="text-lg text-brand-200 mt-2">{resume.personalDetails.jobTitle}</p>
                        <div className="flex flex-wrap gap-4 mt-4 text-sm text-brand-300">
                            {resume.personalDetails.email && <span>{resume.personalDetails.email}</span>}
                            {resume.personalDetails.phone && <span>{resume.personalDetails.phone}</span>}
                            {resume.personalDetails.linkedIn && <span>{resume.personalDetails.linkedIn}</span>}
                        </div>
                    </div>
                </div>
            )}

            <div className="p-8 space-y-6 border-t-4 border-brand-600">
                {/* Professional Summary */}
                {resume.professionalSummary && (
                    <section>
                        <h2 className="text-lg font-bold text-brand-900 mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 bg-brand-600 rounded-full inline-block" />
                            About Me
                        </h2>
                        <p className="text-gray-700 leading-relaxed">{resume.professionalSummary.summary}</p>
                    </section>
                )}

                {/* Work Experience */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-brand-900 mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 bg-brand-600 rounded-full inline-block" />
                            Employment History
                        </h2>
                        <div className="space-y-4">
                            {resume.workExperiences.map((exp: any, i: number) => (
                                <div key={i} className="border-l-2 border-brand-200 pl-4 ml-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                                        <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                            {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <p className="text-brand-700 font-medium mt-1">{exp.position}</p>
                                    <p className="text-gray-600 mt-2 text-sm">{exp.summary}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {resume.educations && resume.educations.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-brand-900 mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 bg-brand-600 rounded-full inline-block" />
                            Education
                        </h2>
                        <div className="space-y-3">
                            {resume.educations.map((edu: any, i: number) => (
                                <div key={i} className="border-l-2 border-brand-200 pl-4 ml-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                                        <span className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold text-brand-900 mb-3 flex items-center gap-2">
                            <span className="h-2 w-2 bg-brand-600 rounded-full inline-block" />
                            Skills
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {resume.skills.map((skill: any, i: number) => (
                                <span
                                    key={i}
                                    className="bg-brand-50 text-brand-800 text-sm px-3 py-2 rounded text-center font-medium"
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
