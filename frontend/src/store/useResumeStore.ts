import { create } from 'zustand'
import { Resume } from '../types'

interface ResumeState {
    currentResume: Resume | null
    currentStep: number
    isLoading: boolean
    error: string | null
    setCurrentResume: (resume: Resume | null) => void
    setCurrentStep: (step: number) => void
    updateResumeField: <K extends keyof Resume>(field: K, value: Resume[K]) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    reset: () => void
}

export const useResumeStore = create<ResumeState>((set) => ({
    currentResume: null,
    currentStep: 1,
    isLoading: false,
    error: null,

    setCurrentResume: (resume) =>
        set({ currentResume: resume, error: null }),

    setCurrentStep: (step) =>
        set({ currentStep: step }),

    updateResumeField: (field, value) =>
        set((state) => ({
            currentResume: state.currentResume
                ? { ...state.currentResume, [field]: value }
                : null,
        })),

    setLoading: (loading) =>
        set({ isLoading: loading }),

    setError: (error) =>
        set({ error }),

    reset: () =>
        set({
            currentResume: null,
            currentStep: 1,
            isLoading: false,
            error: null,
        }),
}))
