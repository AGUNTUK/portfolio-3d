'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollStore } from '@/store/useStore'

const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { section, setSection } = useScrollStore()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false)
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setSection(navItems.findIndex((item) => item.id === sectionId))
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-2 sm:py-3' : 'py-3 sm:py-4 md:py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-0.5 sm:gap-1">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`nav-link text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-1.5 sm:py-2 ${section === index ? 'text-clay-primary' : 'text-text-secondary'
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden clay-button px-3 py-2.5 absolute right-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-30 bg-black/50 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-x-0 top-14 sm:top-16 z-40 glass md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
                        >
                            <div className="px-4 py-4 sm:py-6 space-y-1.5 sm:space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`block w-full text-left px-4 py-3 sm:py-3.5 rounded-clay-sm transition-colors text-sm sm:text-base ${section === index
                                            ? 'bg-clay-primary text-white'
                                            : 'text-text-secondary hover:bg-clay-surface'
                                            }`}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
