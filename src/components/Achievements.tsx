import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Trophy, Award, Medal, Star, Target, Crown } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Trophy,
  Award,
  Medal,
  Star,
  Target,
  Crown,
};

export function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { data } = useAdmin();
  const { achievements } = data;

  return (
    <section id="achievements" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Achievements & <span className="text-primary">Awards</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = iconMap[achievement.icon] || Trophy;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl mb-2">{achievement.title}</h3>
                      <div className="mb-1">
                        <span className="text-primary">{achievement.rank}</span>
                      </div>
                      <div className="text-sm text-secondary mb-3">{achievement.subrank}</div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
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