import { useRef, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useInView } from '../../hooks/useInView';

type RevealVariant = 'fade-up' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'rotate' | 'elastic';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const variants: Record<RevealVariant, { initial: any; animate: any }> = {
  'fade-up': {
    initial: { opacity: 0, y: 60, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  'slide-left': {
    initial: { opacity: 0, x: -80 },
    animate: { opacity: 1, x: 0 },
  },
  'slide-right': {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(20px)', y: 30 },
    animate: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  rotate: {
    initial: { opacity: 0, rotateX: 15, y: 40, scale: 0.95 },
    animate: { opacity: 1, rotateX: 0, y: 0, scale: 1 },
  },
  elastic: {
    initial: { opacity: 0, scale: 0.5, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
  },
};

const springConfigs: Partial<Record<RevealVariant, any>> = {
  elastic: { type: 'spring', stiffness: 260, damping: 20 },
};

export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
  amount = 0.2,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const { initial, animate } = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...springConfigs[variant],
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </motion.div>
  );
}
