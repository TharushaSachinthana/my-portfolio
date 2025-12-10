import { useParams, Link } from 'react-router-dom';
import { useAdmin } from './admin/AdminContext';
import { ArrowLeft, Github, ExternalLink, FileText, Video, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

export function ProjectDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data } = useAdmin();
    const project = data.projects.find((p) => p.id === id);

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

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Header */}
            <div className="relative h-[50vh] min-h-[400px]">
                <img
                    src={project.coverImage || project.images[0] || 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?w=1200'}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <Link
                        to="/"
                        className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-20 max-w-6xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                    >
                        {project.title}
                    </motion.h1>

                    <div className="flex flex-wrap gap-4">
                        {project.githubUrl && project.githubUrl !== '#' && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 glass-card rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                <Github className="w-5 h-5" />
                                <span>View Code</span>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                            >
                                <ExternalLink className="w-5 h-5" />
                                <span>Live Demo</span>
                            </a>
                        )}
                        {project.documentationUrl && (
                            <a
                                href={project.documentationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 glass-card rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                <FileText className="w-5 h-5" />
                                <span>Documentation</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-4 py-2 bg-secondary/50 rounded-full text-sm border border-border"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
                    <h2 className="text-3xl font-bold mb-6">About the Project</h2>
                    <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                        {project.fullDescription}
                    </div>
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Key Highlights</h2>
                        <div className="grid gap-4">
                            {project.highlights.map((highlight, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/30">
                                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                    <span className="text-card-foreground">{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery */}
                {project.images.length > 1 && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <ImageIcon className="w-8 h-8" />
                            Project Gallery
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {project.images.map((image, index) => (
                                <div key={index} className="rounded-2xl overflow-hidden border border-border group relative aspect-video">
                                    <img
                                        src={image}
                                        alt={`${project.title} - Image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Video */}
                {project.videoUrl && project.videoUrl.includes('youtube') && (
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                            <Video className="w-8 h-8" />
                            Project Video
                        </h2>
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <iframe
                                src={project.videoUrl.replace('watch?v=', 'embed/')}
                                title={project.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
