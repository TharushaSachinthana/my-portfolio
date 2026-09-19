import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Award, ExternalLink } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { data } = useAdmin();
  const { certifications } = data;

  return (
    <section id="certifications" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Professional <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-muted-foreground mb-12">My learning journey & milestones</p>

          {/* Roadmap Timeline */}
          <div className="relative">
            {/* Animated center line */}
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 hidden md:block overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-gradient-to-b from-primary via-secondary to-primary/30"
              />
            </div>

            {/* Mobile: left-aligned line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden overflow-hidden">
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: '100%' } : { height: 0 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="w-full bg-gradient-to-b from-primary via-secondary to-primary/30"
              />
            </div>

            {certifications.map((cert, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={cert.id} className="relative mb-12 last:mb-0">
                  {/* Milestone dot — desktop (centered) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 top-6 z-10 hidden md:block"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background milestone-dot" />
                  </motion.div>

                  {/* Milestone dot — mobile (left-aligned) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                    className="absolute left-[18px] top-6 z-10 md:hidden"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background milestone-dot" />
                  </motion.div>

                  {/* Card — alternating sides on desktop, right-aligned on mobile */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isLeft ? -60 : 60,
                    }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
                    className={`
                      md:w-[calc(50%-2rem)]
                      ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}
                      ml-12 md:ml-auto
                    `}
                  >
                    <div className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform group relative">
                      {/* Connector line to dot — desktop */}
                      <div
                        className={`absolute top-7 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50 hidden md:block ${
                          isLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
                        }`}
                      />

                      {/* Step number badge */}
                      <div className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {index + 1}
                      </div>

                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 group-hover:text-primary transition-colors">
                            {cert.title}
                          </h3>
                          <div className="text-sm text-muted-foreground">{cert.issuer}</div>
                          <div className="text-xs text-secondary mt-1">{cert.date}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gradient-to-br from-white/5 to-white/10 rounded-full text-xs border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {cert.link && cert.link !== '#' && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                        >
                          <span>View Certificate</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* End marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: certifications.length * 0.2 + 0.5 }}
              className="relative flex justify-center mt-8"
            >
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-sm font-medium text-white shadow-lg">
                🚀 More coming...
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}