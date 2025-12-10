import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink, FileText, Video, Image } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[60] overflow-hidden rounded-2xl"
            style={{
              top: '2rem',
              left: '2rem',
              right: '2rem',
              bottom: '2rem',
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              border: '1px solid rgba(148, 163, 184, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="h-full overflow-y-auto">
              {/* Hero image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={project.coverImage || project.images[0] || 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?w=1200'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 lg:p-10 -mt-20 relative">
                <h2 className="text-3xl md:text-4xl mb-4">{project.title}</h2>

                {/* Links */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
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
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Documentation</span>
                    </a>
                  )}
                  {project.reportUrl && (
                    <a
                      href={project.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Report</span>
                    </a>
                  )}
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/10 transition-colors"
                    >
                      <Video className="w-5 h-5" />
                      <span>Watch Video</span>
                    </a>
                  )}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-br from-white/5 to-white/10 rounded-full text-sm border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none mb-8">
                  <h3 className="text-xl mb-4 text-foreground">About the Project</h3>
                  <div className="text-muted-foreground whitespace-pre-line">
                    {project.fullDescription}
                  </div>
                </div>

                {/* Project Images Gallery */}
                {project.images.length > 1 && (
                  <div className="mb-8">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Project Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.images.map((image, index) => (
                        <a
                          key={index}
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl overflow-hidden hover:scale-105 transition-transform"
                        >
                          <img
                            src={image}
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Embedded Video */}
                {project.videoUrl && project.videoUrl.includes('youtube') && (
                  <div className="mb-8">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Project Video
                    </h3>
                    <div className="aspect-video rounded-xl overflow-hidden">
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

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div>
                    <h3 className="text-xl mb-4">Key Highlights</h3>
                    <ul className="space-y-3">
                      {project.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
