import React from 'react';
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

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon] || Code;
              const isFeatured = categoryIndex === 0 || categoryIndex === 3; // Feature a couple of items to make it look like a true Bento box

              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.12 }}
                  className={`glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all group flex flex-col h-full ${
                    isFeatured ? 'md:col-span-2' : 'col-span-1'
                  }`}
                  style={{
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl">{category.title}</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                      {category.skills.length} skills
                    </span>
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
                        className="skill-chip px-4 py-2 bg-gradient-to-br from-white/5 to-white/10 rounded-full text-sm text-foreground border border-white/10 cursor-default"
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