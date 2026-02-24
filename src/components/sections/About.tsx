'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'Three.js/WebGL', level: 80 },
    { name: 'UI/UX Design', level: 85 },
]

const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
    'MongoDB', 'GraphQL', 'Three.js', 'Tailwind CSS', 'Figma', 'AWS',
]

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(1)
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
            id="about"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section title */}
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-10 sm:mb-12 md:mb-16"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                    >
                        <span className="text-gradient">About Me</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
                        {/* Left side - Profile Image */}
                        <motion.div
                            className="relative order-1 md:order-1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="clay-card p-3 sm:p-4 relative overflow-hidden max-w-md mx-auto md:max-w-none">
                                {/* Profile Image */}
                                <div className="aspect-square rounded-clay overflow-hidden relative" style={{ backgroundColor: '#000c17' }}>
                                    <img
                                        src="/images/Adobe Express - file (4).png"
                                        alt="Sohel Rana - Full Stack Web Developer"
                                        className="w-full h-full object-cover"
                                        style={{ mixBlendMode: 'normal' }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                    {/* Subtle gradient overlay for smooth transition */}
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        background: 'linear-gradient(to bottom, transparent 60%, #000c17 100%)',
                                        opacity: 0.3
                                    }} />
                                </div>

                                {/* Floating decorative elements - smaller on mobile */}
                                <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 clay-orb opacity-50 animate-float" />
                                <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 clay-orb opacity-40 animate-float-slow" />
                            </div>
                        </motion.div>

                        {/* Right side - Content */}
                        <motion.div
                            className="order-2 md:order-2 text-center md:text-left"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 }}
                        >
                            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4">
                                Full Stack Web Developer
                            </h3>

                            <p className="text-text-secondary text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                                I'm a passionate Full Stack Web Developer focused on building modern,
                                fast, and user-friendly web experiences. I specialize in creating
                                scalable solutions using cutting-edge technologies.
                            </p>

                            <p className="text-text-secondary text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
                                From e-commerce platforms to booking marketplaces and AI-powered
                                applications, I've built diverse projects that solve real-world problems.
                                I believe in writing clean, maintainable code that delivers exceptional
                                user experiences.
                            </p>

                            {/* Skills bars */}
                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs sm:text-sm font-medium">{skill.name}</span>
                                            <span className="text-xs sm:text-sm text-text-muted">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 sm:h-2 clay-card overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-clay-primary to-accent-purple"
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Technologies */}
                            <div>
                                <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Technologies I work with:</h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
                                    {technologies.map((tech, index) => (
                                        <motion.span
                                            key={tech}
                                            className="clay-tag text-xs sm:text-sm"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                            transition={{ delay: 0.8 + index * 0.05 }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
