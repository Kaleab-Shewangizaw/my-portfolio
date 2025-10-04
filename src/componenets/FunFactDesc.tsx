"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";

export default function FunFactDesc() {
  const funFacts = [
    { text: "So handsome, but still single. 😅", emoji: "😊" },
    { text: "Love Jeet Kune Doo, big fan of Bruce Lee.", emoji: "🥋" },
    { text: "Coffee connoisseur", emoji: "☕" },
    { text: "Obsessed with puzzles & problem solving", emoji: "🧩" },
    { text: "I forgot the rest 😅", emoji: "🤔" },
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
      className="space-y-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {funFacts.map((fact, i) => (
          <motion.div
            key={i}
            variants={item}
            className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm "
          >
            <span className="text-2xl">{fact.emoji}</span>
            <div>
              <p className="text-sm">{fact.text}</p>
              {fact.text.includes("Coffee") && (
                <button
                  className="text-xs mt-2 text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  onClick={() =>
                    window.open("https://buymeacoffee.com/kal_x", "_blank")
                  }
                >
                  <Coffee className="w-3 h-3" />
                  Buy me a coffee
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
