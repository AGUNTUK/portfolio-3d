'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const experiences = [
    {
        id: 1,
        role: 'Senior Full Stack Developer',
        company: 'Tech Company',
        period: '2022 - Present',
        description: 'Leading development of scalable web applications, mentoring junior developers, and implementing best practices for code quality and performance.',
        achievements: [
            'Led migration to Next.js, improving performance by 40%',
            'Implemented CI/CD pipeline reducing deployment time by 60%',
            'Mentored team of 5 junior developers',
        ],
        color: '#e8b4b8',
    },
    {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Startup Inc.',
        period: '2020 - 2022',
        description: 'Developed and maintained multiple web applications, collaborated with design team on UI/UX, and integrated third-party APIs.',
        achievements: [
            'Built e-commerce platform serving 10K+ users',
            'Reduced API response time by 50%',
            'Implemented real-time features with WebSockets',
        ],
        color: '#a8dadc',
    },
    {
        id: 3,
        role: 'Frontend Developer',
        company: 'Digital Agency',
        period: '2018 - 2020',
        description: 'Created responsive web interfaces, collaborated with clients on design requirements, and optimized website performance.',
        achievements: [
            'Delivered 20+ client projects on time',
            'Achieved 95% client satisfaction rate',
            'Introduced component-based architecture',
        ],
        color: '#a7c4a0',
    },
    {
        id: 4,
        role: 'Junior Developer',
        company: 'Web Studio',
        period: '2017 - 2018',
        description: 'Started career building websites and learning modern web technologies. Gained experience in frontend development and basic backend.',
        achievements: [
            'Learned React and Node.js',
            'Contributed to 15+ projects',
            'Earned promotion within 6 months',
        ],
        color: '#c9b1ff',
    },
]

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(4)
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
            id="experience"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
                        <span className="text-gradient">Experience Journey</span>
                    </motion.h2>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Timeline line - left on mobile, center on desktop */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-clay-primary via-accent-purple to-accent-blue transform md:-translate-x-1/2" />

                        {/* Experience items */}
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                className={`relative flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + index * 0.2 }}
                            >
                                {/* Timeline dot */}
                                <motion.div
                                    className="absolute left-0 md:left-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full transform -translate-x-[5px] md:-translate-x-1/2 z-10"
                                    style={{ background: exp.color }}
                                    whileHover={{ scale: 1.5 }}
                                />

                                {/* Content card - full width on mobile, half on desktop */}
                                <div className={`md:w-1/2 pl-6 sm:pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-8 sm:md:pr-12' : 'md:pl-8 sm:md:pl-12'}`}>
                                    <motion.div
                                        className="clay-card p-4 sm:p-5 md:p-6"
                                        whileHover={{ y: -5 }}
                                    >
                                        {/* Period badge */}
                                        <span
                                            className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3"
                                            style={{ background: `${exp.color}30`, color: exp.color }}
                                        >
                                            {exp.period}
                                        </span>

                                        {/* Role and company */}
                                        <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-0.5 sm:mb-1">
                                            {exp.role}
                                        </h3>
                                        <p className="text-text-secondary text-sm sm:text-base mb-2 sm:mb-3">{exp.company}</p>

                                        {/* Description */}
                                        <p className="text-text-muted text-xs sm:text-sm mb-3 sm:mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <ul className="space-y-1.5 sm:space-y-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-xs sm:text-sm"
                                                >
                                                    <span
                                                        className="mt-1 sm:mt-1.5 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full flex-shrink-0"
                                                        style={{ background: exp.color }}
                                                    />
                                                    <span className="text-text-secondary">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                                {/* Empty space for alternating layout on desktop */}
                                <div className="hidden md:block md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Download resume button */}
                    <motion.div
                        className="text-center mt-8 sm:mt-10 md:mt-12"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                    >
                        <motion.button
                            className="clay-button px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Download Resume
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
