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
          I&apos;m a <span className="font-semibold">Web Developer</span>{" "}
          passionate about building{" "}
          <span className="font-semibold">
            scalable, fast, and user-friendly web applications
          </span>
          .
        </p>

        <p>
          My journey started with the{" "}
          <span className="font-semibold">MERN Stack</span>, where I learned to
          take projects from database to deployment and mastered the
          fundamentals of modern web development.
        </p>

        <p>
          Over time, I&apos;ve honed my skills in{" "}
          <span className="font-semibold">full-stack development</span>,
          creating applications that not only work smoothly but also{" "}
          <em className="text-primary">deliver real impact</em>.
        </p>

        <p>
          Beyond code, I&apos;m self-driven, curious, and always eager to
          explore new technologies, solve challenges, and collaborate with
          others. My goal is simple:{" "}
          <span className="font-semibold">
            turn ideas into powerful digital solutions.
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
          className=""
        >
          Contact Me
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/KALEAB SHEWANGIZAW CV2.pdf";
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
