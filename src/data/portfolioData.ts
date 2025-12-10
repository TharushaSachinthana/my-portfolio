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

export interface AboutSection {
    educationTitle: string;
    educationDescription: string;
    professionalTitle: string;
    professionalDescription: string;
    closingStatement: string;
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
    coverImage?: string;
    githubUrl?: string;
    liveUrl?: string;
    documentationUrl?: string;
    reportUrl?: string;
    videoUrl?: string;
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
    coverImage?: string;
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
    about: AboutSection;
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
        location: 'Chilaw, Sri Lanka',
        email: 'thilakarathna.mkts@gmail.com',
        linkedin: 'Tharusha Sachinthana',
        linkedinUrl: 'https://www.linkedin.com/in/tharusha-sachinthana-150773264/',
        github: 'TharushaSachinthana',
        githubUrl: 'https://github.com/TharushaSachinthana',
    },
    about: {
        educationTitle: 'Education & Background',
        educationDescription: `I'm currently pursuing my degree in Computer Engineering at 
the University of Jaffna, where I've developed a strong 
foundation in software engineering, cloud computing, and DevOps practices.`,
        professionalTitle: 'Professional Experience',
        professionalDescription: `I'm currently working as a Software Engineer Intern at 
Zebra Technologies, where I've gained hands-on experience 
in building and optimizing CI/CD pipelines, containerizing applications with Docker, and managing 
cloud infrastructure.`,
        closingStatement: `Through competitive programming and industry experience, I've developed strong problem-solving 
skills and a deep understanding of software development best practices. I'm committed to continuous 
learning and staying updated with the latest DevOps tools and cloud technologies.`,
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
        {
            title: 'Data Engineering',
            icon: 'Code',
            color: 'from-gray-400 to-gray-600',
            skills: [
                'Apache Spark',
                'HDFS',
                'Big Data Analytics',
                'Distributed computing',
                'Google dataproc',
                'BigQuery',
            ],
        },
    ],
    experiences: [
        {
            id: '1',
            title: 'Software Engineer Intern',
            company: 'Zebra Technologies',
            location: 'Nawala, Srilanaka - hybrid',
            period: 'February 2025 – August 2025',
            description: 'Delivered CI/CD and deployment automation that boosted release speed',
            highlights: [
                'Performed a full database migration from Microsoft SQL Server to PostgreSQL, ensuring all table data and constraints were preserved without conflicts. Implemented ORM-based access for improved security and maintainability.',
                'Designed and implemented full integration test coverage for a large-scale .NET C# application, improving code reliability and reducing manual QA time.',
                'Built and maintained a fully automated CI/CD pipeline in GitHub Actions, integrating build, test, and deployment stages.',
                'Configured and optimized self-hosted runners on on-premises Windows and Ubuntu servers, enabling faster, secure builds.',
                'Automated deployments by pushing Docker images to JFrog Artifactory upon successful test completion.',
                'Developed a version-check job to automatically detect new Docker image versions in Artifactory, compare them with docker-compose configurations, and update running services without downtime.',
                'Improved deployment efficiency and reduced release time from hours to minutes through automation and containerization best practices.',
            ],
        },
    ],
    projects: [
        {
            id: '1',
            title: 'Scalable Distributed Machine Learning Framework for Healthcare IoT Analytics',
            shortDescription:
                'Architected and deployed a fault-tolerant, distributed big data pipeline on Google Cloud Platform (Dataproc) to process massive-scale ECG sensor data. Engineered a solution that benchmarked horizontal vs. vertical scaling, successfully overcoming "Out-of-Memory" bottlenecks inherent in single-node architectures processing 11M+ records.',
            fullDescription: `This research project addressed the critical challenge of processing high-velocity, high-volume IoT data in the healthcare sector, specifically for cardiac arrhythmia detection. Traditional single-node processing methods fail under the load of massive datasets, leading to system crashes and latency that is unacceptable for clinical monitoring.

I designed and implemented an end-to-end distributed analytics pipeline using Apache Spark on Google Cloud Dataproc. The project involved a rigorous performance benchmark comparing a distributed cluster against powerful standalone servers using the 11-million-row HIGGS dataset and complex binary ECG data.

Key Engineering Challenges Solved:

Memory Pressure: Empirically proved that single-node architectures (even with standard resources) fail with SIGKILL (Out-of-Memory) errors when processing gigabyte-scale datasets, necessitating a distributed approach.

Data Ingestion Bottlenecks: Overcame network timeouts and disk space limitations in the cloud environment by implementing a data staging architecture—streaming compressed data to ephemeral VMs for decompression before ingesting into a Google Cloud Storage data lake.

Parallel Read Optimization: Diagnosed and resolved EOFException errors caused by non-splittable Gzip files by re-engineering the ingestion pipeline to use splittable raw CSV formats, enabling true parallel reading across worker nodes.

The final results demonstrated that while vertical scaling offers raw speed for communication-heavy training tasks, the distributed cluster provided a 30% improvement in inference speed and was the only architecture capable of reliably handling the full dataset workload without failure.`,
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
                'Hadoop',
            ],
            images: [
                'https://images.unsplash.com/photo-1641757625075-d018760a4fb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
            ],
            highlights: [
                'Architected a Multi-Node Cluster: Provisioned and configured a 5-node Spark cluster managed by YARN, automating setup via initialization scripts to pre-install dependencies (wfdb, neurokit2).',
                'Solved "Impossible" Workloads: Demonstrated that a distributed architecture could successfully process workloads that caused immediate OOM crashes on standalone servers with identical per-node specs.',
                '30% Faster Inference: Achieved a 30.6% reduction in prediction latency using the distributed cluster compared to a vertically scaled server, validating the architecture for real-time monitoring use cases.',
                'Infrastructure Troubleshooting: Successfully diagnosed and resolved complex distributed system errors including java.io.EOFException (split capabilities), RateLimitExceeded (API quotas), and SIGKILL (memory leaks).',
                'Optimized Data Pipeline: Implemented a robust "staging" pattern for data ingestion, bypassing cluster network restrictions and local disk limits to securely onboard multi-gigabyte datasets.',
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
            subrank: 'Network Track',
            description: 'Demonstrated expertise in cloud technologies and networking',
            color: 'from-purple-400 to-purple-600',
        },
    ],
    certifications: [
        {
            id: '1',
            title: 'DevOps Foundations: Infrastructure as Code',
            issuer: 'Linkedin',
            date: '2025 August',
            link: 'https://www.linkedin.com/learning/certificates/66c2d2991f146c9aa864e3841aace4f1fe8eb0962358e0ee42b9d53b1760e8a0?accountId=0&u=0&success=true&authUUID=3MFDpLJiTDmPn3TC8ULT6A%3D%3D',
            skills: ['IaC Best Practices', 'Infrastructure as code (IaC)'],
        },
        {
            id: '2',
            title: 'DevOps Professional Certificate by PagerDuty and LinkedIn',
            issuer: 'PagerDuty',
            date: '2025 October',
            link: 'https://www.linkedin.com/learning/certificates/b658472806eeef3d4b5c4df319a170df51805ade8553f5f5a18a0a4d5a96ec22?accountId=0&u=0&success=true&authUUID=IGpQDRmoSRmk1046PPsRwQ%3D%3D',
            skills: ['DevOps Culture', 'DevOps', 'Continuous Integration and Continuous Delivery (CI/CD)'],
        },
        {
            id: '3',
            title: 'DevOps Foundations: Continuous Delivery/Continuous Integration',
            issuer: 'CompTIA',
            date: '2025 October',
            link: 'https://www.linkedin.com/learning/certificates/dbb02aa5eebd92dbfa435b83f1da4f5635bbdd5a9d5c27a3c890620589b8c778?trk=share_certificate&accountId=0&u=0&success=true&authUUID=iqmEBrMLQmOxxYXLM0JFdw%3D%3D',
            skills: ['Containerization', 'Docker Compose'],
        },
        {
            id: '4',
            title: 'Docker Foundations Professional Certificate',
            issuer: 'Docker',
            date: '2025 May',
            link: 'https://www.linkedin.com/learning/certificates/157aff5f98395837f28c178d625d12c04e2198db7657741a168cbf93110ceaa4?accountId=0&u=0&success=true&authUUID=QGEO0LPMSmaboNWInv8JJg%3D%3D',
            skills: ['Docker Products', 'Containerization'],
        },
        {
            id: '5',
            title: 'GitHub Foundations',
            issuer: 'GitHub',
            date: '2024 December',
            link: 'https://www.credly.com/badges/08577727-5cc1-400f-9c27-9a366267ce6d/public_url',
            skills: ['Version Control', 'Collaboration', 'Git Best Practices'],
        },
        {
            id: '6',
            title: 'GitHub Actions',
            issuer: 'GitHub',
            date: '2024 July',
            link: 'https://www.credly.com/badges/5f207d4d-afbf-4a6b-80ce-c6cf8ef715e2/public_url',
            skills: ['CI/CD', 'Workflow Automation', 'GitHub Actions'],
        },
        {
            id: '7',
            title: 'Kubernetes: Microservices',
            issuer: 'Kim Schlesinger',
            date: '2024 April',
            link: 'https://www.linkedin.com/learning/certificates/94c58fb4f701b56250f76c6cd3ad3fc59448598dacb37c422f127336ab0f71ac?accountId=0&u=0&success=true&authUUID=5%2BGUuAWFQIuXqOW19w9IPA%3D%3D',
            skills: ['Kubernetes'],
        },
    ],
    articles: [
        {
            id: '1',
            title: 'Unraveling Docker Networking: A Deep Dive into Its Core Mechanics',
            description:
                'A clear, practical breakdown of how Docker networking works—from bridge and host networks to overlays and macvlan—plus real-world insights into Linux, macOS, and Windows differences to help engineers build reliable, scalable container communication.',
            date: '2 JUNE 2025',
            readTime: '12 min read',
            tags: [
                'DevOps',
                'Docker Networking',
                'Container Architecture',
                'Network Namespaces',
                'Bridge & Host Networks',
            ],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/unraveling-docker-networking-deep-dive-its-core-tharusha-sachinthana-3h5uc/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '2',
            title: 'GitHub Runners Unveiled: The Engine Behind CI/CD',
            description:
                'A foundational look at how GitHub Runners work—covering their lifecycle, cold-start behavior, hidden performance tricks, and why they\'re the core automation engine behind every CI/CD workflow.',
            date: '09 JULY 2025',
            readTime: '11 min read',
            tags: ['GitHub Runners', 'CI/CD Fundamentals', 'DevOps Automation', 'Workflow Execution'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/github-runners-unveiled-engine-behind-cicd-tharusha-sachinthana-rccuc/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '3',
            title: 'Self-Hosted and Containerized Runners: Power, Control, and Scalable CI/CD',
            description:
                'A clear breakdown of self-hosted and containerized GitHub runners—why teams use them, how they enable performance, customization, and internal network access, and how Kubernetes and ephemeral runners unlock enterprise-level scalability',
            date: '20 JULY 2025',
            readTime: '12 min read',
            tags: ['Self-Hosted Runners', 'Containerized Runners', 'Kubernetes ARC', 'CI/CD Infrastructure'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/self-hosted-containerized-runners-power-control-scale-sachinthana-ygg3c/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '4',
            title: 'Optimizing GitHub Runners and the Future of CI/CD: Performance, Scale, and Security',
            description:
                'An overview of performance tuning, scaling, and securing GitHub Runners, plus insights into emerging CI/CD trends like serverless runners, zero-trust security, and intelligent caching.',
            date: '27 JULY 2025',
            readTime: '13 min read',
            tags: ['GitHub Runners', 'CI/CD Optimization', 'DevOps Engineering', 'Pipeline Scalability'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/optimizing-runners-future-cicd-tharusha-sachinthana-vfobc/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '5',
            title: 'Streamlining Docker Image Updates: Three Practical Automation Strategies for Modern DevOps Pipelines',
            description:
                'A practical breakdown of three methods to automate Docker image updates—using GitHub Actions, cron jobs, and Watchtower—to eliminate manual deployments, reduce errors, and improve reliability across environments.',
            date: '10 AUGUST 2025',
            readTime: '5 min read',
            tags: ['DevOps', 'CI/CD Automation', 'Docker', 'GitHub Actions', 'Deployment Automation'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/streamlining-docker-image-updates-three-practical-sachinthana-o2vrc/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '6',
            title: 'Bridging CI/CD Gaps: How to Access Local Machine CLI from GitHub Actions for Reliable Testing',
            description:
                'A guide to solving CI/CD inconsistencies by enabling GitHub Actions to access local machine CLI tools, ensuring reliable testing, smoother workflows, and true environment parity.',
            date: '17 AUGUST 2025',
            readTime: '11 min read',
            tags: ['CI/CD', 'GitHub Actions', 'DevOps Engineering', 'Self-Hosted Runners', 'Pipeline Reliability'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/bridging-cicd-gaps-accessing-local-machine-cli-from-sachinthana-dxcvc/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
        },
        {
            id: '7',
            title: 'Unlocking the Power of Big Data Analytics with Distributed Computing on Google Dataproc',
            description:
                'A practical overview of how Google Dataproc enables scalable big data processing through distributed computing, covering cluster design, storage choices, API integrations, and distributed machine learning with Spark.',
            date: '05 OCTOBER 2025',
            readTime: '13 min read',
            tags: ['Google Dataproc', 'Big Data Analytics', 'Distributed Computing', 'Apache Spark', 'Cloud Data Engineering'],
            status: 'published',
            url: 'https://www.linkedin.com/pulse/unlocking-power-big-data-analytics-distributed-google-sachinthana-xt27c/?trackingId=i1BPGU5eQbynp0ZU8IbgrQ%3D%3D',
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
            const parsed = JSON.parse(stored);
            // Merge with defaults to ensure new fields are available
            return {
                ...defaultPortfolioData,
                ...parsed,
                profile: { ...defaultPortfolioData.profile, ...parsed.profile },
                about: { ...defaultPortfolioData.about, ...parsed.about },
            };
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
