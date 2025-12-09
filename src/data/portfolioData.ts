// Portfolio Data Store - Centralized data management
// All portfolio content is stored here and can be edited via Admin Panel

export interface PortfolioProfile {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    profileImage: string;
    location: string;
    email: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
}

export interface Skill {
    title: string;
    icon: string;
    color: string;
    skills: string[];
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    period: string;
    description: string;
    highlights: string[];
}

export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    images: string[];
    githubUrl?: string;
    liveUrl?: string;
    highlights: string[];
}

export interface Achievement {
    id: string;
    icon: string;
    title: string;
    rank: string;
    subrank: string;
    description: string;
    color: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    link: string;
    skills: string[];
}

export interface Article {
    id: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    tags: string[];
    status: 'published' | 'coming-soon';
    url?: string;
}

export interface CVFile {
    id: string;
    name: string;
    label: string;
    url: string;
    isActive: boolean;
}

export interface PortfolioData {
    profile: PortfolioProfile;
    skills: Skill[];
    experiences: Experience[];
    projects: Project[];
    achievements: Achievement[];
    certifications: Certification[];
    articles: Article[];
    cvFiles: CVFile[];
}

// Default portfolio data based on your CV
export const defaultPortfolioData: PortfolioData = {
    profile: {
        name: 'Tharusha Thilakarathna',
        title: 'DevOps Engineer | Cloud & Automation',
        subtitle: 'Welcome to my portfolio',
        bio: `Passionate about building reliable, scalable cloud infrastructure and streamlining 
development workflows through CI/CD automation. I specialize in containerization, 
orchestration, and infrastructure as code to deliver robust DevOps solutions.`,
        profileImage: '/profile.png',
        location: 'Sri Lanka',
        email: 'tharusha@example.com',
        linkedin: 'Tharusha Thilakarathna',
        linkedinUrl: 'https://linkedin.com/in/tharusha-thilakarathna',
        github: '@tharusha-dev',
        githubUrl: 'https://github.com/tharusha-dev',
    },
    skills: [
        {
            title: 'DevOps & Cloud',
            icon: 'Cloud',
            color: 'from-blue-400 to-blue-600',
            skills: [
                'GitHub Actions',
                'Jenkins',
                'GitLab CI',
                'Docker',
                'Kubernetes',
                'Terraform',
                'Ansible',
                'AWS',
                'GCP',
                'Prometheus',
                'Datadog',
                'CloudWatch',
                'VPC',
            ],
        },
        {
            title: 'Programming & Scripting',
            icon: 'Code',
            color: 'from-green-400 to-emerald-600',
            skills: ['Python', 'Java', 'Bash', 'PowerShell'],
        },
        {
            title: 'Databases',
            icon: 'Database',
            color: 'from-purple-400 to-purple-600',
            skills: ['MySQL', 'PostgreSQL', 'MSSQL', 'PL/SQL'],
        },
        {
            title: 'Platforms & Tools',
            icon: 'Wrench',
            color: 'from-orange-400 to-red-600',
            skills: ['Git', 'GitHub', 'Jira', 'Linux', 'Windows'],
        },
    ],
    experiences: [
        {
            id: '1',
            title: 'Software Engineer Intern',
            company: 'Zebra Technologies',
            location: 'Remote',
            period: 'February 2025 – August 2025',
            description: 'Enhancing development workflows and cloud infrastructure',
            highlights: [
                'Designed and implemented CI/CD pipelines using GitHub Actions and Jenkins, reducing deployment time by 40%',
                'Containerized legacy applications with Docker and orchestrated deployments using Kubernetes',
                'Led the migration from MSSQL to PostgreSQL, ensuring zero downtime and data integrity',
                'Troubleshot and optimized self-hosted GitHub Actions runners, improving build performance',
                'Implemented infrastructure as code using Terraform for AWS cloud resources',
                'Set up comprehensive monitoring and alerting with Prometheus and CloudWatch',
            ],
        },
    ],
    projects: [
        {
            id: '1',
            title: 'Scalable Cloud Analytics Platform for Healthcare IoT Data',
            shortDescription: 'Big data processing and ML workflows on GCP',
            fullDescription: `A comprehensive cloud-based analytics platform designed to process and analyze massive volumes of IoT healthcare data in real-time. 

This project leverages Google Cloud Platform's powerful big data services to create a scalable, fault-tolerant system capable of handling millions of data points from medical devices and wearables.

The platform implements advanced data processing pipelines using Apache Spark on Dataproc, enabling real-time analytics and predictive modeling for patient monitoring and early disease detection.`,
            technologies: [
                'GCP',
                'Dataproc',
                'Apache Spark',
                'PySpark',
                'BigQuery',
                'Cloud Storage',
                'Pub/Sub',
                'Python',
                'Machine Learning',
                'IoT',
            ],
            images: [
                'https://images.unsplash.com/photo-1641757625075-d018760a4fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
            ],
            highlights: [
                'Processed over 10 million IoT data points daily with 99.9% uptime',
                'Implemented real-time data streaming pipelines using GCP Pub/Sub',
                'Developed ML models for predictive health analytics with 92% accuracy',
                'Reduced data processing costs by 35% through optimized Spark jobs',
                'Created interactive dashboards for healthcare professionals using BigQuery',
                'Implemented data privacy compliance with HIPAA standards',
                'Automated infrastructure deployment using Terraform',
            ],
        },
        {
            id: '2',
            title: 'Exam Registration System – Cloud Validation',
            shortDescription: 'AWS-powered registration system with automated testing',
            fullDescription: `A robust, cloud-native exam registration system built on AWS infrastructure with comprehensive automated testing and validation.

The system handles student registration, exam scheduling, and result management with high availability and security. Implemented CI/CD pipelines for continuous deployment and automated testing using Selenium.

Features include real-time availability checking, automated email notifications, and secure payment processing integration.`,
            technologies: [
                'AWS',
                'EC2',
                'RDS',
                'S3',
                'Lambda',
                '.NET Core',
                'C#',
                'Selenium',
                'PostgreSQL',
                'Docker',
                'GitHub Actions',
            ],
            images: [
                'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
            ],
            githubUrl: '#',
            highlights: [
                'Deployed on AWS EC2 with auto-scaling for handling peak registration periods',
                'Implemented automated end-to-end testing with Selenium, reducing manual testing by 80%',
                'Integrated AWS Lambda for serverless email notifications',
                'Secured user data with AWS RDS encryption and VPC isolation',
                'Achieved 99.99% uptime during critical registration windows',
                'Implemented CI/CD pipeline with automated deployments and rollback capabilities',
                'Reduced registration processing time from 5 minutes to under 30 seconds',
            ],
        },
    ],
    achievements: [
        {
            id: '1',
            icon: 'Trophy',
            title: 'IEEE Xtreme 18.0',
            rank: 'Global Rank 109',
            subrank: 'Sri Lanka Rank 6',
            description: "Competed in the world's premier programming competition",
            color: 'from-yellow-400 to-orange-500',
        },
        {
            id: '2',
            icon: 'Award',
            title: 'Agni Xtreme Champions',
            rank: 'Championship Winner',
            subrank: 'Team Competition',
            description: 'Led team to victory in competitive programming challenge',
            color: 'from-blue-400 to-blue-600',
        },
        {
            id: '3',
            icon: 'Medal',
            title: 'ACES Coders V11.0',
            rank: 'Top 10 in Sri Lanka',
            subrank: 'National Level',
            description: 'Excelled in algorithm design and problem solving',
            color: 'from-green-400 to-emerald-600',
        },
        {
            id: '4',
            icon: 'Star',
            title: 'Huawei ICT Competition',
            rank: 'Top 10',
            subrank: 'Cloud & Network Track',
            description: 'Demonstrated expertise in cloud technologies and networking',
            color: 'from-purple-400 to-purple-600',
        },
    ],
    certifications: [
        {
            id: '1',
            title: 'Infrastructure as Code',
            issuer: 'Cloud Academy / Industry Certification',
            date: '2024',
            link: '#',
            skills: ['Terraform', 'CloudFormation', 'IaC Best Practices'],
        },
        {
            id: '2',
            title: 'DevOps Professional',
            issuer: 'PagerDuty',
            date: '2024',
            link: '#',
            skills: ['Incident Management', 'On-Call Practices', 'DevOps Culture'],
        },
        {
            id: '3',
            title: 'Docker Foundations',
            issuer: 'Docker',
            date: '2024',
            link: '#',
            skills: ['Containerization', 'Docker Compose', 'Image Optimization'],
        },
        {
            id: '4',
            title: 'Kubernetes Microservices',
            issuer: 'Cloud Native Computing Foundation',
            date: '2024',
            link: '#',
            skills: ['K8s Orchestration', 'Service Mesh', 'Container Networking'],
        },
        {
            id: '5',
            title: 'GitHub Foundations',
            issuer: 'GitHub',
            date: '2024',
            link: '#',
            skills: ['Version Control', 'Collaboration', 'Git Best Practices'],
        },
        {
            id: '6',
            title: 'GitHub Actions',
            issuer: 'GitHub',
            date: '2024',
            link: '#',
            skills: ['CI/CD', 'Workflow Automation', 'GitHub Actions'],
        },
    ],
    articles: [
        {
            id: '1',
            title: 'Building Scalable CI/CD Pipelines with GitHub Actions',
            description:
                'A comprehensive guide to designing and implementing robust CI/CD workflows for modern cloud applications.',
            date: 'Coming Soon',
            readTime: '8 min read',
            tags: ['DevOps', 'CI/CD', 'GitHub Actions'],
            status: 'coming-soon',
        },
        {
            id: '2',
            title: 'Kubernetes Best Practices for Production Workloads',
            description:
                'Learn how to optimize Kubernetes deployments for security, scalability, and reliability in production environments.',
            date: 'Coming Soon',
            readTime: '10 min read',
            tags: ['Kubernetes', 'DevOps', 'Cloud'],
            status: 'coming-soon',
        },
        {
            id: '3',
            title: 'Infrastructure as Code: Terraform vs CloudFormation',
            description:
                'An in-depth comparison of popular IaC tools and when to use each for your cloud infrastructure.',
            date: 'Coming Soon',
            readTime: '12 min read',
            tags: ['IaC', 'Terraform', 'AWS'],
            status: 'coming-soon',
        },
    ],
    cvFiles: [
        {
            id: '1',
            name: 'M.K.T.S.THILAKARATHNA-CV.pdf',
            label: 'Main CV',
            url: '/M.K.T.S.THILAKARATHNA-CV.pdf',
            isActive: true,
        },
    ],
};

// Storage key for localStorage
const STORAGE_KEY = 'portfolio_data';

// Load data from localStorage or use defaults
export function loadPortfolioData(): PortfolioData {
    if (typeof window === 'undefined') return defaultPortfolioData;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
    return defaultPortfolioData;
}

// Save data to localStorage
export function savePortfolioData(data: PortfolioData): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving portfolio data:', error);
    }
}

// Generate unique ID
export function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
