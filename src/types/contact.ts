export interface ContactFormData {
    name: string
    email: string
    subject?: string
    message: string
    honeypot?: string // Spam protection
}

export interface ContactFormState {
    isSubmitting: boolean
    isSubmitted: boolean
    error: string | null
}

export interface EmailConfig {
    serviceId: string
    templateId: string
    publicKey: string
}
