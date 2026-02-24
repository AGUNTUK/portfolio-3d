'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
    children: React.ReactNode
}

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.61, 1, 0.88, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: [0.61, 1, 0.88, 1],
        },
    },
}

export default function PageTransition({ children }: PageTransitionProps) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial="initial"
                animate="enter"
                exit="exit"
                variants={pageVariants}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

// Section transition wrapper
export function SectionTransition({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.61, 1, 0.88, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Stagger children animation
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
}: {
    children: React.ReactNode
    className?: string
    staggerDelay?: number
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export function StaggerItem({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.61, 1, 0.88, 1],
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}