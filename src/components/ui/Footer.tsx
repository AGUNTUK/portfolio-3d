'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Footer() {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    return (
        <motion.footer
            ref={ref}
            className="py-6 sm:py-8 border-t border-clay-shadow/20 bg-background"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <p className="text-text-muted text-xs sm:text-sm">
                    © {new Date().getFullYear()} Sohel Rana. Built with ❤️ using Next.js, Three.js & Framer Motion.
                </p>
            </div>
        </motion.footer>
    )
}
