"use client";

import { motion } from "framer-motion";

export default function FunFactDesc() {
  const funFacts = [
    { text: "So handsome, but still single. 😅" },
    { text: "Love Jeet Kune Doo 🥋, big fan of Bruce Lee." },
    { text: "Coffee connoisseur ☕" },

    {
      text: "Obsessed with puzzles & problem solving 🧩",
    },
    { text: "I forgot the rest 😅" },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      {funFacts.map((fact, i) => (
        <motion.div
          key={i}
          variants={item}
          className="flex items-center gap-2 p-3 rounded-xl border border-gray-700/30 dark:border-white/10 bg-gray-800/30 dark:bg-gray-700/40 hover:bg-gray-800/50 transition cursor-default"
        >
          <span className="text-sm">{fact.text}</span>
          {fact.text.includes("Coffee") && (
            <button
              role="img"
              aria-label="buy coffee"
              className="text-sm not-dark:text-blue-800 dark:text-blue-400 hover:underline cursor-pointer"
              onClick={() =>
                window.open("https://buymeacoffee.com/kal_x", "_blank")
              }
            >
              buy me a coffee{" "}
            </button>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
