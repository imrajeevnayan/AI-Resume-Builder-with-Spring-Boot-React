import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useUiStore } from '../../store/useUiStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function Layout() {
    const { isSidebarOpen } = useUiStore()

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.3 }}
                        className="fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-200 z-50"
                    >
                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
                className="flex-1 flex flex-col overflow-hidden"
                animate={{ marginLeft: isSidebarOpen ? 288 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-900">AI Resume Builder</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">v1.0</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </motion.div>
        </div>
    )
}
