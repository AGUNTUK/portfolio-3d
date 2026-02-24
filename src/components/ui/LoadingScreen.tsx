'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoadingStore } from '@/store/useStore'

export default function LoadingScreen() {
    const { isLoading, loadingProgress, setLoading } = useLoadingStore()
    const [showWelcome, setShowWelcome] = useState(false)

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            const currentProgress = useLoadingStore.getState().loadingProgress
            if (currentProgress < 100) {
                useLoadingStore.getState().setLoadingProgress(Math.min(currentProgress + 10, 100))
            }
        }, 200)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (loadingProgress >= 100) {
            setShowWelcome(true)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }, [loadingProgress, setLoading])

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="loading-screen"
                >
                    {/* Cinematic vignette */}
                    <div className="vignette" />

                    {/* Animated background orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            className="clay-orb absolute w-96 h-96 -top-40 -left-40 opacity-20"
                            animate={{
                                rotate: 360,
                                scale: [1, 1.2, 1],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="clay-orb absolute w-72 h-72 top-1/3 -right-20 opacity-15"
                            animate={{
                                rotate: -360,
                                scale: [1, 1.3, 1],
                            }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="clay-orb absolute w-56 h-56 bottom-20 left-1/4 opacity-10"
                            animate={{
                                rotate: 360,
                                y: [-20, 20, -20],
                            }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Loading content */}
                    <div className="relative z-10 flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            {!showWelcome ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center"
                                >
                                    {/* Cinematic Logo/Name */}
                                    <motion.div className="relative mb-12">
                                        <motion.h1
                                            className="text-5xl md:text-7xl font-display font-bold text-gradient tracking-wider"
                                            animate={{
                                                textShadow: [
                                                    "0 0 20px rgba(99, 102, 241, 0.3)",
                                                    "0 0 40px rgba(99, 102, 241, 0.5)",
                                                    "0 0 20px rgba(99, 102, 241, 0.3)",
                                                ]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            SOHEL RANA
                                        </motion.h1>
                                        <motion.div
                                            className="absolute -inset-4 bg-gradient-to-r from-indigo-500/0 via-indigo-500/20 to-purple-500/0 blur-2xl"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        />
                                    </motion.div>

                                    {/* Cinematic progress bar */}
                                    <div className="relative w-72 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${loadingProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-sm"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${loadingProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    {/* Progress text */}
                                    <motion.p
                                        className="mt-6 text-white/60 font-light tracking-[0.3em] text-sm uppercase"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {loadingProgress}% Loading
                                    </motion.p>

                                    {/* Cinematic loading indicator */}
                                    <div className="flex gap-3 mt-8">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 h-8 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-full"
                                                animate={{
                                                    scaleY: [0.3, 1, 0.3],
                                                    opacity: [0.3, 1, 0.3],
                                                }}
                                                transition={{
                                                    duration: 1.2,
                                                    repeat: Infinity,
                                                    delay: i * 0.15,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="welcome"
                                    initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-center"
                                >
                                    <motion.div className="relative">
                                        <motion.h2
                                            className="text-4xl md:text-6xl font-display font-bold text-gradient tracking-[0.2em]"
                                            animate={{
                                                scale: [1, 1.02, 1],
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            WELCOME
                                        </motion.h2>
                                        <motion.div
                                            className="absolute -inset-8 bg-gradient-to-r from-indigo-500/0 via-purple-500/30 to-pink-500/0 blur-3xl"
                                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.div>
                                    <motion.p
                                        className="mt-6 text-white/50 tracking-[0.2em] text-sm uppercase font-light"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        Enter the experience
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cinematic scroll indicator */}
                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
                        >
                            <motion.div
                                className="w-1 h-2 bg-white/50 rounded-full"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </motion.div>
                        <p className="text-white/30 text-xs tracking-[0.3em] uppercase">
                            Scroll
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
