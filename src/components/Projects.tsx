import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Github, ArrowRight } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';
import { Link } from 'react-router-dom';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { data } = useAdmin();
  const { projects } = data;

  return (
    <section id="projects" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Featured <span className="text-primary">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card rounded-2xl overflow-hidden group relative flex flex-col"
                style={{
                  border: '1px solid rgba(148, 163, 184, 0.1)',
                }}
              >
                {/* Card Image — fixed aspect ratio */}
                <Link to={`/project/${project.id}`} className="block">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={project.coverImage || project.images[0] || 'https://images.unsplash.com/photo-1667264501379-c1537934c7ab?w=800'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* View project badge (top-right on hover) */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-lg">
                        View Project <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                    {/* Title on image */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow-md">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>

                {/* Card Content — flex-grow to equalize height */}
                <div className="p-5 flex flex-col flex-grow">
                  {/* Description — fixed 3-line height */}
                  <p
                    className="text-muted-foreground text-sm mb-4 leading-relaxed"
                    style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: '3.9em' }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs border"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08))',
                          borderColor: 'rgba(148, 163, 184, 0.12)',
                          color: 'rgba(148, 163, 184, 0.9)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs text-primary/70 font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Row — pushed to bottom */}
                  <div className="flex items-center justify-between pt-3 mt-auto" style={{ borderTop: '1px solid rgba(148, 163, 184, 0.08)' }}>
                    <Link
                      to={`/project/${project.id}`}
                      className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      See Details <ArrowRight className="w-4 h-4" />
                    </Link>

                    {project.githubUrl && project.githubUrl !== '#' ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(148, 163, 184, 0.12)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    ) : (
                      /* Placeholder to keep alignment consistent */
                      <span className="w-[80px]"></span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10"
          >
            <p className="text-muted-foreground text-sm">
              More projects coming soon — click on a card to explore in detail.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}