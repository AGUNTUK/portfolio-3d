'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null)
    const setSection = useScrollStore((state) => state.setSection)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(0)
                }
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [setSection])

    return (
        <section
            ref={sectionRef}
            id="hero"
            className="section min-h-screen min-h-[100dvh] flex items-center justify-center relative overflow-hidden"
        >
            {/* Cinematic background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large rotating orb - hidden on mobile */}
                <motion.div
                    className="hidden md:block clay-orb absolute w-[600px] h-[600px] -top-60 -right-60 opacity-15"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                {/* Medium floating orb */}
                <motion.div
                    className="clay-orb absolute w-40 h-40 md:w-80 md:h-80 bottom-10 -left-20 md:bottom-20 md:-left-40 opacity-10"
                    animate={{
                        y: [-20, 20, -20],
                        rotate: -360
                    }}
                    transition={{
                        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 45, repeat: Infinity, ease: "linear" }
                    }}
                />
                {/* Small pulsing orb */}
                <motion.div
                    className="hidden md:block clay-orb absolute w-48 h-48 top-1/3 right-1/4 opacity-10"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Cinematic light rays - desktop only */}
                <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
                    <motion.div
                        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-indigo-500/20 via-transparent to-transparent"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-500/20 via-transparent to-transparent"
                        animate={{ opacity: [0.1, 0.25, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                </div>
            </div>

            {/* Main content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Cinematic greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-4 md:mb-6"
                    >
                        <span className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-white/50 uppercase font-light">
                            Hello, I'm
                        </span>
                    </motion.div>

                    {/* Cinematic name */}
                    <motion.div
                        className="relative mb-4 md:mb-8"
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-wider sm:tracking-wider">
                            <span className="text-gradient">SOHEL RANA</span>
                        </h1>
                        <motion.div
                            className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-indigo-500/0 via-purple-500/20 to-pink-500/0 blur-2xl md:blur-3xl"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </motion.div>

                    {/* Cinematic title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-6 md:mb-10"
                    >
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-display text-white/70 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase font-light px-4">
                            Full Stack Web Developer
                        </h2>
                    </motion.div>

                    {/* Cinematic description */}
                    <motion.p
                        className="text-sm sm:text-base md:text-lg text-white/40 max-w-xl sm:max-w-2xl mx-auto mb-8 md:mb-14 leading-relaxed font-light px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Crafting modern, fast, and immersive web experiences.
                        <span className="hidden sm:inline"><br /></span>
                        <span className="sm:hidden"> </span>
                        Passionate about beautiful, functional, and scalable solutions.
                    </motion.p>

                    {/* Cinematic CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.button
                            className="clay-button text-sm sm:text-base w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            View My Work
                        </motion.button>
                        <motion.button
                            className="relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-semibold tracking-wider uppercase text-white/70 border border-white/20 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                        >
                            Get In Touch
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Cinematic scroll indicator */}
                <motion.div
                    className="absolute bottom-8 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                >
                    <motion.div
                        className="flex flex-col items-center gap-2 sm:gap-3"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                            className="w-6 h-10 sm:w-7 sm:h-12 border border-white/20 rounded-full flex justify-center pt-2"
                        >
                            <motion.div
                                className="w-1.5 h-2 sm:h-3 bg-white/40 rounded-full"
                                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                        <span className="text-white/30 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                            Scroll
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
