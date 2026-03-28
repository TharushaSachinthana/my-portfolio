import { useParams, Link } from 'react-router-dom';
import { useAdmin } from './admin/AdminContext';
import { ArrowLeft, ExternalLink, FileText, Video, Image as ImageIcon, ChevronDown, ChevronUp, GitBranch } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function ProjectDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data } = useAdmin();
    const project = data.projects.find((p) => p.id === id);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                <Link to="/" className="text-primary hover:underline">
                    Return to Home
                </Link>
            </div>
        );
    }

    // Split description into paragraphs for "See More"
    const paragraphs = project.fullDescription.split('\n\n').filter(p => p.trim());
    const previewParagraphs = paragraphs.slice(0, 2);
    const hasMoreContent = paragraphs.length > 2;
    const displayedParagraphs = isDescExpanded ? paragraphs : previewParagraphs;

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 relative z-0">
            {/* Nav Bar */}
            <div className="sticky top-0 z-50 w-full px-6 py-4" style={{ background: 'rgba(10, 14, 39, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
               <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-foreground bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Portfolio</span>
                    </Link>
               </div>
            </div>

            {/* Hero Header */}
            <div className="relative w-full flex flex-col justify-end overflow-hidden" style={{ minHeight: '380px', height: '45vh' }}>
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.coverImage || project.images[0] || 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?w=1200'}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full px-6 pb-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 drop-shadow-lg"
                        >
                            {project.title}
                        </motion.h1>

                        {/* Action Buttons — inline */}
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            {project.githubUrl && project.githubUrl !== '#' && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 transform hover:scale-[1.03]"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                        boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    View on GitHub
                                </a>
                            )}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Live Demo
                                </a>
                            )}
                            {project.documentationUrl && (
                                <a
                                    href={project.documentationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
                                    style={{
                                        background: 'rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(8px)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                    }}
                                >
                                    <FileText className="w-4 h-4" />
                                    Documentation
                                </a>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 mt-12 relative z-20">
                {/* Technologies */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08))',
                                border: '1px solid rgba(148, 163, 184, 0.12)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>

                {/* Architecture / Pipeline Flow */}
                {project.architecture && project.architecture.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
                            <GitBranch className="w-5 h-5 text-primary" />
                            Pipeline Flow
                        </h2>
                        <div className="relative pl-6">
                            {/* Connecting line */}
                            <div
                                className="absolute left-[19px] top-4 bottom-4 w-px"
                                style={{ background: 'linear-gradient(to bottom, var(--primary), #a855f7, transparent)' }}
                            />

                            <div className="space-y-2">
                                {project.architecture.map((step, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.25 + index * 0.05 }}
                                        className="flex items-center gap-3 relative"
                                    >
                                        {/* Step number */}
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 relative z-10"
                                            style={{
                                                background: 'linear-gradient(135deg, var(--primary), #a855f7)',
                                                boxShadow: '0 0 12px rgba(99, 102, 241, 0.25)',
                                            }}
                                        >
                                            {index + 1}
                                        </div>

                                        {/* Step content */}
                                        <div
                                            className="flex-1 px-4 py-2.5 rounded-lg text-sm"
                                            style={{
                                                background: 'rgba(255,255,255,0.03)',
                                                border: '1px solid rgba(148, 163, 184, 0.08)',
                                            }}
                                        >
                                            {step}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Divider */}
                <div className="w-full h-px mb-10" style={{ background: 'linear-gradient(to right, transparent, rgba(148, 163, 184, 0.15), transparent)' }} />

                {/* Description with See More */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-10"
                >
                    <h2 className="text-xl font-bold mb-4">About the Project</h2>
                    <div className="relative max-w-3xl">
                        <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                            {displayedParagraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Fade overlay when collapsed */}
                        {hasMoreContent && !isDescExpanded && (
                            <div
                                className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                                style={{ background: 'linear-gradient(to top, var(--background), transparent)' }}
                            />
                        )}
                    </div>

                    {hasMoreContent && (
                        <button
                            onClick={() => setIsDescExpanded(!isDescExpanded)}
                            className="flex items-center gap-1.5 mt-3 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 hover:bg-white/5"
                            style={{ border: '1px solid rgba(148, 163, 184, 0.12)' }}
                        >
                            {isDescExpanded ? (
                                <>See Less <ChevronUp className="w-3.5 h-3.5" /></>
                            ) : (
                                <>See More <ChevronDown className="w-3.5 h-3.5" /></>
                            )}
                        </button>
                    )}
                </motion.div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold mb-4">Key Highlights</h2>
                        <div className="grid gap-2">
                            {project.highlights.map((highlight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.35 + index * 0.04 }}
                                    className="flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-150 hover:bg-white/[0.02]"
                                    style={{
                                        border: '1px solid rgba(148, 163, 184, 0.06)',
                                        background: 'rgba(255,255,255,0.015)',
                                    }}
                                >
                                    <div
                                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg, var(--primary), #a855f7)' }}
                                    />
                                    <span className="text-sm text-card-foreground leading-relaxed">{highlight}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Gallery */}
                {project.images.length > 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            Project Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden group relative"
                                    style={{ aspectRatio: '16/9', border: '1px solid rgba(148, 163, 184, 0.08)' }}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Video */}
                {project.videoUrl && project.videoUrl.includes('youtube') && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-10"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2.5">
                            <Video className="w-5 h-5 text-primary" />
                            Project Video
                        </h2>
                        <div className="rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9', border: '1px solid rgba(148, 163, 184, 0.08)' }}>
                            <iframe
                                src={project.videoUrl.replace('watch?v=', 'embed/')}
                                title={project.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </motion.div>
                )}

                {/* Bottom GitHub CTA */}
                {project.githubUrl && project.githubUrl !== '#' && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="w-full pt-8 pb-12 flex items-center justify-center"
                    >
                        <div
                            className="flex flex-col items-center justify-center gap-5 px-8 md:px-14 py-10 rounded-2xl relative z-10 overflow-hidden w-full max-w-2xl text-center"
                            style={{
                                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.08))',
                                border: '1px solid rgba(148, 163, 184, 0.15)',
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                            }}
                        >
                            <div className="flex flex-col items-center gap-3 relative z-20">
                                <h3 className="text-xl font-bold text-white">Ready to dive deeper?</h3>
                                <p className="text-muted-foreground text-sm max-w-md">
                                    Explore the full source code, review the pipeline configurations, and contribute to the repository.
                                </p>
                            </div>
                            
                            {/* Github Button Container - absolute flex center */}
                            <div className="mt-4 relative z-20">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-[1.03]"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                        boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.5)',
                                    }}
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                    View Source on GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
