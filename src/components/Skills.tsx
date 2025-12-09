import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Cloud, Code, Database, Wrench } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Cloud,
  Code,
  Database,
  Wrench,
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { data } = useAdmin();
  const { skills } = data;

  return (
    <section id="skills" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon] || Code;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="px-4 py-2 bg-gradient-to-br from-white/5 to-white/10 rounded-full text-sm text-foreground border border-white/10 hover:border-primary/50 hover:bg-white/15 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}