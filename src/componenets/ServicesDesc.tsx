"use client";

import { Code, Layout, Monitor, Database, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ServicesDesc() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      Icon: Code,
      label: "Web Development",
      description:
        "Building responsive high performance websites and web apps using modern tech stacks.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      Icon: Layout,
      label: "UI/UX Design",
      description:
        "Designing intuitive interfaces and seamless user experiences that captivate and convert users.",
      color: "from-purple-500 to-pink-500",
    },
    {
      Icon: Monitor,
      label: "Frontend Development",
      description:
        "Creating visually appealing and interactive frontends with React, TailwindCSS, and modern design patterns.",
      color: "from-green-500 to-emerald-500",
    },
    {
      Icon: Database,
      label: "Backend Development",
      description:
        "Designing databases, APIs and authentication systems using modern and reliable technologies.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <h1 className="font-bold text-xl mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        My Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(({ Icon, label, description, color }, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white mb-3`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{label}</CardTitle>
                <CardDescription className="mt-2">
                  {description}
                </CardDescription>
              </CardHeader>
              <div className="px-6 pb-4">
                <Button
                  variant="ghost"
                  className="px-3 group-hover:translate-x-1 transition-transform"
                >
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
