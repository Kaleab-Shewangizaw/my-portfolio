"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AAULogo from "../../public/aauLogo.png";
import ScrimbaLogo from "../../public/file.svg";
import FreeCodeCampLogo from "../../public/file.svg";
import GDSCLogo from "../../public/file.svg";
import SCESLogo from "../../public/file.svg";

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
        className="flex flex-col gap-2 bg-gray-900/30 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <li className="font-semibold text-green-400">🎓 Education</li>
        <li className="flex items-center gap-2">
          <Image src={AAULogo} alt="AAU Logo" width={22} height={22} />
          BSc in Chemical Engineering (AAiT)
        </li>
        <li className="text-gray-300">Self-Taught Full-Stack Developer</li>
      </motion.ul>

      {/* Certificates */}
      <motion.ul
        variants={item}
        className="flex flex-col gap-2 bg-gray-900/30 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <li className="font-semibold text-blue-400">📜 Certificates</li>
        <li className="flex items-center gap-2">
          <Image src={ScrimbaLogo} alt="Scrimba" width={20} height={20} />
          Scrimba Frontend Career Path
        </li>
        <li className="flex items-center gap-2">
          <Image
            src={FreeCodeCampLogo}
            alt="FreeCodeCamp"
            width={20}
            height={20}
          />
          freeCodeCamp Responsive Web Design
        </li>
      </motion.ul>

      {/* Clubs / Activities */}
      <motion.ul
        variants={item}
        className="flex flex-col gap-2 bg-gray-900/30 p-4 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <li className="font-semibold text-purple-400">🌟 Activities</li>
        <li className="flex items-center gap-2">
          <Image src={GDSCLogo} alt="GDSC" width={20} height={20} />
          Web Dev Instructor – GDSC AAiT
        </li>
        <li className="flex items-center gap-2">
          <Image src={SCESLogo} alt="SCES" width={20} height={20} />
          President – SCES (Chemical Eng. Club)
        </li>
      </motion.ul>
    </motion.div>
  );
}
