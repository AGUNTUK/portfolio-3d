'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { useThemeStore } from '@/store/useStore'

interface SceneProps {
    children: React.ReactNode
    className?: string
}

export default function Scene({ children, className }: SceneProps) {
    const isDark = useThemeStore((state) => state.isDark)

    return (
        <Canvas
            className={className}
            camera={{ position: [0, 0, 10], fov: 60 }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            style={{
                background: isDark ? 'linear-gradient(180deg, #1a1a2e 0%, #252542 100%)' : 'linear-gradient(180deg, #f0e6d3 0%, #f5ebe0 100%)',
            }}
        >
            <Suspense fallback={null}>
                {children}
                <Preload all />
            </Suspense>
        </Canvas>
    )
}