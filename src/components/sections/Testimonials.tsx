'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO, TechStart',
        avatar: '👩‍💼',
        content: 'Working with this developer was an absolute pleasure. They delivered a stunning website that exceeded our expectations. Their attention to detail and technical expertise is remarkable.',
        rating: 5,
        color: '#e8b4b8',
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Product Manager, InnovateCo',
        avatar: '👨‍💻',
        content: 'Exceptional full-stack skills combined with great communication. They understood our requirements perfectly and delivered on time. Highly recommended!',
        rating: 5,
        color: '#a8dadc',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Founder, DesignHub',
        avatar: '👩‍🎨',
        content: 'The 3D portfolio they created for us was mind-blowing! Creative, innovative, and technically brilliant. Our clients love the interactive experience.',
        rating: 5,
        color: '#a7c4a0',
    },
    {
        id: 4,
        name: 'David Kim',
        role: 'CTO, DataFlow',
        avatar: '👨‍🔬',
        content: 'Their expertise in building scalable applications is outstanding. They helped us modernize our entire tech stack with minimal disruption to our business.',
        rating: 5,
        color: '#c9b1ff',
    },
]

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(5)
                }
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [setSection])

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section
            ref={sectionRef}
            id="testimonials"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="hidden md:block absolute top-1/3 left-1/4 w-64 h-64 clay-orb opacity-10 animate-float" />
                <div className="hidden md:block absolute bottom-1/3 right-1/4 w-48 h-48 clay-orb opacity-10 animate-float-slow" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
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
                        <span className="text-gradient">What People Say</span>
                    </motion.h2>

                    {/* Main testimonial display */}
                    <div className="relative px-2 sm:px-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="clay-card p-5 sm:p-6 md:p-8 lg:p-12 max-w-3xl mx-auto"
                            >
                                {/* Quote icon */}
                                <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 opacity-20">"</div>

                                {/* Content */}
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-6 sm:mb-8 leading-relaxed">
                                    {testimonials[activeIndex].content}
                                </p>

                                {/* Author info */}
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div
                                        className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
                                        style={{
                                            background: `linear-gradient(145deg, ${testimonials[activeIndex].color}40, ${testimonials[activeIndex].color}20)`,
                                        }}
                                    >
                                        {testimonials[activeIndex].avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-base sm:text-lg">
                                            {testimonials[activeIndex].name}
                                        </h4>
                                        <p className="text-text-muted text-xs sm:text-sm md:text-base">{testimonials[activeIndex].role}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-0.5 sm:gap-1 mt-3 sm:mt-4">
                                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-500 text-sm sm:text-base">★</span>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                            {testimonials.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${index === activeIndex ? 'bg-clay-primary' : 'bg-clay-surface'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>

                        {/* Navigation arrows - hidden on mobile */}
                        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none">
                            <motion.button
                                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                                className="clay-button w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center pointer-events-auto -ml-4 lg:-ml-6"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ←
                            </motion.button>
                            <motion.button
                                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                                className="clay-button w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center pointer-events-auto -mr-4 lg:-mr-6"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                →
                            </motion.button>
                        </div>
                    </div>

                    {/* Small testimonial cards */}
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                className={`clay-card p-2 sm:p-3 md:p-4 cursor-pointer transition-all ${index === activeIndex ? 'ring-2 ring-clay-primary' : ''
                                    }`}
                                onClick={() => setActiveIndex(index)}
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl flex-shrink-0"
                                        style={{
                                            background: `linear-gradient(145deg, ${testimonial.color}40, ${testimonial.color}20)`,
                                        }}
                                    >
                                        {testimonial.avatar}
                                    </div>
                                    <div className="overflow-hidden min-w-0">
                                        <h5 className="font-medium text-xs sm:text-sm truncate">{testimonial.name}</h5>
                                        <p className="text-text-muted text-[10px] sm:text-xs truncate">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
