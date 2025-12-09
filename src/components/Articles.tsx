import { motion } from 'motion/react';
import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { FileText, ExternalLink, Clock } from 'lucide-react';
import { useAdmin } from './admin/AdminContext';

export function Articles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { data } = useAdmin();
  const { articles } = data;

  return (
    <section id="articles" className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-center mb-4">
            Articles & <span className="text-primary">Blog Posts</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform group relative overflow-hidden"
              >
                {article.status === 'coming-soon' && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/20 border border-secondary rounded-full text-xs text-secondary">
                    Coming Soon
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">{article.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{article.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-br from-white/5 to-white/10 rounded-full text-xs border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {article.status === 'published' && article.url && (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:text-secondary transition-colors"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 glass-card p-6 rounded-2xl"
          >
            <p className="text-muted-foreground">
              I&apos;m working on publishing technical articles about DevOps, Cloud Engineering, and best practices.
              Stay tuned for in-depth guides and tutorials!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}