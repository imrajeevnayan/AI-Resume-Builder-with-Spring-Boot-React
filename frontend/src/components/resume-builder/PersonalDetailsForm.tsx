import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Loader2, Save, Trash2, Plus, User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase } from 'lucide-react'
import { PersonalDetails } from '../../types'
import { personalDetailsService } from '../../services/resumeService'
import { useResumeStore } from '../../store/useResumeStore'

interface PersonalDetailsFormProps {
    resumeId: number
    resume: any
}

export default function PersonalDetailsForm({ resumeId }: PersonalDetailsFormProps) {
    const [details, setDetails] = useState<PersonalDetails>({
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        website: '',
        linkedIn: '',
        github: '',
    })

    const addDetailsMutation = useMutation({
        mutationFn: (data: PersonalDetails) => personalDetailsService.addPersonalDetails(resumeId, data),
        onSuccess: () => {
            useResumeStore.getState().setCurrentResume(null)
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addDetailsMutation.mutate(details)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
                <User className="h-5 w-5 text-brand-600" />
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="form-label" htmlFor="fullName">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            value={details.fullName}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="John Doe"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="jobTitle">Job Title</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="jobTitle"
                            name="jobTitle"
                            type="text"
                            value={details.jobTitle}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="Software Engineer"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="email">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={details.email}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={details.phone}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="+1 234 567 8900"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="address">Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={details.address || ''}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="123 Main St"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="city">City</label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={details.city || ''}
                        onChange={handleChange}
                        className="input"
                        placeholder="New York"
                    />
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="country">Country</label>
                    <input
                        id="country"
                        name="country"
                        type="text"
                        value={details.country || ''}
                        onChange={handleChange}
                        className="input"
                        placeholder="United States"
                    />
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="website">Website</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="website"
                            name="website"
                            type="url"
                            value={details.website || ''}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="linkedIn">LinkedIn</label>
                    <div className="relative">
                        <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="linkedIn"
                            name="linkedIn"
                            type="url"
                            value={details.linkedIn || ''}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="https://linkedin.com/in/yourprofile"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="github">GitHub</label>
                    <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            id="github"
                            name="github"
                            type="url"
                            value={details.github || ''}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="https://github.com/yourusername"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={addDetailsMutation.isPending}
                    className="btn-primary gap-2"
                >
                    {addDetailsMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="h-4 w-4" />
                    )}
                    Save Details
                </button>
            </div>
        </form>
    )
}
