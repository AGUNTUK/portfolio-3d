'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const projects = [
    {
        id: 1,
        title: 'Restiqo - Booking Marketplace',
        description: 'A comprehensive booking marketplace platform for hotels and accommodations with real-time availability, secure payments, and user reviews.',
        image: '/projects/restiqo.jpg',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
        color: '#e8b4b8',
        link: 'https://restiqo.vercel.app',
        github: '#',
    },
    {
        id: 2,
        title: 'Hodo E-commerce',
        description: 'Full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and admin dashboard.',
        image: '/projects/hodo.jpg',
        tags: ['Next.js', 'React', 'Stripe', 'MongoDB'],
        color: '#a8dadc',
        link: 'https://hodo-ecommerce.vercel.app',
        github: '#',
    },
    {
        id: 3,
        title: 'Joborafy - Job Listing Platform',
        description: 'Modern job listing platform with advanced search, filters, application tracking, and employer dashboard.',
        image: '/projects/joborafy.jpg',
        tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
        color: '#a7c4a0',
        link: 'https://joborafy.vercel.app',
        github: '#',
    },
    {
        id: 4,
        title: 'Staysfy - Hotel Booking',
        description: 'Hotel booking marketplace with real-time availability, instant booking, reviews, and secure payment integration.',
        image: '/projects/staysfy.jpg',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        color: '#c9b1ff',
        link: 'https://staysfy.vercel.app',
        github: '#',
    },
    {
        id: 5,
        title: 'Onlinekorun - Brand Agency',
        description: 'Brand website creating agency platform with portfolio showcase, client testimonials, and service offerings.',
        image: '/projects/onlinekorun.jpg',
        tags: ['Next.js', 'React', 'Tailwind', 'Framer Motion'],
        color: '#f4a261',
        link: 'https://onlinekorun.vercel.app',
        github: '#',
    },
    {
        id: 6,
        title: 'Stackry - AI Website Builder',
        description: 'AI-powered website builder that enables users to create stunning websites with intelligent design suggestions.',
        image: '/projects/stackry.jpg',
        tags: ['React', 'OpenAI', 'Node.js', 'MongoDB'],
        color: '#e76f51',
        link: 'https://stackry.vercel.app',
        github: '#',
    },
    {
        id: 7,
        title: 'Velora4You - E-commerce',
        description: 'Modern e-commerce store with beautiful product displays, smooth checkout experience, and inventory management.',
        image: '/projects/velora.jpg',
        tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
        color: '#9a8c98',
        link: 'https://velora4you.vercel.app',
        github: '#',
    },
]

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(3)
                }
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [setSection])

    const allTags = ['all', ...Array.from(new Set(projects.flatMap((p) => p.tags)))]

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter((p) => p.tags.includes(filter))

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section title */}
                    <motion.h2
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-4 sm:mb-6 md:mb-8"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                    >
                        <span className="text-gradient">Featured Projects</span>
                    </motion.h2>

                    <motion.p
                        className="text-center text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        A collection of projects I've worked on, showcasing my skills in full-stack
                        development, design, and problem-solving.
                    </motion.p>

                    {/* Filter tags */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10 md:mb-12 px-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        {['all', 'React', 'Next.js', 'TypeScript', 'Node.js', 'Python'].map((tag) => (
                            <motion.button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className={`clay-tag capitalize text-xs sm:text-sm ${filter === tag ? 'bg-clay-primary text-white' : ''
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {tag}
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Projects grid */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                        layout
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    onClick={() => setSelectedProject(project)}
                                    className="clay-card overflow-hidden cursor-pointer group"
                                >
                                    {/* Project image placeholder */}
                                    <div
                                        className="h-36 sm:h-40 md:h-48 relative overflow-hidden"
                                        style={{
                                            background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                                        }}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-4xl sm:text-5xl md:text-6xl opacity-50">💻</span>
                                        </div>
                                        {/* Hover overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            initial={false}
                                        >
                                            <span className="text-white font-medium text-sm sm:text-base">View Details</span>
                                        </motion.div>
                                    </div>

                                    {/* Project info */}
                                    <div className="p-4 sm:p-5 md:p-6">
                                        <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-1.5 sm:mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                                                    style={{
                                                        background: `${project.color}30`,
                                                        color: project.color,
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* View more button */}
                    <motion.div
                        className="text-center mt-8 sm:mt-10 md:mt-12"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.button
                            className="clay-button px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View All Projects
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Project detail modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="clay-card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="h-48 sm:h-56 md:h-64 relative"
                                style={{
                                    background: `linear-gradient(135deg, ${selectedProject.color}40, ${selectedProject.color}20)`,
                                }}
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-3 sm:top-4 right-3 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors text-sm sm:text-base"
                                >
                                    ✕
                                </button>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-6xl sm:text-7xl md:text-8xl opacity-50">💻</span>
                                </div>
                            </div>
                            <div className="p-5 sm:p-6 md:p-8">
                                <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4">
                                    {selectedProject.title}
                                </h3>
                                <p className="text-text-secondary text-sm sm:text-base mb-4 sm:mb-6">
                                    {selectedProject.description}
                                </p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                                    {selectedProject.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="clay-tag text-xs sm:text-sm"
                                            style={{
                                                background: `${selectedProject.color}30`,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                    <motion.a
                                        href={selectedProject.link}
                                        className="clay-button flex-1 text-center text-sm sm:text-base py-3 sm:py-4"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Live Demo
                                    </motion.a>
                                    <motion.a
                                        href={selectedProject.github}
                                        className="clay-button flex-1 text-center text-sm sm:text-base py-3 sm:py-4"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        GitHub
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
