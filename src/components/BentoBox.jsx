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
    url: "/asset-request", // Replace with real link
    icon: DocumentTextIcon,
    color: "from-emerald-400 to-teal-500"
  },
  {
    label: "Asset Inventory",
    desc: "View and manage assets.",
    url: "/assets",
    icon: DocumentTextIcon,
    color: "from-sky-500 to-cyan-600"
  },
  {
    label: "IT Helpdesk",
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
        const isLink = item.url !== "#";
        const MotionComponent = isLink ? motion.a : motion.div;
        const componentProps = {
          key: item.label,
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          whileHover: { scale: 1.05 },
          transition: { delay: idx * 0.0, duration: 0.15},
          className: `
            relative group rounded-2xl p-8
            bg-white/40 dark:bg-black/40
            backdrop-blur-lg shadow-2xl
            border border-white/20 dark:border-black/30
            overflow-hidden
            ${!isLink ? "cursor-default" : ""}
          `,
          style: {
            // Add a custom mesh/gradient border
          },
          ...(isLink && {
            href: item.url,
            target: "_blank",
            rel: "noopener noreferrer",
          }),
        };

        return (
          <MotionComponent {...componentProps}>
            {/* Mesh colored animated border */}
            <div className={`
              absolute -inset-1 rounded-3xl z-0
              bg-gradient-to-br ${item.color} opacity-40 blur-2xl
              group-hover:opacity-70 transition-opacity duration-1000
            `}></div>
            {/* Card Content */}
            <div className="relative z-10 flex flex-col gap-4">
              <Icon className="h-10 w-10 text-black dark:text-white opacity-70 transition-colors duration-1000" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-1000 font-inter">{item.label}</h2>
              <p className="text-gray-700 dark:text-gray-200 transition-colors duration-1000 font-inter">{item.desc}</p>
            </div>
          </MotionComponent>
        );
      })}
    </div>
  );
}
