"use client";

import Image from "next/image";
import Kal_X from "../../../public/Kal_X.png";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BiLogoGithub, BiLogoLinkedin, BiLogoTelegram } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HeroSection() {
  return (
    <div
      className={`relative h-screen mt-10 flex flex-col items-center justify-center px-5 overflow-hidden ${inter.className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background not-dark:from-transparent not-dark:via-transparent not-dark:to-background/30 z-0" />

      <Image
        src={Kal_X}
        alt="Kaleab Shewangizaw"
        fill
        className="absolute object-cover dark:brightness-[0.6] brightness-[0.8] -z-10"
        priority
      />

      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-purple-500 opacity-50 not-dark:opacity-100 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-blue-500 opacity-25 not-dark:opacity-100 animate-bounce"></div>
      <div className="absolute bottom-1/4 left-1/3 w-3 h-3 rounded-full bg-cyan-400 opacity-25 not-dark:opacity-100 animate-ping"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-3xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border mb-4"
        >
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
          <span className="text-sm font-medium">
            Available for new projects
          </span>
        </motion.div>
        <motion.p
          className="text-lg font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Hello,
        </motion.p>

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          I&apos;m{" "}
          <span className="bg-clip-text text-transparent bg-blue-950 dark:bg-blue-700 font-extrabold">
            Kaleab Shewangizaw [Kal_X]
          </span>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl text-muted-foreground  font-light not-dark:text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <span className="text-foreground not-dark:text-gray-200 font-medium">
            • Full Stack Web Developer
          </span>{" "}
        </motion.div>

        <motion.p
          className="text-lg  text-gray-200 dark:text-gray-300 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          I build modern, responsive web applications with clean code and
          intuitive user interfaces.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mt-0 sm:mt-8 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 shadow-lg"
            onClick={() => {
              const contactSection = document.getElementById("projects");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Let&apos;s Connect
          </Button>
        </motion.div>

        <motion.div
          className="flex gap-4 mt-8 sm:mt-12 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
        >
          {[
            {
              icon: BsTwitterX,
              href: "https://x.com/KaleabShew27310",
              label: "Twitter",
            },
            {
              icon: BiLogoLinkedin,
              href: "https://linkedin.com/in/kal-x",
              label: "LinkedIn",
            },
            {
              icon: BiLogoGithub,
              href: "https://github.com/Kaleab-Shewangizaw",
              label: "GitHub",
            },
            {
              icon: BiLogoTelegram,
              href: "https://t.me/kal_ab_s",
              label: "Telegram",
            },
          ].map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <Icon className="text-xl" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2  flex-col items-center hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="text-sm text-muted-foreground not-dark:text-gray-200 mb-2">
          Scroll to explore
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-border not-dark:border-gray-300 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary not-dark:bg-secondary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
