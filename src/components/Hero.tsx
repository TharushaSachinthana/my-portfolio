import { motion } from 'motion/react';
import { Download, Eye, Award, Trophy, Briefcase } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function Hero() {
  const { data } = useAdmin();
  const { profile, cvFiles } = data;

  const stats = [
    { icon: Trophy, label: 'Global Rank 109', subtitle: 'IEEE Xtreme 18.0' },
    { icon: Award, label: 'Top 10', subtitle: 'Huawei ICT Competition' },
    { icon: Briefcase, label: 'DevOps + Cloud', subtitle: 'Engineer' },
  ];

  const handleDownloadCV = () => {
    const activeCV = cvFiles.find((cv) => cv.isActive);
    if (activeCV) {
      const link = document.createElement('a');
      link.href = activeCV.url;
      link.download = activeCV.name;
      link.click();
    } else {
      alert('No CV available for download');
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4">
              <span className="text-secondary px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                {profile.subtitle}
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Hi, I&apos;m {profile.name}
            </h1>

            <h2 className="text-2xl lg:text-3xl text-foreground/90 mb-6">
              {profile.title}
            </h2>

            <p className="text-muted-foreground mb-8 max-w-xl">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={scrollToProjects}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Projects
              </button>
              <button
                onClick={handleDownloadCV}
                className="px-8 py-3 glass-card text-foreground rounded-full hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CV
              </button>
            </div>
          </motion.div>

          {/* Right side - Profile image and stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="relative w-72 h-72 rounded-full object-cover border-4 border-primary/20 shadow-2xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-4 rounded-2xl text-center hover:scale-105 transition-transform"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
