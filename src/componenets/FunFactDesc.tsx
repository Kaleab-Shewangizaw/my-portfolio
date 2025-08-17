"use client";

import { motion } from "framer-motion";
import { Coffee, Gamepad2, Music, Brain, Camera } from "lucide-react";

export default function FunFactDesc() {
  const funFacts = [
    { icon: <Coffee size={20} />, text: "Can code after 3 cups of coffee ☕" },
    { icon: <Gamepad2 size={20} />, text: "Casual gamer on weekends 🎮" },
    {
      icon: <Music size={20} />,
      text: "Lo-fi & Ethiopian music enthusiast 🎶",
    },
    {
      icon: <Brain size={20} />,
      text: "Obsessed with puzzles & problem solving 🧩",
    },
    { icon: <Camera size={20} />, text: "Photography & design hobbyist 📸" },
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
          <span className="text-green-400">{fact.icon}</span>
          <span className="text-sm">{fact.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
