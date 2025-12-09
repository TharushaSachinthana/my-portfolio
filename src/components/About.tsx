import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { GraduationCap, Briefcase, MapPin } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { data } = useAdmin();
  const { profile, experiences } = data;

  const currentJob = experiences[0];

  return (
    <section id="about" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl mb-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  Education & Background
                </h3>
                <p className="text-muted-foreground mb-6">
                  I&apos;m currently pursuing my degree in <span className="text-foreground">Computer Engineering</span> at
                  the <span className="text-foreground">University of Jaffna</span>, where I&apos;ve developed a strong
                  foundation in software engineering, cloud computing, and DevOps practices.
                </p>
                <div className="flex items-start gap-3 text-muted-foreground mb-4">
                  <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                  <span>Based in {profile.location}, working with global technologies</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-secondary" />
                  Professional Experience
                </h3>
                {currentJob ? (
                  <p className="text-muted-foreground mb-6">
                    I&apos;m currently working as a <span className="text-foreground">{currentJob.title}</span> at
                    <span className="text-foreground"> {currentJob.company}</span>, where I&apos;ve gained hands-on experience
                    in building and optimizing CI/CD pipelines, containerizing applications with Docker, and managing
                    cloud infrastructure.
                  </p>
                ) : (
                  <p className="text-muted-foreground mb-6">
                    {profile.bio}
                  </p>
                )}
                <p className="text-muted-foreground">
                  My passion lies in automating workflows, ensuring system reliability, and implementing infrastructure
                  as code to create scalable, maintainable solutions.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Through competitive programming and industry experience, I&apos;ve developed strong problem-solving
                skills and a deep understanding of software development best practices. I&apos;m committed to continuous
                learning and staying updated with the latest DevOps tools and cloud technologies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}