// Analytics utility for tracking events
// Supports both Google Analytics and Plausible

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
        plausible?: (event: string, options?: { props?: Record<string, string> }) => void
    }
}

type AnalyticsProvider = 'google' | 'plausible'

interface AnalyticsConfig {
    provider: AnalyticsProvider
    measurementId?: string
    domain?: string
}

// Get analytics configuration from environment
const getAnalyticsConfig = (): AnalyticsConfig => {
    const provider = (process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER as AnalyticsProvider) || 'google'
    return {
        provider,
        measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    }
}

// Check if analytics is configured
export const isAnalyticsConfigured = (): boolean => {
    const config = getAnalyticsConfig()
    if (config.provider === 'google') {
        return !!config.measurementId
    }
    return !!config.domain
}

// Track page view
export const trackPageView = (url: string, title?: string) => {
    const config = getAnalyticsConfig()

    if (typeof window === 'undefined') return

    if (config.provider === 'google' && window.gtag) {
        window.gtag('config', config.measurementId, {
            page_path: url,
            page_title: title,
        })
    } else if (config.provider === 'plausible' && window.plausible) {
        window.plausible('pageview', { props: { url, title: title || '' } })
    }
}

// Track custom event
export const trackEvent = (
    eventName: string,
    properties?: Record<string, string | number | boolean>
) => {
    const config = getAnalyticsConfig()

    if (typeof window === 'undefined') return

    if (config.provider === 'google' && window.gtag) {
        window.gtag('event', eventName, properties)
    } else if (config.provider === 'plausible' && window.plausible) {
        window.plausible(eventName, { props: properties as Record<string, string> })
    }
}

// Predefined events
export const analytics = {
    // Contact form events
    contactFormSubmit: () => trackEvent('contact_form_submit'),
    contactFormSuccess: () => trackEvent('contact_form_success'),
    contactFormError: (error: string) => trackEvent('contact_form_error', { error }),

    // Project events
    projectView: (slug: string) => trackEvent('project_view', { slug }),
    projectLinkClick: (slug: string, type: 'demo' | 'github') =>
        trackEvent('project_link_click', { slug, type }),

    // Blog events
    blogPostView: (slug: string) => trackEvent('blog_post_view', { slug }),
    blogShare: (slug: string, platform: string) =>
        trackEvent('blog_share', { slug, platform }),

    // Resume events
    resumeDownload: () => trackEvent('resume_download'),
    resumePrint: () => trackEvent('resume_print'),

    // Navigation events
    navigationClick: (section: string) => trackEvent('navigation_click', { section }),
    themeToggle: (theme: 'light' | 'dark') => trackEvent('theme_toggle', { theme }),

    // Social events
    socialLinkClick: (platform: string) => trackEvent('social_link_click', { platform }),
}

// Google Analytics Script Component (for use in layout)
export const GoogleAnalyticsScript = () => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

    if (!measurementId) return null

    return {
        __html: `
            <!-- Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${measurementId}', {
                    page_path: window.location.pathname,
                });
            </script>
        `,
    }
}

// Plausible Script Component (for use in layout)
export const PlausibleScript = () => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

    if (!domain) return null

    return {
        __html: `
            <!-- Plausible Analytics -->
            <script defer data-domain="${domain}" src="https://plausible.io/js/script.js"></script>
        `,
    }
}
