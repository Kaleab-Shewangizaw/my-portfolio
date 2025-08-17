"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AboutMeDesc() {
  return (
    <motion.div
      className="flex flex-col gap-6 items-end"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.p
        className="text-base leading-relaxed text-justify"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Hi, I&apos;m <b>Kaleab</b> — but you can call me <b>Kal_X</b>. I&apos;m
        a <b>Developer & Designer</b> passionate about crafting
        <b> full-stack applications</b> that are not only powerful, but also
        beautiful and user-friendly.
        <hr className="border-transparent mt-3" />
        My journey started with the <b>MERN Stack</b>, where I mastered the
        fundamentals of building scalable apps. But my curiosity pulled me into
        the world of <b>UI/UX</b> — typography, color theory, layout, and design
        systems. Now, I merge
        <b> technical expertise</b> with <b>design sensibility</b> to build
        experiences that don’t just work — they <i>stand out</i>.
        <hr className="border-transparent mt-3" />
        Beyond code, I’m deeply curious, self-driven, and always eager to
        explore new technologies, solve problems, and collaborate with
        like-minded people. My goal is simple:
        <b> turn ideas into impactful digital solutions. </b>
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <Button>📬 Contact Me</Button>
        <Button variant="outline">📄 View Resume</Button>
        <Button variant="ghost">🤝 Let’s Collaborate</Button>
      </motion.div>
    </motion.div>
  );
}
