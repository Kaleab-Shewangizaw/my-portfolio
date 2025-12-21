"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Paperclip } from "lucide-react";
import PrimeLogo from "../../public/primeLogo.jpg";
import Image from "next/image";
import Link from "next/link";

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
          <span className="font-semibold text-primary">Kaleab</span> (aka{" "}
          <span className="font-semibold text-primary">Kal_X</span>) — a{" "}
          <span className="font-semibold">Full-Stack Web Developer</span>{" "}
          focused on building{" "}
          <span className="font-semibold">
            scalable, high-performance, and user-centric web applications
          </span>
          .
        </p>

        <p>
          I work across the stack using modern tools and frameworks, with strong
          experience turning ideas into reliable, production-ready solutions —
          from backend logic to clean, responsive user interfaces.
        </p>

        <p>
          I value clean architecture, performance, and real-world impact.
          I&apos;m proactive, adaptable, and continuously improving my craft to
          deliver software that solves meaningful problems.
        </p>

        <p className="font-bold text-lg pt-2">Experience</p>

        <div className="flex items-start gap-3">
          <div className="mt-1.5">
            <Image
              src={PrimeLogo}
              alt="Prime Software PLC Logo"
              width={32}
              height={32}
              className="rounded bg-white"
            />
          </div>
          <div>
            <p className="font-medium flex items-center">
              Prime Software PLC
              <Link
                href="https://primetechplc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block"
              >
                <Paperclip className="inline-block text-gray-300 w-4 h-4" />
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer
            </p>
          </div>
        </div>
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
