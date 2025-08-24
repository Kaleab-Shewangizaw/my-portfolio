"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutMeDesc() {
  return (
    <motion.div
      className="flex flex-col gap-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-base leading-relaxed text-justify space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p>
          Hi, I&apos;m{" "}
          <span className="font-semibold text-primary">Kaleab</span> — but you
          can call me <span className="font-semibold text-primary">Kal_X</span>.
          I&apos;m a <span className="font-semibold">Developer & Designer</span>{" "}
          passionate about crafting{" "}
          <span className="font-semibold">full-stack applications</span> that
          are powerful, beautiful and user-friendly.
        </p>

        <p>
          My journey started with the{" "}
          <span className="font-semibold">MERN Stack</span>, where I mastered
          the fundamentals of building scalable apps. But my curiosity pulled me
          into the world of <span className="font-semibold">UI/UX</span> —
          typography, color theory, layout, and design systems.
        </p>

        <p>
          Now, I merge{" "}
          <span className="font-semibold">technical expertise</span> with{" "}
          <span className="font-semibold">design sensibility</span> to build
          experiences that don&apos;t just work — they{" "}
          <em className="text-primary">stand out</em>.
        </p>

        <p>
          Beyond code, I&apos;m deeply curious, self-driven, and always eager to
          explore new technologies, solve problems, and collaborate with
          like-minded people. My goal is simple:{" "}
          <span className="font-semibold">
            turn ideas into impactful digital solutions.
          </span>
        </p>
      </motion.div>

      <motion.div
        className="flex gap-3 items-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Button
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
