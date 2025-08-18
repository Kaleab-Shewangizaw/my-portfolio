"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import DevProjectImg from "../../../public/file.svg";
import DesignProjectImg from "../../../public/file.svg";

const devProjects = [
  {
    name: "Guava Social Blog",
    description:
      "A social blogging platform with communities, posts, likes, and trends.",
    tech: ["React", "Next.js", "Tailwind", "Node.js", "MongoDB"],
    img: DevProjectImg,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: DevProjectImg,
  },
];

const designProjects = [
  {
    name: "Portfolio Design 1",
    description: "Clean and modern UI design for portfolios.",
    img: DesignProjectImg,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: DesignProjectImg,
  },
];

export default function ProjectsSection() {
  return (
    <div className="py-16 px-4 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>

      {/* Development Projects */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6">Development Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {devProjects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer bg-[#332d43] text-white">
                    <Image
                      src={proj.img}
                      alt={proj.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-xl font-bold mb-2">{proj.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t, i) => (
                          <span
                            key={i}
                            className="bg-purple-700 px-2 py-1 rounded text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <p>{proj.description}</p>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design Projects */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Design Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designProjects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="rounded-lg overflow-hidden shadow-lg cursor-pointer">
                    <Image
                      src={proj.img}
                      alt={proj.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <h4 className="text-lg font-bold mb-2">{proj.name}</h4>
                  <p>{proj.description}</p>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
