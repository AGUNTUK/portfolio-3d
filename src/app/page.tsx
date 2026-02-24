'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useMouseStore, useLoadingStore } from '@/store/useStore'

// Import sections
import Navigation from '@/components/ui/Navigation'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'

// Dynamically import 3D components to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false })
const Lights = dynamic(() => import('@/components/3d/Lights'), { ssr: false })
const Particles = dynamic(() => import('@/components/3d/Effects/Particles'), { ssr: false })

export default function Home() {
    const { setMouse } = useMouseStore()
    const { setLoading } = useLoadingStore()

    useEffect(() => {
        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            setMouse(e.clientX, e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Simulate initial load
        const loadTimer = setTimeout(() => {
            setLoading(false)
        }, 2500)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(loadTimer)
        }
    }, [setMouse, setLoading])

    return (
        <main className="relative min-h-screen overflow-x-hidden">
            {/* Loading screen */}
            <LoadingScreen />

            {/* 3D Background Canvas */}
            <div className="canvas-container">
                <Scene>
                    <Lights />
                    <Particles count={300} size={0.015} />
                </Scene>
            </div>

            {/* Navigation */}
            <Navigation />

            {/* Main content sections */}
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Testimonials />
            <Blog />
            <Contact />
        </main>
    )
}