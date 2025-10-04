"use client";

import Image from "next/image";
import Kal_X from "../../../public/my.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AboutMeDesc from "../../componenets/aboutMeDesc";
import EducationDesc from "../../componenets/EducationDesc";
import FunFactDesc from "../../componenets/FunFactDesc";
import { motion, AnimatePresence } from "framer-motion";

import { BadgeCheckIcon, SparklesIcon } from "lucide-react";
import ServicesDesc from "../../componenets/ServicesDesc";
import { text } from "stream/consumers";

export default function AboutMe() {
  const [content, setContent] = useState("AboutMe");
  const [hoverTab, setHoverTab] = useState("");

  const tabs = [
    { id: "AboutMe", label: "About Me" },
    { id: "Education", label: "Education" },
    { id: "Services", label: "Services" },
    { id: "FunFact", label: "Fun Facts" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      id="aboutMe"
      className="relative not-dark:bg-[#aaa3be] dark:bg-[#232b42] py-8 md:py-12 px-4 md:px-8 rounded-xl flex flex-col lg:flex-row gap-8 mb-16 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

      <div className="flex flex-col items-center lg:w-2/5">
        <motion.div
          className="relative"
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src={Kal_X}
            alt="Kaleab Shewangizaw"
            width={240}
            height={240}
            className="rounded-full border-4 border-white/10 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2  border text-xs font-bold py-1 px-3 rounded-full">
            <SparklesIcon className="inline w-3 h-3 mr-1" />
            DEV
          </div>
        </motion.div>

        <motion.h1
          className="font-bold mt-5 flex gap-2 text-xl md:text-2xl items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Kaleab Shewangizaw
          <BadgeCheckIcon className="text-blue-500 w-6 h-6" />
        </motion.h1>

        <motion.p
          className="text-muted-foreground not-dark:text-gray-800 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          • Full Stack Web Developer
        </motion.p>

        {/* Personal Info */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-5 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { text: "21 yo" },
            { text: "Male" },
            { text: "Ethiopian" },
            { text: "Student" },
            { text: "BSc Eng." },
            { text: "Full Stack" },
            { text: "Web Developer" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="px-3 py-1.5 rounded-full bg-background/70 border border-border text-sm flex items-center gap-1.5 backdrop-blur-sm"
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Separator className="w-3/4 lg:hidden" />

      <div className="lg:w-3/5 h-full rounded-xl px-2 md:px-4 py-4">
        <div className="flex flex-col gap-5">
          <div className="self-center flex gap-1 bg-muted p-1.5 rounded-xl">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                className={`relative text-sm px-4 py-2 rounded-lg transition-all ${
                  content === tab.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                variant={content === tab.id ? "default" : "ghost"}
                onClick={() => setContent(tab.id)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab("")}
              >
                {content === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r  rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </Button>
            ))}
          </div>

          <div className="min-h-[300px] mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={content}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {content === "AboutMe" ? (
                  <AboutMeDesc />
                ) : content === "Education" ? (
                  <EducationDesc />
                ) : content === "Services" ? (
                  <ServicesDesc />
                ) : (
                  <FunFactDesc />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
