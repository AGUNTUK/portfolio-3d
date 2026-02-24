'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const blogPosts = [
    {
        id: 1,
        title: 'Building Interactive 3D Experiences with Three.js',
        excerpt: 'Learn how to create stunning 3D web experiences using Three.js and React Three Fiber...',
        date: 'Feb 15, 2024',
        readTime: '8 min read',
        category: '3D Development',
        color: '#e8b4b8',
    },
    {
        id: 2,
        title: 'Modern React Patterns in 2024',
        excerpt: 'Explore the latest React patterns and best practices for building scalable applications...',
        date: 'Feb 10, 2024',
        readTime: '6 min read',
        category: 'React',
        color: '#a8dadc',
    },
    {
        id: 3,
        title: 'The Art of Claymorphism in UI Design',
        excerpt: 'Discover how to create soft, clay-like interfaces that feel tactile and engaging...',
        date: 'Feb 5, 2024',
        readTime: '5 min read',
        category: 'Design',
        color: '#a7c4a0',
    },
    {
        id: 4,
        title: 'Optimizing Next.js for Production',
        excerpt: 'Best practices for optimizing your Next.js applications for maximum performance...',
        date: 'Jan 28, 2024',
        readTime: '7 min read',
        category: 'Next.js',
        color: '#c9b1ff',
    },
]

export default function Blog() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(6)
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
            id="blog"
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
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                    >
                        <span className="text-gradient">Latest Articles</span>
                    </motion.h2>

                    <motion.p
                        className="text-center text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Thoughts, tutorials, and insights on web development and design.
                    </motion.p>

                    {/* Blog posts grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                className="clay-card overflow-hidden group cursor-pointer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                {/* Post header with color accent */}
                                <div
                                    className="h-1.5 sm:h-2"
                                    style={{ background: post.color }}
                                />

                                <div className="p-4 sm:p-5 md:p-6">
                                    {/* Category and date */}
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <span
                                            className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full"
                                            style={{
                                                background: `${post.color}30`,
                                                color: post.color,
                                            }}
                                        >
                                            {post.category}
                                        </span>
                                        <span className="text-text-muted text-[10px] sm:text-xs md:text-sm">{post.date}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold mb-2 sm:mb-3 group-hover:text-clay-primary transition-colors">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    {/* Read more */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-text-muted text-[10px] sm:text-xs md:text-sm">{post.readTime}</span>
                                        <motion.span
                                            className="text-clay-primary font-medium text-xs sm:text-sm flex items-center gap-1"
                                            whileHover={{ x: 5 }}
                                        >
                                            Read more →
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* View all button */}
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
                            View All Articles
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
