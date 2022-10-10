import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  dir?: "to-left" | "to-right";
}

export function MotionPage({ children }: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          ease: "linear",
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        y: 20,
        transition: {
          ease: "linear",
          duration: 0.1,
        },
      }}
    >
      {children}
    </motion.section>
  );
}
