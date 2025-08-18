"use client";

import { Code, Layout, Monitor, Database } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function ServicesDesc() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delayChildren: 0.15,
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const services = [
    { Icon: Code, label: "Music" },
    { Icon: Layout, label: "Coding & Side Projects" },
    { Icon: Monitor, label: "Reading" },

    { Icon: Database, label: "Movies & Documentaries" },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
    >
      {services.map(({ Icon, label }, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 rounded-xl border border-gray-700/30 dark:border-white/10 bg-white/60 dark:bg-gray-800/40 px-3 py-2 shadow-sm"
        >
          <Icon size={18} className="shrink-0" />
          <span className="text-sm">{label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
