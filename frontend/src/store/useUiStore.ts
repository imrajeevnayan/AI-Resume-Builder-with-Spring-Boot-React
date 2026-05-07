import { create } from 'zustand'

interface UiState {
    isDarkTheme: boolean
    isSidebarOpen: boolean
    setDarkTheme: (isDark: boolean) => void
    toggleSidebar: () => void
    setSidebarOpen: (isOpen: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
    isDarkTheme: false,
    isSidebarOpen: true,
    setDarkTheme: (isDark: boolean) => set({ isDarkTheme: isDark }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
}))
