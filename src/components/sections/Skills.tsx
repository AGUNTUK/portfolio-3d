'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

// Import brand icons from react-icons
import {
    SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiThreedotjs, SiFramer,
    SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiGraphql, SiPrisma,
    SiFigma, SiCanva, SiAdobexd, SiAdobephotoshop, SiAdobeillustrator,
    SiAmazonwebservices, SiDocker, SiGit, SiVercel, SiLinux, SiGithubactions,
    SiRedux, SiExpo, SiFirebase, SiSupabase, SiStripe, SiOpenai
} from 'react-icons/si'
import { IconType } from 'react-icons'

interface Skill {
    name: string
    icon: IconType
    color: string
}

interface SkillCategory {
    name: string
    icon: string
    color: string
    skills: Skill[]
}

const skillCategories: SkillCategory[] = [
    {
        name: 'Frontend',
        icon: '🎨',
        color: '#6366f1',
        skills: [
            { name: 'React', icon: SiReact, color: '#61DAFB' },
            { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
            { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
            { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
        ],
    },
    {
        name: 'Backend',
        icon: '⚙️',
        color: '#38bdf8',
        skills: [
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
            { name: 'Python', icon: SiPython, color: '#3776AB' },
            { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
            { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
            { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
        ],
    },
    {
        name: 'Design',
        icon: '✨',
        color: '#a78bfa',
        skills: [
            { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
            { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
            { name: 'Adobe XD', icon: SiAdobexd, color: '#FF61F6' },
            { name: 'Photoshop', icon: SiAdobephotoshop, color: '#31A8FF' },
            { name: 'Illustrator', icon: SiAdobeillustrator, color: '#FF9A00' },
            { name: 'UI/UX Design', icon: SiFigma, color: '#a78bfa' },
        ],
    },
    {
        name: 'DevOps & Tools',
        icon: '🚀',
        color: '#22d3ee',
        skills: [
            { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
            { name: 'Docker', icon: SiDocker, color: '#2496ED' },
            { name: 'Git', icon: SiGit, color: '#F05032' },
            { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
            { name: 'CI/CD', icon: SiGithubactions, color: '#2088FF' },
            { name: 'Linux', icon: SiLinux, color: '#FCC624' },
        ],
    },
    {
        name: 'Other',
        icon: '💡',
        color: '#f472b6',
        skills: [
            { name: 'Redux', icon: SiRedux, color: '#764ABC' },
            { name: 'React Native', icon: SiExpo, color: '#000020' },
            { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
            { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
            { name: 'Stripe', icon: SiStripe, color: '#008CDD' },
            { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
        ],
    },
]

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)
    const [activeCategory, setActiveCategory] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(2)
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
            id="skills"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-32 h-32 clay-orb opacity-10 animate-float" />
                <div className="absolute bottom-1/4 right-10 w-40 h-40 clay-orb opacity-10 animate-float-slow" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section title */}
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-8 sm:mb-12 md:mb-16"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                    >
                        <span className="text-gradient">Skills Galaxy</span>
                    </motion.h2>

                    {/* Category selector - scrollable on mobile */}
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-2">
                        {skillCategories.map((category, index) => (
                            <motion.button
                                key={category.name}
                                onClick={() => setActiveCategory(index)}
                                className={`clay-button px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base ${activeCategory === index ? 'ring-2 ring-clay-primary' : ''
                                    }`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    background: activeCategory === index
                                        ? `linear-gradient(145deg, ${category.color}, ${category.color}dd)`
                                        : undefined,
                                }}
                            >
                                <span className="text-base sm:text-lg md:text-xl">{category.icon}</span>
                                <span className="font-medium">{category.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Skills display */}
                    <motion.div
                        className="clay-card p-4 sm:p-6 md:p-8 lg:p-12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {skillCategories[activeCategory].skills.map((skill, index) => {
                                const IconComponent = skill.icon
                                return (
                                    <motion.div
                                        key={skill.name}
                                        className="relative group"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.1 * index }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div
                                            className="clay-card p-3 sm:p-4 md:p-6 text-center cursor-pointer"
                                            style={{
                                                background: `linear-gradient(145deg, ${skillCategories[activeCategory].color}20, ${skillCategories[activeCategory].color}10)`,
                                            }}
                                        >
                                            <motion.div
                                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(145deg, #000000, #1a1a1a)`,
                                                }}
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <IconComponent
                                                    className="text-xl sm:text-2xl md:text-3xl"
                                                    style={{ color: skill.color }}
                                                />
                                            </motion.div>
                                            <h3 className="font-semibold text-xs sm:text-sm md:text-base lg:text-lg">{skill.name}</h3>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>

                    {/* Skill stats */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-10 md:mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                    >
                        {[
                            { label: 'Years Experience', value: '5+' },
                            { label: 'Projects Completed', value: '50+' },
                            { label: 'Happy Clients', value: '30+' },
                            { label: 'Technologies', value: '20+' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="clay-card p-3 sm:p-4 md:p-6 text-center"
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-gradient mb-1 sm:mb-2"
                                    initial={{ scale: 0 }}
                                    animate={isInView ? { scale: 1 } : {}}
                                    transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                                >
                                    {stat.value}
                                </motion.div>
                                <p className="text-text-secondary text-xs sm:text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
