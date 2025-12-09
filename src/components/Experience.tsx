import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { data } = useAdmin();
  const { experiences } = data;

  return (
    <section id="experience" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/20 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative mb-8 md:ml-20"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-6 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background hidden md:block"></div>

                <div className="glass-card p-6 md:p-8 rounded-2xl hover:scale-[1.01] transition-transform">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h3 className="text-2xl">{exp.title}</h3>
                      </div>
                      <div className="text-xl text-primary mb-2">{exp.company}</div>
                      <p className="text-muted-foreground italic mb-4 md:mb-0">{exp.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}