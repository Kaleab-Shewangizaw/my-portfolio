"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import DevProjectImg from "../../../public/file.svg";
import Guava from "../../../public/Guava.webp";
import { Button } from "@/components/ui/button";
import { BsGithub } from "react-icons/bs";
import { Star } from "lucide-react";

const devProjects = [
  {
    name: "Guava Social Blog",
    description:
      "A social blogging platform with communities, posts, likes, and trends.",
    tech: ["React", "Next.js", "Tailwind", "Node.js", "MongoDB"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
  {
    name: "Service Booking System",
    description: "Manage appointments and bookings with a dynamic dashboard.",
    tech: ["React", "Express.js", "PostgreSQL"],
    img: Guava,
  },
];

const designProjects = [
  {
    name: "Portfolio Design 1",
    description: "Clean and modern UI design for portfolios.",
    img: DevProjectImg,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: DevProjectImg,
  },
];

export default function ProjectsSection() {
  return (
    <div className="py-5  px-4 lg:px-5">
      <h2 className="text-3xl font-bold text-center mb-7 text-white">
        My Projects
      </h2>

      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-6 text-white">
          Development Projects
        </h3>
        <div className="flex  gap-4 flex-wrap justify-center">
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
                  <div className="rounded-md overflow-hidden shadow-lg w-90 md:w-70 cursor-pointer bg-[#332d43]  text-white ">
                    <div className="relative w-full h-40">
                      <Image
                        src={proj.img}
                        alt={proj.name}
                        fill
                        className="object-contain bg-white"
                      />
                    </div>
                    <div className="py-3 px-3 border-t pt-3 border-gray-500 flex flex-col items-end gap-2">
                      <h4 className="text-lg font-bold   text-gray-300 w-full">
                        {proj.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 w-full">
                        <p className="text-gray-400 text-sm">
                          {proj.description}
                        </p>
                      </div>
                      <div className="flex gap-3 mt-1">
                        <Button>
                          <BsGithub />
                        </Button>
                        <Button>
                          <Star />{" "}
                        </Button>
                        <Button>Visit</Button>
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

// {proj.tech.map((t, i) => (
//                           <span
//                             key={i}
//                             className="bg-purple-700 px-2 py-1 rounded text-xs"
//                           >
//                             {t}
//                           </span>
//                         ))}
