// All reusable animation variants in a page

// Page transition
export const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const pageTransition = {
  duration: 0.25,
  ease: "easeInOut",
};

// List item — stagger
export const listVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

export const listItemVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Card pop
export const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Bottom sheet slide up
export const sheetVariants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] } },
  exit: { y: "100%", transition: { duration: 0.25 } },
};

// Modal fade + scale
export const modalVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

// Fade in
export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Bounce button
export const tapAnimation = {
  whileTap: { scale: 0.96 },
  whileHover: { scale: 1.02 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};

// Slide in from bottom
export const slideUpVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Number counter animation helper
export const numberAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};