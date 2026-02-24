import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Claymorphism Color Palette
                clay: {
                    bg: 'var(--clay-bg)',
                    surface: 'var(--clay-surface)',
                    primary: 'var(--clay-primary)',
                    secondary: 'var(--clay-secondary)',
                    accent: 'var(--clay-accent)',
                    highlight: 'var(--clay-highlight)',
                    shadow: 'var(--clay-shadow)',
                    // Dark mode variants
                    'dark-bg': 'var(--clay-dark-bg)',
                    'dark-surface': 'var(--clay-dark-surface)',
                },
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-slower': 'float 10s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
                'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(201, 173, 167, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(201, 173, 167, 0.6)' },
                },
                'bounce-subtle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            boxShadow: {
                'clay': '20px 20px 60px var(--clay-shadow), -20px -20px 60px var(--clay-highlight)',
                'clay-sm': '10px 10px 30px var(--clay-shadow), -10px -10px 30px var(--clay-highlight)',
                'clay-lg': '30px 30px 80px var(--clay-shadow), -30px -30px 80px var(--clay-highlight)',
                'clay-inset': 'inset 2px 2px 4px rgba(255, 255, 255, 0.5), inset -2px -2px 4px rgba(0, 0, 0, 0.05)',
                'clay-dark': '20px 20px 60px rgba(0, 0, 0, 0.4), -20px -20px 60px rgba(255, 255, 255, 0.05)',
            },
            borderRadius: {
                'clay': '30px',
                'clay-sm': '20px',
                'clay-lg': '40px',
            },
            backgroundImage: {
                'clay-gradient': 'linear-gradient(145deg, var(--clay-surface), var(--clay-bg))',
                'clay-primary-gradient': 'linear-gradient(145deg, var(--clay-primary), #b89b95)',
            },
        },
    },
    plugins: [],
}

export default config
