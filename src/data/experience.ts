export interface Experience {
    id: number
    role: string
    company: string
    companyUrl?: string
    period: string
    description: string
    achievements: string[]
    color: string
    technologies?: string[]
    location?: string
    type?: 'full-time' | 'part-time' | 'contract' | 'freelance'
}

export const experiences: Experience[] = [
    {
        id: 1,
        role: 'Senior Full Stack Developer',
        company: 'Tech Company',
        companyUrl: 'https://techcompany.com',
        period: '2022 - Present',
        description: 'Leading development of scalable web applications, mentoring junior developers, and implementing best practices for code quality and performance.',
        achievements: [
            'Led migration to Next.js, improving performance by 40%',
            'Implemented CI/CD pipeline reducing deployment time by 60%',
            'Mentored team of 5 junior developers',
            'Architected microservices infrastructure handling 1M+ requests/day',
        ],
        color: '#e8b4b8',
        technologies: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
        location: 'Dhaka, Bangladesh',
        type: 'full-time',
    },
    {
        id: 2,
        role: 'Full Stack Developer',
        company: 'Startup Inc.',
        companyUrl: 'https://startupinc.com',
        period: '2020 - 2022',
        description: 'Developed and maintained multiple web applications, collaborated with design team on UI/UX, and integrated third-party APIs.',
        achievements: [
            'Built e-commerce platform serving 10K+ users',
            'Reduced API response time by 50%',
            'Implemented real-time features with WebSockets',
            'Led development of mobile-responsive redesign',
        ],
        color: '#a8dadc',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Socket.io'],
        location: 'Dhaka, Bangladesh',
        type: 'full-time',
    },
    {
        id: 3,
        role: 'Frontend Developer',
        company: 'Digital Agency',
        companyUrl: 'https://digitalagency.com',
        period: '2018 - 2020',
        description: 'Created responsive web interfaces, collaborated with clients on design requirements, and optimized website performance.',
        achievements: [
            'Delivered 20+ client projects on time',
            'Achieved 95% client satisfaction rate',
            'Introduced component-based architecture',
            'Reduced page load times by 60% through optimization',
        ],
        color: '#a7c4a0',
        technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'jQuery'],
        location: 'Dhaka, Bangladesh',
        type: 'full-time',
    },
    {
        id: 4,
        role: 'Junior Developer',
        company: 'Web Studio',
        companyUrl: 'https://webstudio.com',
        period: '2017 - 2018',
        description: 'Started career building websites and learning modern web technologies. Gained experience in frontend development and basic backend.',
        achievements: [
            'Learned React and Node.js',
            'Contributed to 15+ projects',
            'Earned promotion within 6 months',
            'Built first full-stack application',
        ],
        color: '#c9b1ff',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
        location: 'Dhaka, Bangladesh',
        type: 'full-time',
    },
]

export function getExperiences(): Experience[] {
    return experiences
}
