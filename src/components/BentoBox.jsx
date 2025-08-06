// src/components/BentoBox.jsx
import { DocumentTextIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

/**
 * BentoBox: Grid of glassmorphism cards (bento style)
 * Each card links to a Microsoft Form
 */
const links = [
  {
    label: "Asset Request (Coming Soon)",
    desc: "Request new hardware, software, or office equipment.",
    url: "#", // Replace with real link
    icon: DocumentTextIcon,
    color: "from-emerald-400 to-teal-500"
  },
  {
    label: "IT Concern",
    desc: "Report issues or concerns to IT Support.",
    url: "https://forms.cloud.microsoft/e/jRhMJNCCfQ", // Replace with real link
    icon: WrenchScrewdriverIcon,
    color: "from-indigo-500 to-purple-600"
  }
];

export default function BentoBox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto p-8">
      {links.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`
              relative group rounded-2xl p-8
              bg-white/40 dark:bg-black/40
              backdrop-blur-lg shadow-2xl
              border border-white/20 dark:border-black/30
              hover:scale-105 transition-all duration-300
              overflow-hidden
            `}
            style={{
              // Add a custom mesh/gradient border
            }}
          >
            {/* Mesh colored animated border */}
            <div className={`
              absolute -inset-1 rounded-3xl z-0
              bg-gradient-to-br ${item.color} opacity-40 blur-2xl
              group-hover:opacity-70 transition-opacity duration-300
            `}></div>
            {/* Card Content */}
            <div className="relative z-10 flex flex-col gap-4">
              <Icon className="h-10 w-10 text-black dark:text-white opacity-70" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.label}</h2>
              <p className="text-gray-700 dark:text-gray-200">{item.desc}</p>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
