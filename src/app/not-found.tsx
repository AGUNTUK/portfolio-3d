'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="clay-orb absolute w-96 h-96 -top-48 -right-48 opacity-20 animate-float" />
                <div className="clay-orb absolute w-64 h-64 bottom-20 -left-32 opacity-15 animate-float-slow" />
                <div className="clay-orb absolute w-48 h-48 top-1/3 right-1/4 opacity-10 animate-float-slower" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
                {/* 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <span className="text-9xl md:text-[12rem] font-display font-bold text-gradient">
                        404
                    </span>
                </motion.div>

                {/* Broken orb illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className="relative w-32 h-32 mx-auto">
                        <div className="clay-orb w-full h-full animate-float opacity-50" />
                        <motion.div
                            className="absolute top-0 right-0 w-8 h-8 clay-orb opacity-30"
                            animate={{
                                x: [0, 20, 0],
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-6 h-6 clay-orb opacity-30"
                            animate={{
                                x: [0, -15, 0],
                                y: [0, 15, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </div>
                </motion.div>

                {/* Message */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-display font-bold mb-4"
                >
                    <span className="text-gradient">Page Not Found</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-text-secondary mb-8"
                >
                    Oops! The page you're looking for seems to have drifted into another dimension.
                    <br />
                    Let's get you back on track.
                </motion.p>

                {/* Navigation buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link href="/">
                        <motion.button
                            className="clay-button text-lg px-8 py-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🏠 Back to Home
                        </motion.button>
                    </Link>
                    <Link href="/#projects">
                        <motion.button
                            className="clay-button-secondary text-lg px-8 py-4"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            🚀 View Projects
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Quick links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-clay-primary/20"
                >
                    <p className="text-text-muted mb-4">Or try these popular sections:</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {[
                            { href: '/#about', label: 'About' },
                            { href: '/#skills', label: 'Skills' },
                            { href: '/#experience', label: 'Experience' },
                            { href: '/#contact', label: 'Contact' },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-clay-primary hover:text-accent-purple transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
