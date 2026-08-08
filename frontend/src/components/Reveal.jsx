import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, className = "", y = 30 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);
