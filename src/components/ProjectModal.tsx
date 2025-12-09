import { motion, AnimatePresence } from 'motion/react';
import { X, Github, ExternalLink } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-hidden rounded-2xl glass-card"
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
                  src={project.images[0] || 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?w=1200'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 lg:p-10 -mt-20 relative">
                <h2 className="text-3xl md:text-4xl mb-4">{project.title}</h2>

                {/* Links */}
                <div className="flex gap-4 mb-6">
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
