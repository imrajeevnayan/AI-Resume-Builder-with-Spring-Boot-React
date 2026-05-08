import { NavLink, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    FileText,
    Palette,
    Sparkles,
    ChevronLeft,
} from 'lucide-react'
import { useUiStore } from '../../store/useUiStore'

const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resumes', href: '/builder', icon: FileText },
    { name: 'Templates', href: '/templates', icon: Palette },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
]

export default function Sidebar() {
    const { toggleSidebar } = useUiStore()
    const location = useLocation()

    return (
        <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">AI Resume</span>
                </div>
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">
                    Main
                </div>
                {navigationItems.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(item.href)
                    return (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-brand-50 text-brand-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon
                                className={`h-5 w-5 ${isActive ? 'text-brand-600' : 'text-gray-400'}`}
                            />
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-brand-600">U</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">Guest User</p>
                        <p className="text-xs text-gray-500">No authentication</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
