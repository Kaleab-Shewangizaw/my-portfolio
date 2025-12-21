"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Guava from "../../../public/Guava_logo.png";
import SummerPlanner from "../../../public/Summer_v1.png";
import SummerPlanner2 from "../../../public/Summer_v2.png";
import Pazimo from "../../../public/pazimo.png";
import QLink from "../../../public/QLinkI.png";
import GymConnect from "../../../public/GymConnect.png";
import { Button } from "@/components/ui/button";
import { BsExclamation, BsGithub, BsPinterest } from "react-icons/bs";
import { DribbbleIcon, ExternalLink, FigmaIcon, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const devProjects = [
  {
    name: "Pazimo",
    description:
      "Your one-stop destination for discovering and booking tickets for the best events.",
    tech: [
      "Next.js",
      "SantimPay",
      "Chapa",
      "Node.js",
      "MongoDB",
      "Tailwind",
      "TypeScript",
    ],
    img: Pazimo,
    github: "https://github.com/Kaleab-Shewangizaw/Pazimo",
    live: "https://pazimo.com",
    featured: true,
    underDevelopment: false,
  },
  {
    name: "Guava Social Blog",
    description:
      "A social blogging platform with communities, posts, likes, and trends.",
    tech: ["React", "Next.js", "Tailwind", "Node.js", "MongoDB"],
    img: Guava,
    github: "https://github.com/Kaleab-Shewangizaw/Guava",
    live: "#",
    featured: true,
    underDevelopment: false,
  },
  {
    name: "Summer Planner",
    description: "A web app to plan and organize your summer activities.",
    tech: ["React", "Express.js", "MongoDB", "Node.js"],
    img: SummerPlanner,
    github: "https://github.com/Kaleab-Shewangizaw/Summer_Planner",
    live: "#",
    featured: false,
    underDevelopment: false,
  },
  {
    name: "Summer Planner V2",
    description:
      "A revamped version of Summer Planner with enhanced features and UI.",
    tech: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    img: SummerPlanner2,
    github: "https://github.com/Kaleab-Shewangizaw/Summer_planner_v2",
    live: "#",
    featured: true,
    underDevelopment: false,
  },
  {
    name: "GymConnect",
    description:
      "A platform to connect gym enthusiasts, trainers, gyms with their clients, customers. and also to share workout routines and diet plans.",
    tech: [
      "NextJs",
      "Better-auth",
      "Shadcn UI",
      "Tailwind",
      "MongoDB",
      "TypeScript",
    ],
    img: GymConnect,
    github: "https://github.com/Kaleab-Shewangizaw/Gym-connect",
    live: "#",
    featured: true,
    underDevelopment: false,
  },
  {
    name: "QLink",
    description:
      "Mini stackoverflow clone with question and answer features. and also to share links which allow users to upvote and downvote. and also ask questions.",
    tech: [
      "Next",
      "Better-auth",
      "Shadcn UI",
      "Tailwind",
      "MongoDB",
      "TypeScript",
    ],
    img: QLink,
    github: "https://github.com/Kaleab-Shewangizaw/QLink",
    live: "https://qlink-one.vercel.app",
    featured: true,
    underDevelopment: false,
  },
];

interface DesignProject {
  name: string;
  description: string;
  img: string;
  dribbble: string;
  figma: string;
  pinterest: string;
}

const designProjects: DesignProject[] | [] = [];

export default function ProjectsSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<
    "development" | "design"
  >("development");

  return (
    <section id="projects" className="py-16 px-4 lg:px-8 w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 "
      >
        <h2 className="text-4xl font-bold mb-4 ">Featured Projects</h2>
        <p className=" max-w-2xl mx-auto ">
          Here are some of my recent projects that showcase my skills in
          development and design
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant={activeCategory === "development" ? "default" : "outline"}
            onClick={() => setActiveCategory("development")}
            className="rounded-full px-6"
          >
            Development
          </Button>
          <Button
            variant={activeCategory === "design" ? "default" : "outline"}
            onClick={() => setActiveCategory("design")}
            className="rounded-full px-6"
          >
            Design
          </Button>
        </div>
      </motion.div>

      {/* Development Projects */}
      <AnimatePresence mode="wait">
        {activeCategory === "development" && (
          <motion.div
            key="development"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-semibold mb-10 text-center flex items-center justify-center gap-2 text-gray-200">
              <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse "></div>
              Development Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devProjects.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative bg-card not-dark:bg-[#101828] rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {proj.featured && (
                    <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}
                  {proj.underDevelopment && (
                    <div className="absolute top-3 right-3 z-10 bg-yellow-200/10 text-gray-100/30 text-xs font-medium px-2 py-1 rounded-full flex items-center ">
                      <BsExclamation className="w-5 h-5 fill-current" />
                      Under Development
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={proj.img}
                      alt={proj.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 not-dark:from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex gap-2">
                        <Link
                          href={proj.github}
                          target="_blank"
                          className="w-full"
                        >
                          <Button size="sm" className="rounded-full">
                            <BsGithub className="w-4 h-4 mr-1" />
                            Code
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full"
                          disabled={proj.live === "#"}
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Live Demo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-lg mb-2 not-dark:text-secondary transition-colors">
                      {proj.name}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {proj.tech.slice(0, 4).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary not-dark:text-primary-foreground not-dark:bg-secondary/10 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.tech.length > 4 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{proj.tech.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 px-5 pb-5 md:hidden">
                    <Link href={proj.github} target="_blank" className="w-full">
                      <Button size="sm" className="rounded-full">
                        <BsGithub className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      disabled={proj.live === "#"}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <Link href={proj.live} target="_blank">
                        Live Demo
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Design Projects */}
      <AnimatePresence mode="wait">
        {activeCategory === "design" && (
          <motion.div
            key="design"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-10 text-center flex items-center text-gray-200 justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></div>
              {designProjects.length > 0
                ? "Design Projects"
                : "No design projects for now... :("}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {designProjects.length > 0 ? (
                designProjects.map((proj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                    onMouseEnter={() =>
                      setHoveredProject(i + devProjects.length)
                    }
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={proj.img}
                        alt={proj.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <h4 className="font-bold text-xl mb-2 text-white">
                          {proj.name}
                        </h4>
                        <p className="text-gray-300 text-sm mb-4">
                          {proj.description}
                        </p>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="rounded-full bg-white/10 not-dark:bg-black/80 not-dark:hover:bg-black/60 backdrop-blur-sm text-white hover:bg-white/20"
                          >
                            <DribbbleIcon className="w-4 h-4 mr-1" />
                            Dribbble
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-white/30 text-white  hover:bg-black/10 not-dark:border-black/80 not-dark:bg-black/50"
                          >
                            <FigmaIcon className="w-4 h-4 mr-1" />
                            Figma
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 md:hidden">
                      <h4 className="font-bold text-lg mb-2">{proj.name}</h4>
                      <p className="text-muted-foreground text-sm mb-3">
                        {proj.description}
                      </p>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <DribbbleIcon className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FigmaIcon className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BsPinterest className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mt-16 p-8 bg-muted/20 rounded-xl"
      >
        <h3 className="text-2xl font-semibold mb-4 ">Want to see more?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto not-dark:text-gray-900">
          I&apos;m constantly working on new projects and improving my skills.
          Check out my GitHub for more code or my design profiles for UI/UX
          work.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="https://github.com/Kaleab-Shewangizaw" target="_blank">
            <Button className="rounded-full gap-2">
              <BsGithub className="w-4 h-4" />
              GitHub Profile
            </Button>
          </Link>
          {/* <Link href="" target="_blank">
            <Button variant="outline" className="rounded-full gap-2">
              <DribbbleIcon className="w-4 h-4" />
              Design Portfolio
            </Button>
          </Link> */}
        </div>
      </motion.div>
    </section>
  );
}
