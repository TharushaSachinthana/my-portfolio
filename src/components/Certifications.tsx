import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Award, ExternalLink } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { data } = useAdmin();
  const { certifications } = data;

  return (
    <section id="certifications" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Professional <span className="text-primary">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}