import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Footer from '@/components/ui/Footer'
import CursorEffect from '@/components/ui/CursorEffect'
import './globals.css'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-space-grotesk',
    display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sohelrana.dev'

export const viewport: Viewport = {
    themeColor: '#0d0d14',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
}

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Sohel Rana | Full Stack Web Developer & Designer',
        template: '%s | Sohel Rana',
    },
    description: 'Full Stack Web Developer and Designer specializing in modern, fast, and user-friendly web experiences. Explore my interactive 3D portfolio featuring projects in Next.js, React, TypeScript, and more.',
    keywords: [
        'Sohel Rana',
        'Full Stack Developer',
        'Web Developer',
        'Web Designer',
        'Frontend Developer',
        'Backend Developer',
        'React Developer',
        'Next.js Developer',
        'TypeScript',
        'JavaScript',
        'Node.js',
        '3D Web',
        'Three.js',
        'UI/UX Design',
        'Portfolio',
    ],
    authors: [{ name: 'Sohel Rana', url: siteUrl }],
    creator: 'Sohel Rana',
    publisher: 'Sohel Rana',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: 'Sohel Rana Portfolio',
        title: 'Sohel Rana | Full Stack Web Developer & Designer',
        description: 'Full Stack Web Developer and Designer specializing in modern, fast, and user-friendly web experiences. Explore my interactive 3D portfolio.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Sohel Rana - Full Stack Web Developer & Designer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sohel Rana | Full Stack Web Developer & Designer',
        description: 'Full Stack Web Developer and Designer specializing in modern, fast, and user-friendly web experiences.',
        images: ['/og-image.png'],
        creator: '@sohelrana',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: siteUrl,
    },
    category: 'technology',
}

// JSON-LD Structured Data
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sohel Rana',
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    jobTitle: 'Full Stack Web Developer',
    description: 'Full Stack Web Developer and Designer specializing in modern, fast, and user-friendly web experiences.',
    sameAs: [
        'https://github.com/sohelrana',
        'https://linkedin.com/in/sohelrana',
        'https://twitter.com/sohelrana',
    ],
    knowsAbout: [
        'Web Development',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Three.js',
        'UI/UX Design',
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
                <CursorEffect />
                {children}
                <Footer />
            </body>
        </html>
    )
}