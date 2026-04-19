'use client';

import { motion } from 'framer-motion';

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
  },
};

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}