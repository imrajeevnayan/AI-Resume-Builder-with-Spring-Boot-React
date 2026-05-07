import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'))
const ResumePreview = lazy(() => import('./pages/ResumePreview'))
const Templates = lazy(() => import('./pages/Templates'))
const AIAssistant = lazy(() => import('./pages/AIAssistant'))

function App() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-600 border-t-transparent" />
            </div>
        }>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/builder/:id?" element={<ResumeBuilder />} />
                    <Route path="/preview/:id" element={<ResumePreview />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/ai-assistant" element={<AIAssistant />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default App
