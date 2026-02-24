import emailjs from '@emailjs/browser'
import type { ContactFormData, EmailConfig } from '@/types/contact'

// EmailJS configuration
// To set up EmailJS:
// 1. Create an account at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Copy the service ID, template ID, and public key
// 5. Add them to your .env.local file

const getEmailConfig = (): EmailConfig => ({
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
})

export const isEmailConfigured = (): boolean => {
    const config = getEmailConfig()
    return !!(config.serviceId && config.templateId && config.publicKey)
}

export const sendEmail = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    // Check for honeypot spam protection
    if (data.honeypot) {
        // Silently fail for bots
        return { success: true, message: 'Message sent successfully!' }
    }

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
        return { success: false, message: 'Please fill in all required fields.' }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
        return { success: false, message: 'Please enter a valid email address.' }
    }

    // Check if EmailJS is configured
    if (!isEmailConfigured()) {
        // Simulate successful submission for demo
        console.log('EmailJS not configured. Simulating email send:', data)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        return { success: true, message: 'Message sent successfully! (Demo mode)' }
    }

    try {
        const config = getEmailConfig()

        // Initialize EmailJS
        emailjs.init(config.publicKey)

        // Send email
        const response = await emailjs.send(config.serviceId, config.templateId, {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject || 'New Contact Form Submission',
            message: data.message,
            to_name: 'Sohel Rana',
            reply_to: data.email,
        })

        if (response.status === 200) {
            return { success: true, message: 'Message sent successfully!' }
        } else {
            throw new Error('Failed to send message')
        }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, message: 'Failed to send message. Please try again later.' }
    }
}

// Alternative: Resend email service
export const sendEmailWithResend = async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    // Check for honeypot spam protection
    if (data.honeypot) {
        return { success: true, message: 'Message sent successfully!' }
    }

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        const result = await response.json()

        if (response.ok && result.success) {
            return { success: true, message: 'Message sent successfully!' }
        } else {
            return { success: false, message: result.message || 'Failed to send message.' }
        }
    } catch (error) {
        console.error('Email send error:', error)
        return { success: false, message: 'Failed to send message. Please try again later.' }
    }
}
