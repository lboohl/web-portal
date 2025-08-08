// src/components/AnimatedBackground.jsx
import { motion } from "framer-motion";

/**
 * Animated mesh gradient SVG background using Framer Motion.
 * Renders below all other content for a soft, animated, modern effect.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden filter blur-3xl">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Light Mode Gradients */}
          <radialGradient id="mesh1-light" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh2-light" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#ec4899" /> {/* Pink-500 */}
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh3-light" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#f59e0b" /> {/* Amber-500 */}
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          {/* Dark Mode Gradients */}
          <radialGradient id="mesh1-dark" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#6366f1" /> {/* Indigo-500 */}
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh2-dark" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#ec4899" /> {/* Pink-500 */}
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mesh3-dark" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#f59e0b" /> {/* Amber-500 */}
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Light Mode Circles */}
        <g className="transition-opacity duration-500 ease-in-out dark:opacity-0">
          <motion.circle
            cx={200}
            cy={200}
            r={250}
            fill="url(#mesh1-light)"
            animate={{ cx: [100, 500, 100], cy: [100, 450, 100] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          />
          <motion.circle
            cx={600}
            cy={400}
            r={220}
            fill="url(#mesh2-light)"
            animate={{ cx: [700, 300, 700], cy: [300, 650, 300] }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut", delay: 2 }}
          />
          <motion.circle
            cx={400}
            cy={500}
            r={200}
            fill="url(#mesh3-light)"
            animate={{ cx: [300, 650, 300], cy: [600, 250, 600] }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 4 }}
          />
        </g>
        {/* Dark Mode Circles */}
        <g className="transition-opacity duration-500 ease-in-out opacity-0 dark:opacity-100">
          <motion.circle
            cx={200}
            cy={200}
            r={250}
            fill="url(#mesh1-dark)"
          animate={{
            cx: [100, 500, 100],
            cy: [100, 450, 100],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx={600}
          cy={400}
            r={220}
            fill="url(#mesh2-dark)"
          animate={{
            cx: [700, 300, 700],
            cy: [300, 650, 300],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.circle
          cx={400}
          cy={500}
            r={200}
            fill="url(#mesh3-dark)"
          animate={{
            cx: [300, 650, 300],
            cy: [600, 250, 600],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        </g>
      </svg>
    </div>
  );
}
