"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Hero from "../../../public/Hero.png";
import Guava from "../../../public/Guava.webp";
import { Button } from "@/components/ui/button";
import { BsGithub, BsPinterest } from "react-icons/bs";
import { DribbbleIcon, FigmaIcon, Star } from "lucide-react";
import { useState } from "react";
import { BiRightArrow } from "react-icons/bi";

const devProjects = [
  {
    name: "Guava Social Blog",
    description:
      "A social blogging platform with communities, posts, likes, and trends.",
    tech: [
      "React",
      "Next.js",
      "Tailwind",
      "Node.js",
      "MongoDB",
      "MongoDB",
      "MongoDB",
      "MongoDB",
    ],
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
    img: Hero,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: Hero,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: Hero,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: Hero,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: Hero,
  },
  {
    name: "Landing Page Concept",
    description: "A visually engaging landing page design for marketing.",
    img: Hero,
  },
];

export default function ProjectsSection() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="py-5  px-4 lg:px-5 pt-15">
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
                      <h4 className="text-lg font-bold   text-gray-200 w-full">
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
                <HoverCardContent className="w-90 flex flex-col dark:bg-gray-950  dark:text-gray-300 text-[#030712]">
                  <p>
                    {proj.description}
                    {proj.description}
                    {proj.description}
                  </p>
                  <div className="flex gap-2 mt-5 w-full flex-wrap">
                    {proj.tech.map((t, i) => (
                      <span
                        key={i}
                        className="bg-purple-700 px-2 py-1 rounded text-xs text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Design Projects */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Design Projects</h3>
        <div className="flex  gap-4 flex-wrap justify-center">
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
                  <div
                    className="rounded-md overflow-hidden shadow-lg cursor-pointer bg-[#332d43]   text-white group relative"
                    onMouseEnter={() => {
                      setHovered(true);
                    }}
                    onMouseLeave={() => {
                      setHovered(false);
                    }}
                  >
                    <Image src={proj.img} alt={proj.name} width={400} />

                    <div className="absolute bottom-0 flex flex-col px-2 py-2 w-full md:hidden">
                      <h4 className="text-sm font-bold   text-gray-200 w-full bg-black/80 p-2">
                        {proj.name}
                      </h4>
                      <div className="flex gap-3 mt-1">
                        <Button variant="outline">
                          <DribbbleIcon />
                        </Button>
                        <Button variant="outline">
                          <FigmaIcon />{" "}
                        </Button>
                        <Button variant="outline">
                          <BsPinterest />
                        </Button>
                        <Button className="ml-auto flex items-center">
                          +15 more <BiRightArrow />
                        </Button>
                      </div>
                    </div>

                    {hovered && (
                      <AnimatePresence>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute bottom-0   bg-gradient-to-b hidden group-hover:flex from-black/60 via-black/80 to-black  w-full  flex-col px-4 py-4 justify-between"
                        >
                          {" "}
                          <h4 className="text-lg font-bold   text-gray-200 w-full">
                            {proj.name}
                          </h4>
                          <div className="flex flex-wrap gap-2 w-full">
                            <p className="text-gray-400 font-semibold text-sm">
                              {proj.description}
                              {proj.description}
                              {proj.description}
                            </p>
                          </div>
                          <div className="flex gap-3 mt-1">
                            <Button>
                              <DribbbleIcon />
                            </Button>
                            <Button>
                              <FigmaIcon />{" "}
                            </Button>
                            <Button>
                              <BsPinterest />
                            </Button>
                            <Button className="ml-auto">
                              +15 More <BiRightArrow />
                            </Button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </HoverCardTrigger>
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
