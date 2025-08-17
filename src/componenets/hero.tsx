"use client";

import Image from "next/image";
import Kal_X from "../../public/Kal_X.png";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BiLogoDribbble,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTelegram,
} from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HeroSection() {
  return (
    <div
      className={`relative h-screen -mt-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between  px-5 ${inter.className}`}
    >
      {/* Background Image */}
      <Image
        src={Kal_X}
        alt="main img"
        fill
        className="absolute object-contain dark:brightness-[0.6] -z-10"
        priority
      />

      <motion.div
        className="z-10 flex flex-col gap-5 lg:max-w-fit text-center lg:text-left  "
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.p
          className="text-lg text-gray-300 tracking-widest"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hello,
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl font-light text-white tracking-wide "
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          I&apos;m <span className="font-bold">Kaleab Shewangizaw [Kal_X]</span>
        </motion.h1>

        <motion.p
          className="text-gray-300 not-dark:text-gray-200 mt-2 text-base sm:text-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          A <span className="text-white font-bold">Full Stack Developer</span>,{" "}
          <span className="text-white font-bold">Web Designer</span>, Tech
          Enthusiast, and Open Source Contributor.
        </motion.p>
        <motion.p
          className="mt-4 text-gray-100 text-center font-semibold lg:text-left text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.7 }}
        >
          I love building clean, interactive web experiences and exploring new
          tech trends.
        </motion.p>
        <motion.div
          className=" md:hidden flex gap-3 "
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7, staggerChildren: 0.1 }}
        >
          {[
            { icon: BsTwitterX, href: "https://x.com/KaleabShew27310" },
            {
              icon: BiLogoLinkedin,
              href: "https://linkedin.com/in/your-profile",
            },
            { icon: BiLogoTelegram, href: "https://t.me/yourusername" },
            {
              icon: BiLogoInstagram,
              href: "https://instagram.com/yourusername",
            },
            { icon: BiLogoGithub, href: "https://github.com/yourusername" },
            { icon: BiLogoDribbble, href: "https://dribbble.com/yourusername" },
          ].map((ic, i) => {
            const Icon = ic.icon;
            return (
              <motion.a
                key={i}
                href={ic.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-[#574a7c] bg-[#483e6b] dark:bg-[#292047] cursor-pointer text-xl text-white flex items-center justify-center"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-5 justify-center lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Button className="text-lg" variant="outline">
            See my Work
          </Button>
          <Button className="text-lg">Let&apos;s work together</Button>
        </motion.div>
      </motion.div>

      {/* Social Buttons */}
      <motion.div
        className="absolute right-5 bottom-10 hidden md:flex flex-col gap-3 lg:static lg:flex-row lg:mt-0 lg:ml-auto"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7, staggerChildren: 0.1 }}
      >
        {[
          { icon: BsTwitterX, href: "https://x.com/KaleabShew27310" },
          {
            icon: BiLogoLinkedin,
            href: "https://linkedin.com/in/your-profile",
          },
          { icon: BiLogoTelegram, href: "https://t.me/yourusername" },
          { icon: BiLogoInstagram, href: "https://instagram.com/yourusername" },
          { icon: BiLogoGithub, href: "https://github.com/yourusername" },
          { icon: BiLogoDribbble, href: "https://dribbble.com/yourusername" },
        ].map((ic, i) => {
          const Icon = ic.icon;
          return (
            <motion.a
              key={i}
              href={ic.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover:bg-[#574a7c] bg-[#483e6b] dark:bg-[#292047] cursor-pointer text-xl text-white flex items-center justify-center"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon />
            </motion.a>
          );
        })}
      </motion.div>
      <motion.div
        className="absolute bottom-10 md:bottom-15  left-20 -translate-x-1/2 text-white rounded-lg bg-[#483e6b] px-4 py-2 text-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ⬇ Scroll
      </motion.div>
    </div>
  );
}
