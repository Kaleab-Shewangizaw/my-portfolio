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
  const inView = useInView(sectionRef, { once: true, margin: "-150px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const developmentSkills = [
    { icon: <BiLogoHtml5 className="text-2xl md:text-5xl" />, name: "HTML" },
    { icon: <BiLogoCss3 className="text-2xl md:text-5xl" />, name: "CSS" },
    {
      icon: <BiLogoTailwindCss className="text-2xl md:text-5xl" />,
      name: "TailwindCSS",
    },
    {
      icon: <BiLogoBootstrap className="text-2xl md:text-5xl" />,
      name: "Bootstrap",
    },
    {
      icon: <SiShadcnui className="text-2xl md:text-5xl" />,
      name: "Shadcn Ui",
    },
    {
      icon: <BiLogoJavascript className="text-2xl md:text-5xl" />,
      name: "JavaScript",
    },
    {
      icon: <BiLogoTypescript className="text-2xl md:text-5xl" />,
      name: "TypeScript",
    },
    {
      icon: <BiLogoPython className="text-2xl md:text-5xl" />,
      name: "Python",
    },
    { icon: <BiLogoReact className="text-2xl md:text-5xl" />, name: "React" },

    { icon: <SiNextdotjs className="text-2xl md:text-5xl" />, name: "Next.js" },
    { icon: <SiRedux className="text-2xl md:text-5xl" />, name: "Redux" },

    {
      icon: <BiLogoNodejs className="text-2xl md:text-5xl" />,
      name: "Node.js",
    },
    {
      icon: <SiExpress className="text-2xl md:text-5xl" />,
      name: "Express.js",
    },
    { icon: <SiMongodb className="text-2xl md:text-5xl" />, name: "MongoDB" },
    {
      icon: <SiPostgresql className="text-2xl md:text-5xl" />,
      name: "PostgreSQL",
    },
    {
      icon: <SiPhp className="text-2xl md:text-5xl" />,
      name: "PHP",
    },
    {
      icon: <SiLaravel className="text-2xl md:text-5xl" />,
      name: "Laravel",
    },
    { icon: <SiMysql className="text-2xl md:text-5xl" />, name: "MySQL" },
    { icon: <SiFirebase className="text-2xl md:text-5xl" />, name: "Firebase" },
    { icon: <SiGraphql className="text-2xl md:text-5xl" />, name: "GraphQL" },
    { icon: <SiPrisma className="text-2xl md:text-5xl" />, name: "Prisma ORM" },
  ];

  const developmentTools = [
    { icon: <BiLogoGit className="text-2xl md:text-5xl" />, name: "Git" },
    { icon: <BiLogoGithub className="text-2xl md:text-5xl" />, name: "GitHub" },
    { icon: <SiDocker className="text-2xl md:text-5xl" />, name: "Docker" },
    { icon: <SiJest className="text-2xl md:text-5xl" />, name: "Jest" },
    { icon: <SiNpm className="text-2xl md:text-5xl" />, name: "NPM" },

    { icon: <SiVite className="text-2xl md:text-5xl" />, name: "Vite" },
    { icon: <SiPostman className="text-2xl md:text-5xl" />, name: "Postman" },
    { icon: <SiLinux className="text-2xl md:text-5xl" />, name: "Linux" },
  ];

  const designTools = [
    { icon: <SiFigma className="text-2xl md:text-5xl" />, name: "Figma" },
    { icon: <SiCanva className="text-2xl md:text-5xl" />, name: "Canva" },
    {
      icon: <SiAdobephotoshop className="text-2xl md:text-5xl" />,
      name: "Adobe Photoshop",
    },
  ];

  const renderSection = (
    title: string,
    items: { icon: JSX.Element; name: string }[]
  ) => (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="mb-5 "
    >
      <motion.h2
        className="text-2xl font-semibold text-gray-200 mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <div className="flex flex-wrap gap-2 items-center">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="rounded px-4 py-3 flex gap-3 flex-col items-center bg-[#332d43] text-white hover:scale-110 transition-transform duration-300"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {item.icon}
            <p className="text-sm md:text-lg text-center">{item.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div ref={sectionRef} className="mb-10 ">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
      >
        My Skills & Tools
      </motion.h1>

      <div className="flex items-start justify-between gap-3 flex-wrap">
        {renderSection("Development Skills", developmentSkills)}
        {renderSection("Development Tools", developmentTools)}
        {renderSection("Design Tools", designTools)}
      </div>
    </div>
  );
}
