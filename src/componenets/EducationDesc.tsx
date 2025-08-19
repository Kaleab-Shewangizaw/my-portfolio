"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AAULogo from "../../public/aauLogo.png";
import ScrimbaLogo from "../../public/scrimba.webp";
import GDGLogo from "../../public/GDG.webp";
import A2SV from "../../public/A2SV.png";

export default function EducationDesc() {
  const container = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm"
    >
      {/* Education */}
      <motion.ul
        variants={item}
        className="flex flex-col gap-4 bg-gray-900/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <li className="font-semibold text-white">Education</li>
        <li className="text-gray-300 font-bold">
          Self-Taught Full-Stack Developer
        </li>
        <li className="flex items-center gap-2 text-gray-300">
          <Image src={AAULogo} alt="AAU Logo" width={40} height={40} />
          BSc in Engineering (AAiT)
        </li>
        <li className="flex items-center gap-2 text-gray-300">
          <Image
            src={A2SV}
            alt="A2SV"
            width={40}
            height={40}
            className="bg-gray-200 rounded-md"
          />
          A2SV dropout
        </li>
      </motion.ul>

      {/* Certificates */}
      <motion.ul
        variants={item}
        className="flex flex-col gap-4 bg-gray-900/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition text-gray-300"
      >
        <li className="font-semibold text-white">Certificates</li>
        <li className="flex items-center gap-2">
          <Image
            src={ScrimbaLogo}
            alt="Scrimba"
            width={40}
            height={40}
            className="rounded-md"
          />
          Scrimba Frontend Career Path
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={ScrimbaLogo}
            alt="Scrimba"
            width={40}
            height={40}
            className="rounded-md"
          />
          Learn React
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={ScrimbaLogo}
            alt="Scrimba"
            width={40}
            height={40}
            className="rounded-md"
          />
          Learn Typescript
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={GDGLogo}
            alt="GDG"
            width={40}
            height={40}
            className="rounded-md"
          />
          Web Dev Bootcamp instructor
        </li>
      </motion.ul>

      {/* Clubs / Activities */}
      <motion.ul
        variants={item}
        className="flex flex-col gap-2 bg-gray-900/60 p-4 rounded-2xl shadow-md hover:shadow-lg transition text-gray-300"
      >
        <li className="font-semibold text-white">Activities</li>
        <li className="flex items-center gap-2">
          <Image src={GDGLogo} alt="GDG" width={40} height={40} />
          Web Dev Instructor – GDG AAU
        </li>
      </motion.ul>
    </motion.div>
  );
}
