import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'bn'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
    en: 'English',
    bn: 'বাংলা',
}

export default getRequestConfig(async () => {
    return {
        messages: {
            en: (await import('./locales/en.json')).default,
            bn: (await import('./locales/bn.json')).default,
        },
    }
})
