"use client";

import { Code, Layout, Monitor, Database } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
    {
      Icon: Code,
      label: "Web Development",
      description:
        "Building responsive high performance websites and web apps using modern tech stacks. ",
    },
    {
      Icon: Layout,
      label: "UI/UX design",
      description:
        "Designing intuitive interfaces and seamless user experiances that captive and convert users.",
    },
    {
      Icon: Monitor,
      label: "Frontend Design",
      description:
        "Creating visually appealing and interactive frontends with React, TailwindCSS, and Modern design patterns.",
    },

    {
      Icon: Database,
      label: "Backend Development",
      description:
        "Designing Databases, APIs and Authentication systems for websites using modern and reailable technologies.",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className=""
    >
      <h1 className="font-bold text-lg mb-2">My services</h1>
      <div className="grid grid-cols-2 gap-2">
        {services.map(({ Icon, label, description }, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Card className="flex w-full items-center gap-2 rounded-xl border border-gray-700/30 dark:border-white/10 bg-white/60 dark:bg-gray-800/40 px-3 py-2 shadow-sm">
              <CardHeader className="flex flex-col  w-full items-center justify-center p-6 py-3">
                <Icon />
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <Button className="self-end">Hire me</Button>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
