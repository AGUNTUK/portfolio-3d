export interface Testimonial {
    id: number
    name: string
    role: string
    company: string
    image: string
    content: string
    rating: number
    project?: string
    color: string
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'John Smith',
        role: 'CEO',
        company: 'TechStart Inc.',
        image: '/images/testimonials/john.jpg',
        content: 'Sohel delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and efficient.',
        rating: 5,
        project: 'Hodo E-commerce',
        color: '#e8b4b8',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'BookingHub',
        image: '/images/testimonials/sarah.jpg',
        content: 'Working with Sohel was a pleasure. He understood our requirements perfectly and delivered a booking platform that our users love. Highly recommended!',
        rating: 5,
        project: 'Restiqo',
        color: '#a8dadc',
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Founder',
        company: 'JobFinder',
        image: '/images/testimonials/michael.jpg',
        content: 'Sohel\'s technical skills are matched by his communication abilities. He kept us updated throughout the project and delivered on time with excellent quality.',
        rating: 5,
        project: 'Joborafy',
        color: '#a7c4a0',
    },
    {
        id: 4,
        name: 'Emily Davis',
        role: 'Marketing Director',
        company: 'BrandCo',
        image: '/images/testimonials/emily.jpg',
        content: 'The website Sohel created for our agency perfectly captures our brand identity. His design sense and technical implementation are top-notch.',
        rating: 5,
        project: 'Onlinekorun',
        color: '#c9b1ff',
    },
    {
        id: 5,
        name: 'David Wilson',
        role: 'CTO',
        company: 'AI Solutions',
        image: '/images/testimonials/david.jpg',
        content: 'Sohel\'s work on our AI website builder was impressive. He integrated complex AI features seamlessly while maintaining excellent user experience.',
        rating: 5,
        project: 'Stackry',
        color: '#f4a261',
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        role: 'Owner',
        company: 'Velora Fashion',
        image: '/images/testimonials/lisa.jpg',
        content: 'Our online store has never looked better. Sohel created a beautiful, functional e-commerce platform that has significantly improved our sales.',
        rating: 5,
        project: 'Velora4You',
        color: '#9a8c98',
    },
]

export function getTestimonials(): Testimonial[] {
    return testimonials
}
