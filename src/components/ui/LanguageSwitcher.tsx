'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
]

interface LanguageSwitcherProps {
    currentLocale?: string
    onLocaleChange?: (locale: string) => void
}

export default function LanguageSwitcher({ currentLocale = 'en', onLocaleChange }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)

    const currentLanguage = languages.find((l) => l.code === currentLocale) || languages[0]

    const handleLanguageChange = (code: string) => {
        onLocaleChange?.(code)
        setIsOpen(false)
        // In a real implementation, this would update the URL or cookie
        // and trigger a page reload or client-side navigation
        if (typeof window !== 'undefined') {
            document.cookie = `NEXT_LOCALE=${code};path=/;max-age=31536000`
            window.location.reload()
        }
    }

    return (
        <div className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="clay-button px-3 py-2 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-label="Select language"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="hidden sm:inline text-sm">{currentLanguage.name}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ▼
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 py-2 w-40 clay-card z-50"
                        role="listbox"
                    >
                        {languages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-clay-surface transition-colors ${lang.code === currentLocale ? 'bg-clay-surface' : ''
                                    }`}
                                whileHover={{ x: 4 }}
                                role="option"
                                aria-selected={lang.code === currentLocale}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="text-sm">{lang.name}</span>
                                {lang.code === currentLocale && (
                                    <span className="ml-auto text-clay-primary">✓</span>
                                )}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
        </div>
    )
}