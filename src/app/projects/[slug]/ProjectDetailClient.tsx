'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Project } from '@/data/projects'

interface ProjectDetailClientProps {
    project: Project
    relatedProjects: Project[]
}

export default function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div
                        className="clay-orb absolute w-96 h-96 -top-48 -right-48 opacity-20 animate-float"
                        style={{ backgroundColor: project.color }}
                    />
                    <div
                        className="clay-orb absolute w-64 h-64 bottom-0 -left-32 opacity-15 animate-float-slow"
                        style={{ backgroundColor: project.color }}
                    />
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link href="/#projects" className="text-text-secondary hover:text-clay-primary transition-colors">
                            ← Back to Projects
                        </Link>
                    </motion.nav>

                    {/* Project Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            <span className="text-gradient">{project.title}</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            {project.year && (
                                <span className="clay-tag">{project.year}</span>
                            )}
                            {project.role && (
                                <span className="clay-tag">{project.role}</span>
                            )}
                            {project.featured && (
                                <span className="clay-tag bg-accent-purple/20 text-accent-purple">
                                    ⭐ Featured
                                </span>
                            )}
                        </div>

                        <p className="text-xl text-text-secondary max-w-3xl mb-8">
                            {project.longDescription || project.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 mb-12">
                            {project.link && (
                                <motion.a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="clay-button px-8 py-4 text-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    🚀 Live Demo
                                </motion.a>
                            )}
                            {project.github && (
                                <motion.a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="clay-button-secondary px-8 py-4 text-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    📦 View Code
                                </motion.a>
                            )}
                        </div>
                    </motion.div>

                    {/* Project Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="clay-card p-4 mb-16 overflow-hidden"
                    >
                        <div className="relative aspect-video rounded-clay overflow-hidden bg-gradient-to-br from-clay-primary/20 to-accent-purple/20">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement
                                    target.style.display = 'none'
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Features */}
                            {project.features && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6">
                                        <span className="text-gradient">Key Features</span>
                                    </h2>
                                    <ul className="space-y-3">
                                        {project.features.map((feature, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.4 + index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <span
                                                    className="w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5"
                                                    style={{ backgroundColor: project.color + '30' }}
                                                >
                                                    ✓
                                                </span>
                                                <span className="text-text-secondary">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.section>
                            )}

                            {/* Challenges & Solutions */}
                            {project.challenges && project.solutions && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6">
                                        <span className="text-gradient">Challenges & Solutions</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {project.challenges.map((challenge, index) => (
                                            <div key={index} className="clay-card p-6">
                                                <div className="flex items-start gap-4 mb-3">
                                                    <span className="text-xl">🎯</span>
                                                    <div>
                                                        <h4 className="font-semibold text-text-secondary mb-1">Challenge</h4>
                                                        <p className="text-text-muted">{challenge}</p>
                                                    </div>
                                                </div>
                                                {project.solutions && project.solutions[index] && (
                                                    <div className="flex items-start gap-4 mt-4 pt-4 border-t border-clay-shadow/20">
                                                        <span className="text-xl">💡</span>
                                                        <div>
                                                            <h4 className="font-semibold text-text-secondary mb-1">Solution</h4>
                                                            <p className="text-text-muted">{project.solutions[index]}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Technologies */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="clay-card p-6"
                            >
                                <h3 className="font-display font-semibold text-lg mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="clay-tag"
                                            style={{ borderColor: project.color }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Project Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="clay-card p-6"
                            >
                                <h3 className="font-display font-semibold text-lg mb-4">Project Info</h3>
                                <div className="space-y-4">
                                    {project.client && (
                                        <div>
                                            <p className="text-text-muted text-sm">Client</p>
                                            <p className="font-medium">{project.client}</p>
                                        </div>
                                    )}
                                    {project.year && (
                                        <div>
                                            <p className="text-text-muted text-sm">Year</p>
                                            <p className="font-medium">{project.year}</p>
                                        </div>
                                    )}
                                    {project.role && (
                                        <div>
                                            <p className="text-text-muted text-sm">Role</p>
                                            <p className="font-medium">{project.role}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Share */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="clay-card p-6"
                            >
                                <h3 className="font-display font-semibold text-lg mb-4">Share Project</h3>
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                window.open(
                                                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(window.location.href)}`,
                                                    '_blank'
                                                )
                                            }
                                        }}
                                        className="clay-button px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        🐦
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            if (typeof window !== 'undefined') {
                                                window.open(
                                                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(project.title)}`,
                                                    '_blank'
                                                )
                                            }
                                        }}
                                        className="clay-button px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        💼
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            if (typeof navigator !== 'undefined') {
                                                navigator.clipboard.writeText(window.location.href)
                                            }
                                        }}
                                        className="clay-button px-4 py-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        🔗
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Related Projects */}
                    {relatedProjects.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="mt-20"
                        >
                            <h2 className="text-2xl font-display font-bold mb-8">
                                <span className="text-gradient">Related Projects</span>
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedProjects.map((relatedProject) => (
                                    <Link
                                        key={relatedProject.id}
                                        href={`/projects/${relatedProject.slug}`}
                                    >
                                        <motion.div
                                            className="clay-card p-4 h-full"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="aspect-video rounded-clay overflow-hidden mb-4 bg-gradient-to-br from-clay-primary/20 to-accent-purple/20">
                                                <img
                                                    src={relatedProject.image}
                                                    alt={relatedProject.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement
                                                        target.style.display = 'none'
                                                    }}
                                                />
                                            </div>
                                            <h3 className="font-display font-semibold mb-2">
                                                {relatedProject.title}
                                            </h3>
                                            <p className="text-text-muted text-sm line-clamp-2">
                                                {relatedProject.description}
                                            </p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </section>
        </main>
    )
}
