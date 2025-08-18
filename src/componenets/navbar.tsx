"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { ModeToggle } from "./themeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      className="w-full sticky top-0 z-20 backdrop-blur-sm bg-black/10 rounded-md text-white px-4 py-1 flex justify-between items-center"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="font-bold text-xl">[Kal_X]</div>

      <ul className="hidden md:flex gap-8">
        {navItems.map((item, i) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
          >
            <Button
              variant="link"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "#" + item.id;
                link.click();
              }}
              className="text-white hover:text-purple-300"
            >
              {item.label}
            </Button>
          </motion.li>
        ))}
      </ul>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl focus:outline-none"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <motion.ul
          className="absolute top-full left-0 w-full bg-black/90 flex flex-col items-center py-4 md:hidden gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Button
                variant="link"
                className="text-white hover:text-purple-300"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "#" + item.id;
                  link.click();
                  setIsOpen(false);
                }}
              >
                {item.label}
              </Button>
            </motion.li>
          ))}
          <ModeToggle />
        </motion.ul>
      )}
    </motion.nav>
  );
}
