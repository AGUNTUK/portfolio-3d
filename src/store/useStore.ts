import { create } from 'zustand'

interface MouseState {
    x: number
    y: number
    normalizedX: number
    normalizedY: number
    setMouse: (x: number, y: number) => void
}

interface ScrollState {
    progress: number
    section: number
    setProgress: (progress: number) => void
    setSection: (section: number) => void
}

interface ThemeState {
    isDark: boolean
    toggleTheme: () => void
}

interface LoadingState {
    isLoading: boolean
    loadingProgress: number
    setLoading: (isLoading: boolean) => void
    setLoadingProgress: (progress: number) => void
}

// Mouse position store
export const useMouseStore = create<MouseState>((set) => ({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    setMouse: (x, y) => set({
        x,
        y,
        normalizedX: (x / window.innerWidth) * 2 - 1,
        normalizedY: -(y / window.innerHeight) * 2 + 1,
    }),
}))

// Scroll state store
export const useScrollStore = create<ScrollState>((set) => ({
    progress: 0,
    section: 0,
    setProgress: (progress) => set({ progress }),
    setSection: (section) => set({ section }),
}))

// Theme store
export const useThemeStore = create<ThemeState>((set, get) => ({
    isDark: true,
    toggleTheme: () => {
        const newIsDark = !get().isDark
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('light', !newIsDark)
        }
        set({ isDark: newIsDark })
    },
}))

// Loading store
export const useLoadingStore = create<LoadingState>((set) => ({
    isLoading: true,
    loadingProgress: 0,
    setLoading: (isLoading) => set({ isLoading }),
    setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
}))

// Combined store for 3D scene
interface SceneState {
    cameraPosition: [number, number, number]
    cameraTarget: [number, number, number]
    isDragging: boolean
    hoveredObject: string | null
    setCameraPosition: (position: [number, number, number]) => void
    setCameraTarget: (target: [number, number, number]) => void
    setIsDragging: (isDragging: boolean) => void
    setHoveredObject: (id: string | null) => void
}

export const useSceneStore = create<SceneState>((set) => ({
    cameraPosition: [0, 0, 10],
    cameraTarget: [0, 0, 0],
    isDragging: false,
    hoveredObject: null,
    setCameraPosition: (position) => set({ cameraPosition: position }),
    setCameraTarget: (target) => set({ cameraTarget: target }),
    setIsDragging: (isDragging) => set({ isDragging }),
    setHoveredObject: (id) => set({ hoveredObject: id }),
}))