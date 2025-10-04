"use client";

import { JSX, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  BiLogoCss3,
  BiLogoHtml5,
  BiLogoJavascript,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
  BiLogoGit,
  BiLogoGithub,
  BiLogoBootstrap,
  BiLogoPython,
} from "react-icons/bi";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiJest,
  SiPostman,
  SiFigma,
  SiAdobephotoshop,
  SiCanva,
  SiLinux,
  SiRedux,
  SiGraphql,
  SiPrisma,
  SiNpm,
  SiVite,
  SiShadcnui,
  SiPhp,
  SiLaravel,
} from "react-icons/si";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const developmentSkills = [
    // --- High Demand + Your Strongest ---
    {
      icon: <BiLogoHtml5 className="w-6 h-6 md:w-8 md:h-8" />,
      name: "HTML",
      level: "Advanced",
    },
    {
      icon: <BiLogoCss3 className="w-6 h-6 md:w-8 md:h-8" />,
      name: "CSS",
      level: "Advanced",
    },
    {
      icon: <BiLogoTailwindCss className="w-6 h-6 md:w-8 md:h-8" />,
      name: "TailwindCSS",
      level: "Advanced",
    },
    {
      icon: <BiLogoJavascript className="w-6 h-6 md:w-8 md:h-8" />,
      name: "JavaScript",
      level: "Advanced",
    },
    {
      icon: <BiLogoTypescript className="w-6 h-6 md:w-8 md:h-8" />,
      name: "TypeScript",
      level: "Intermediate",
    },
    {
      icon: <BiLogoReact className="w-6 h-6 md:w-8 md:h-8" />,
      name: "React",
      level: "Advanced",
    },
    {
      icon: <SiNextdotjs className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Next.js",
      level: "Intermediate",
    },
    {
      icon: <SiShadcnui className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Shadcn UI",
      level: "Intermediate",
    },
    {
      icon: <BiLogoNodejs className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Node.js",
      level: "Intermediate",
    },
    {
      icon: <SiExpress className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Express.js",
      level: "Intermediate",
    },
    {
      icon: <SiMongodb className="w-6 h-6 md:w-8 md:h-8" />,
      name: "MongoDB",
      level: "Intermediate",
    },
    {
      icon: <SiPrisma className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Prisma ORM",
      level: "Intermediate",
    },
    {
      icon: <SiPostgresql className="w-6 h-6 md:w-8 md:h-8" />,
      name: "PostgreSQL",
      level: "Intermediate",
    },
    {
      icon: <SiMysql className="w-6 h-6 md:w-8 md:h-8" />,
      name: "MySQL",
      level: "Intermediate",
    },
    {
      icon: <SiFirebase className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Firebase",
      level: "Intermediate",
    },
    // --- Secondary but Useful ---
    {
      icon: <SiRedux className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Redux",
      level: "Intermediate",
    },
    {
      icon: <BiLogoBootstrap className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Bootstrap",
      level: "Intermediate",
    },
    {
      icon: <BiLogoPython className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Python",
      level: "Intermediate",
    },
    {
      icon: <SiGraphql className="w-6 h-6 md:w-8 md:h-8" />,
      name: "GraphQL",
      level: "Basic",
    },
    // --- Low Priority / Side Exploration ---
    {
      icon: <SiPhp className="w-6 h-6 md:w-8 md:h-8" />,
      name: "PHP",
      level: "Basic",
    },
    {
      icon: <SiLaravel className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Laravel",
      level: "Basic",
    },
  ];

  const developmentTools = [
    {
      icon: <BiLogoGit className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Git",
      level: "Advanced",
    },
    {
      icon: <BiLogoGithub className="w-6 h-6 md:w-8 md:h-8" />,
      name: "GitHub",
      level: "Advanced",
    },
    {
      icon: <SiNpm className="w-6 h-6 md:w-8 md:h-8" />,
      name: "NPM",
      level: "Advanced",
    },
    {
      icon: <SiPostman className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Postman",
      level: "Intermediate",
    },
    {
      icon: <SiVite className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Vite",
      level: "Intermediate",
    },
    {
      icon: <SiJest className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Jest",
      level: "Intermediate",
    },
    {
      icon: <SiLinux className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Linux",
      level: "Intermediate",
    },
    {
      icon: <SiDocker className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Docker",
      level: "Basic",
    },
  ];

  const designTools = [
    {
      icon: <SiFigma className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Figma",
      level: "Intermediate",
    },
    {
      icon: <SiCanva className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Canva",
      level: "Intermediate",
    },
    {
      icon: <SiAdobephotoshop className="w-6 h-6 md:w-8 md:h-8" />,
      name: "Photoshop",
      level: "Basic",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "from-green-400 to-emerald-600";
      case "Intermediate":
        return "from-blue-400 to-cyan-600";
      case "Basic":
        return "from-purple-400 to-indigo-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const renderSection = (
    title: string,
    items: { icon: JSX.Element; name: string; level: string }[]
  ) => (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      className="mb-10 w-full"
    >
      <motion.h2
        className="text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 not-dark:from-white not-dark:to-blue-300 bg-clip-text text-transparent flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-2 h-2 rounded-full bg-gray-100 animate-pulse"></div>
        {title}
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="group relative bg-card rounded-xl p-4 flex flex-col items-center justify-center border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            <div className="text-primary mb-3 p-2 rounded-lg bg-primary/10 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h3 className="font-medium text-sm text-center mb-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <div className="w-full bg-muted rounded-full h-1.5 mt-2">
              <div
                className={`h-1.5 rounded-full bg-gradient-to-r ${getLevelColor(
                  item.level
                )}`}
                style={{
                  width:
                    item.level === "Advanced"
                      ? "90%"
                      : item.level === "Intermediate"
                      ? "70%"
                      : "50%",
                }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground mt-1">
              {item.level}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 px-4 lg:px-8 max-w-7xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4 ">Skills & Technologies</h1>
        <p className="">
          Here are the technologies and tools I work with to bring ideas to life
        </p>
      </motion.div>

      <div className="space-y-12">
        {renderSection("Development Skills", developmentSkills)}
        {renderSection("Development Tools", developmentTools)}
        {renderSection("Design Tools", designTools)}
      </div>
    </section>
  );
}
