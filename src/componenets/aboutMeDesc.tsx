"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutMeDesc() {
  return (
    <motion.div
      className="flex flex-col gap-6 items-end  w-full"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-base leading-relaxed text-justify"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Hi, I&apos;m <b>Kaleab</b> — but you can call me <b>Kal_X</b>. I&apos;m
        a <b>Developer & Designer</b> passionate about crafting
        <b> full-stack applications</b> that are powerful, beautiful and
        user-friendly.
        <p></p> My journey started with the <b>MERN Stack</b>, where I mastered
        the fundamentals of building scalable apps. But my curiosity pulled me
        into the world of <b>UI/UX</b> — typography, color theory, layout, and
        design systems. Now, I merge
        <b> technical expertise</b> with <b>design sensibility</b> to build
        experiences that don&apos;t just work — they <i>stand out</i>. Beyond
        code, I&apos;m deeply curious, self-driven, and always eager to explore
        new technologies, solve problems, and collaborate with like-minded
        people. My goal is simple:
        <b> turn ideas into impactful digital solutions. </b>
      </motion.p>

      <motion.div
        className="flex gap-2 md:gap-4 items-end mt-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <Button
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Contact Me
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/KALEAB SHEWANGIZAW CV.pdf";
            link.download = "Kaleab_Shewangizaw_CV.pdf";

            link.click();
          }}
        >
          View Resume
        </Button>
      </motion.div>
    </motion.div>
  );
}
