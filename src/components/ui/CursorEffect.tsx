'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function CursorEffect() {
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [cursorText, setCursorText] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    // Mouse position with motion values
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    // Spring animation for smooth following
    const springConfig = { damping: 25, stiffness: 300 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    // Outer ring follows with more delay
    const outerSpringConfig = { damping: 30, stiffness: 200 }
    const outerXSpring = useSpring(cursorX, outerSpringConfig)
    const outerYSpring = useSpring(cursorY, outerSpringConfig)

    // Spotlight position
    const spotlightX = useTransform(cursorXSpring, (x) => x)
    const spotlightY = useTransform(cursorYSpring, (y) => y)

    useEffect(() => {
        // Check if device supports hover (not touch device)
        const hasHover = window.matchMedia('(hover: hover)').matches
        if (!hasHover) return

        setIsVisible(true)

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseDown = () => setIsClicking(true)
        const handleMouseUp = () => setIsClicking(false)

        const handleMouseEnter = (e: Event) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button' ||
                target.style.cursor === 'pointer'
            ) {
                setIsHovering(true)
                // Check for data-cursor-text attribute
                const cursorTextAttr = target.getAttribute('data-cursor-text') ||
                    target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
                if (cursorTextAttr) {
                    setCursorText(cursorTextAttr)
                }
            }
        }

        const handleMouseLeave = () => {
            setIsHovering(false)
            setCursorText('')
        }

        // Add event listeners
        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)

        // Add hover detection to all interactive elements
        const addListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], [style*="cursor: pointer"]')
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleMouseEnter as EventListener)
                el.addEventListener('mouseleave', handleMouseLeave as EventListener)
            })
        }

        addListeners()

        // Observer for dynamically added elements
        const observer = new MutationObserver(() => {
            addListeners()
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            observer.disconnect()
        }
    }, [cursorX, cursorY])

    if (!isVisible) return null

    return (
        <>
            {/* Spotlight effect */}
            <motion.div
                className="fixed pointer-events-none z-[9998]"
                style={{
                    left: spotlightX,
                    top: spotlightY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="w-[400px] h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
                        filter: 'blur(2px)',
                    }}
                    animate={{
                        scale: isHovering ? 0 : 1,
                        opacity: isHovering ? 0 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>

            {/* Outer ring - follows with delay */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: outerXSpring,
                    top: outerYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full border-2 border-white"
                    animate={{
                        width: isHovering ? 60 : isClicking ? 20 : 40,
                        height: isHovering ? 60 : isClicking ? 20 : 40,
                        opacity: isHovering ? 0.8 : 0.5,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                />
            </motion.div>

            {/* Inner dot - follows immediately */}
            <motion.div
                className="fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: cursorXSpring,
                    top: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    className="rounded-full bg-white"
                    animate={{
                        width: isHovering ? 8 : isClicking ? 4 : 6,
                        height: isHovering ? 8 : isClicking ? 4 : 6,
                        opacity: isHovering ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>

            {/* Cursor text for special hover states */}
            {cursorText && (
                <motion.div
                    className="fixed pointer-events-none z-[9999] text-white text-xs font-medium px-2 py-1 rounded-full bg-black/80"
                    style={{
                        left: cursorXSpring,
                        top: cursorYSpring,
                        translateX: '50%',
                        translateY: '50%',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                >
                    {cursorText}
                </motion.div>
            )}
        </>
    )
}
