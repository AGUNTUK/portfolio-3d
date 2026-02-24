'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useScrollStore } from '@/store/useStore'
import { sendEmail, isEmailConfigured } from '@/lib/email'

// Zod validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    subject: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    honeypot: z.string().optional(), // Spam protection
})

type ContactFormData = z.infer<typeof contactSchema>

const socialLinks = [
    { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/8801910865990', color: '#25D366' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com', color: '#333' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com', color: '#0077b5' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com', color: '#1da1f2' },
]

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const setSection = useScrollStore((state) => state.setSection)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setSection(7)
                }
            },
            { threshold: 0.5 }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [setSection])

    const onSubmit = async (data: ContactFormData) => {
        setSubmitError(null)

        const result = await sendEmail(data)

        if (result.success) {
            setIsSubmitted(true)
            reset()
            setTimeout(() => setIsSubmitted(false), 5000)
        } else {
            setSubmitError(result.message)
        }
    }

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="section min-h-screen py-16 sm:py-20 md:py-24 relative"
            aria-labelledby="contact-heading"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="hidden md:block absolute bottom-1/4 left-1/4 w-96 h-96 clay-orb opacity-10 animate-float" />
                <div className="hidden md:block absolute top-1/4 right-1/4 w-64 h-64 clay-orb opacity-10 animate-float-slow" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section title */}
                    <motion.h2
                        id="contact-heading"
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-center mb-3 sm:mb-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                    >
                        <span className="text-gradient">Get In Touch</span>
                    </motion.h2>

                    <motion.p
                        className="text-center text-text-secondary text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 px-4"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        Have a project in mind or want to collaborate? I'd love to hear from you!
                    </motion.p>

                    {/* Demo mode notice */}
                    {!isEmailConfigured() && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 sm:mb-8 text-center px-4"
                        >
                            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-clay bg-accent-purple/10 text-accent-purple text-xs sm:text-sm">
                                📧 Demo Mode - Configure EmailJS for real email sending
                            </span>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                        {/* Contact form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3 }}
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6" noValidate>
                                {/* Honeypot field for spam protection */}
                                <input
                                    type="text"
                                    {...register('honeypot')}
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                />

                                <div>
                                    <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('name')}
                                        className={`clay-input w-full text-sm sm:text-base ${errors.name ? 'border-red-500' : ''}`}
                                        placeholder="Your name"
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                    <AnimatePresence>
                                        {errors.name && (
                                            <motion.p
                                                id="name-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-red-500 text-xs sm:text-sm mt-1"
                                                role="alert"
                                            >
                                                {errors.name.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className={`clay-input w-full text-sm sm:text-base ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="your@email.com"
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                    <AnimatePresence>
                                        {errors.email && (
                                            <motion.p
                                                id="email-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-red-500 text-xs sm:text-sm mt-1"
                                                role="alert"
                                            >
                                                {errors.email.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                        Subject <span className="text-text-muted">(Optional)</span>
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        {...register('subject')}
                                        className="clay-input w-full text-sm sm:text-base"
                                        placeholder="Project inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        {...register('message')}
                                        className={`clay-input w-full h-28 sm:h-32 resize-none text-sm sm:text-base ${errors.message ? 'border-red-500' : ''}`}
                                        placeholder="Tell me about your project..."
                                        aria-invalid={errors.message ? 'true' : 'false'}
                                        aria-describedby={errors.message ? 'message-error' : undefined}
                                    />
                                    <AnimatePresence>
                                        {errors.message && (
                                            <motion.p
                                                id="message-error"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-red-500 text-xs sm:text-sm mt-1"
                                                role="alert"
                                            >
                                                {errors.message.message}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Submit error */}
                                <AnimatePresence>
                                    {submitError && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="text-red-500 text-center text-sm"
                                            role="alert"
                                        >
                                            {submitError}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    type="submit"
                                    className="clay-button w-full py-3 sm:py-4 text-base sm:text-lg font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            >
                                                ⏳
                                            </motion.span>
                                            Sending...
                                        </span>
                                    ) : isSubmitted ? (
                                        <span className="flex items-center justify-center gap-2 text-green-600">
                                            ✓ Message Sent!
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.4 }}
                            className="space-y-4 sm:space-y-6 md:space-y-8"
                        >
                            {/* Info cards */}
                            <div className="clay-card p-4 sm:p-5 md:p-6">
                                <h3 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Info</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-clay-primary/20 flex items-center justify-center text-lg sm:text-xl flex-shrink-0" aria-hidden="true">
                                            📧
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-text-muted text-xs sm:text-sm">Email</p>
                                            <a href="mailto:kazisohel199813@gmail.com" className="font-medium text-sm sm:text-base hover:text-clay-primary transition-colors break-all">
                                                kazisohel199813@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-clay-primary/20 flex items-center justify-center text-lg sm:text-xl flex-shrink-0" aria-hidden="true">
                                            💬
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-text-muted text-xs sm:text-sm">WhatsApp</p>
                                            <a href="https://wa.me/8801910865990" className="font-medium text-sm sm:text-base hover:text-clay-primary transition-colors">
                                                +8801910865990
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-clay-primary/20 flex items-center justify-center text-lg sm:text-xl flex-shrink-0" aria-hidden="true">
                                            🕐
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-text-muted text-xs sm:text-sm">Availability</p>
                                            <p className="font-medium text-sm sm:text-base">Open for freelance</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="clay-card p-4 sm:p-5 md:p-6">
                                <h3 className="font-display font-semibold text-base sm:text-lg mb-3 sm:mb-4">Connect With Me</h3>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="clay-card p-2.5 sm:p-3 md:p-4 flex items-center gap-2 sm:gap-3 hover:bg-clay-surface transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            aria-label={`Connect on ${social.name}`}
                                        >
                                            <span className="text-xl sm:text-2xl" aria-hidden="true">{social.icon}</span>
                                            <span className="font-medium text-xs sm:text-sm md:text-base">{social.name}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="clay-card p-4 sm:p-5 md:p-6 text-center">
                                <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">
                                    Looking for a full-time developer?
                                </p>
                                <motion.a
                                    href="/resume.pdf"
                                    download
                                    className="clay-button px-5 sm:px-6 py-2.5 sm:py-3 inline-block text-sm sm:text-base"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Download Resume
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                className="mt-12 sm:mt-16 md:mt-20 py-6 sm:py-8 border-t border-clay-shadow/20"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-text-muted text-xs sm:text-sm">
                        © {new Date().getFullYear()} Sohel Rana. Built with ❤️ using Next.js, Three.js & Framer Motion.
                    </p>
                </div>
            </motion.footer>
        </section>
    )
}
