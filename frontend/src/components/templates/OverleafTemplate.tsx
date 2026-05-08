import { Resume } from '../../types'

interface OverleafTemplateProps {
    resume: Resume
}

export default function OverleafTemplate({ resume }: OverleafTemplateProps) {
    return (
        <div className="bg-white text-black p-10 font-serif leading-tight">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-4xl uppercase mb-1">{resume.personalDetails?.fullName}</h1>
                <div className="flex justify-center flex-wrap gap-x-2 text-sm">
                    {resume.personalDetails?.phone && <span>{resume.personalDetails.phone} |</span>}
                    {resume.personalDetails?.email && <span>{resume.personalDetails.email} |</span>}
                    {resume.personalDetails?.website && <span>{resume.personalDetails.website} |</span>}
                    {resume.personalDetails?.linkedIn && <span>LinkedIn |</span>}
                    {resume.personalDetails?.github && <span>GitHub</span>}
                </div>
            </div>

            <div className="space-y-5">
                {/* Education */}
                {resume.educations && resume.educations.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Education</h2>
                        {resume.educations.map((edu, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between font-bold">
                                    <span>{edu.institution}</span>
                                    <span>{edu.location}</span>
                                </div>
                                <div className="flex justify-between italic">
                                    <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                                    <span>{edu.startDate} – {edu.endDate}</span>
                                </div>
                                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {/* Experience */}
                {resume.workExperiences && resume.workExperiences.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Experience</h2>
                        {resume.workExperiences.map((exp, i) => (
                            <div key={i} className="mb-3">
                                <div className="flex justify-between font-bold">
                                    <span>{exp.position}</span>
                                    <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                                </div>
                                <div className="flex justify-between italic text-sm">
                                    <span>{exp.company}</span>
                                    <span>{exp.location}</span>
                                </div>
                                {exp.summary && (
                                    <ul className="list-disc ml-5 mt-1 text-sm space-y-0.5">
                                        {exp.summary.split('\n').filter(line => line.trim()).map((bullet, bi) => (
                                            <li key={bi}>{bullet.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {resume.projects && resume.projects.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Projects</h2>
                        {resume.projects.map((proj, i) => (
                            <div key={i} className="mb-2">
                                <div className="flex justify-between font-bold">
                                    <span>{proj.name} {proj.technologies && <span className="font-normal italic">| {proj.technologies}</span>}</span>
                                    <span>{proj.startDate} – {proj.endDate}</span>
                                </div>
                                {proj.description && (
                                    <ul className="list-disc ml-5 mt-1 text-sm space-y-0.5">
                                        {proj.description.split('\n').filter(line => line.trim()).map((bullet, bi) => (
                                            <li key={bi}>{bullet.replace(/^[•*-]\s*/, '')}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Skills */}
                {resume.skills && resume.skills.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Technical Skills</h2>
                        <div className="text-sm space-y-1">
                            <p>
                                <span className="font-bold">Skills: </span>
                                {resume.skills.map(s => s.name).join(', ')}
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </div>
    )
}
