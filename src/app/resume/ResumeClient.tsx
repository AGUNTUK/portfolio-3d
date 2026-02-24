'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { experiences } from '@/data/experience'

const skills = [
    { name: 'React/Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'Three.js/WebGL', level: 80 },
    { name: 'UI/UX Design', level: 85 },
]

const technologies = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs'] },
    { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
    { category: 'DevOps', items: ['AWS', 'Vercel', 'Docker', 'CI/CD', 'Git'] },
    { category: 'Design', items: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator'] },
]

const education = [
    {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Dhaka',
        year: '2016 - 2020',
        description: 'Graduated with honors. Focused on software engineering and web technologies.',
    },
]

const certifications = [
    { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2023' },
    { name: 'Meta Front-End Developer', issuer: 'Meta', year: '2022' },
    { name: 'Google UX Design Certificate', issuer: 'Google', year: '2022' },
]

export default function ResumeClient() {
    const handlePrint = () => {
        window.print()
    }

    return (
        <main className="min-h-screen pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="clay-orb absolute w-96 h-96 -top-48 -right-48 opacity-20 animate-float" />
                    <div className="clay-orb absolute w-64 h-64 bottom-0 -left-32 opacity-15 animate-float-slow" />
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            <span className="text-gradient">Resume</span>
                        </h1>
                        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
                            Full Stack Web Developer with 6+ years of experience building modern web applications.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="clay-button px-8 py-4 text-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                📄 Download PDF
                            </motion.a>
                            <motion.button
                                onClick={handlePrint}
                                className="clay-button-secondary px-8 py-4 text-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🖨️ Print Resume
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Resume Content */}
                    <div className="space-y-12 print:space-y-8">
                        {/* Contact Info */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="clay-card p-6"
                        >
                            <div className="flex flex-wrap justify-center gap-6 text-center">
                                <div>
                                    <p className="text-text-muted text-sm">Email</p>
                                    <a href="mailto:kazisohel199813@gmail.com" className="font-medium hover:text-clay-primary">
                                        kazisohel199813@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">Phone</p>
                                    <a href="tel:+8801910865990" className="font-medium hover:text-clay-primary">
                                        +8801910865990
                                    </a>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">Location</p>
                                    <p className="font-medium">Dhaka, Bangladesh</p>
                                </div>
                                <div>
                                    <p className="text-text-muted text-sm">Website</p>
                                    <a href="https://sohelrana.dev" className="font-medium hover:text-clay-primary">
                                        sohelrana.dev
                                    </a>
                                </div>
                            </div>
                        </motion.section>

                        {/* Summary */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-display font-bold mb-4">
                                <span className="text-gradient">Professional Summary</span>
                            </h2>
                            <div className="clay-card p-6">
                                <p className="text-text-secondary leading-relaxed">
                                    Full Stack Web Developer with 6+ years of experience in building modern, scalable web applications.
                                    Proficient in React, Next.js, Node.js, and TypeScript. Passionate about creating beautiful,
                                    user-friendly interfaces and robust backend systems. Strong problem-solving skills and experience
                                    leading development teams. Committed to writing clean, maintainable code and staying current
                                    with industry best practices.
                                </p>
                            </div>
                        </motion.section>

                        {/* Skills */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-display font-bold mb-4">
                                <span className="text-gradient">Technical Skills</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Skill Bars */}
                                <div className="clay-card p-6">
                                    <h3 className="font-display font-semibold mb-4">Proficiency</h3>
                                    <div className="space-y-4">
                                        {skills.map((skill) => (
                                            <div key={skill.name}>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-sm font-medium">{skill.name}</span>
                                                    <span className="text-sm text-text-muted">{skill.level}%</span>
                                                </div>
                                                <div className="h-2 bg-clay-surface rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-clay-primary to-accent-purple"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="clay-card p-6">
                                    <h3 className="font-display font-semibold mb-4">Technologies</h3>
                                    <div className="space-y-4">
                                        {technologies.map((tech) => (
                                            <div key={tech.category}>
                                                <p className="text-sm font-medium text-text-muted mb-2">{tech.category}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {tech.items.map((item) => (
                                                        <span key={item} className="clay-tag text-xs">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Experience */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-display font-bold mb-4">
                                <span className="text-gradient">Work Experience</span>
                            </h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="clay-card p-6"
                                        style={{ borderLeft: `4px solid ${exp.color}` }}
                                    >
                                        <div className="flex flex-wrap justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-display font-semibold text-lg">{exp.role}</h3>
                                                <p className="text-clay-primary">{exp.company}</p>
                                            </div>
                                            <span className="clay-tag">{exp.period}</span>
                                        </div>
                                        <p className="text-text-secondary mb-4">{exp.description}</p>
                                        <ul className="list-disc list-inside text-text-muted space-y-1">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i}>{achievement}</li>
                                            ))}
                                        </ul>
                                        {exp.technologies && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {exp.technologies.map((tech) => (
                                                    <span key={tech} className="clay-tag text-xs">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Education */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <h2 className="text-2xl font-display font-bold mb-4">
                                <span className="text-gradient">Education</span>
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index} className="clay-card p-6">
                                        <div className="flex flex-wrap justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-display font-semibold text-lg">{edu.degree}</h3>
                                                <p className="text-clay-primary">{edu.school}</p>
                                            </div>
                                            <span className="clay-tag">{edu.year}</span>
                                        </div>
                                        <p className="text-text-secondary">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Certifications */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <h2 className="text-2xl font-display font-bold mb-4">
                                <span className="text-gradient">Certifications</span>
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="clay-card p-4 text-center">
                                        <h3 className="font-display font-semibold mb-1">{cert.name}</h3>
                                        <p className="text-text-muted text-sm">{cert.issuer}</p>
                                        <p className="text-clay-primary text-sm">{cert.year}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>
            </section>
        </main>
    )
}
