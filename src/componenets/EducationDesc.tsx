"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AAULogo from "../../public/aauLogo.png";
import ScrimbaLogo from "../../public/scrimba.webp";
import GDGLogo from "../../public/GDG.webp";
import A2SV from "../../public/A2SV.png";
import { Card, CardContent } from "@/components/ui/card";

export default function EducationDesc() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.5 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Education */}
      <motion.div variants={item}>
        <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Education
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Image
                    src={AAULogo}
                    alt="AAU Logo"
                    width={32}
                    height={32}
                    className="rounded"
                  />
                </div>
                <div>
                  <p className="font-medium">BSc in Chemical Engineering</p>
                  <p className="text-sm text-muted-foreground">
                    Addis Ababa University (AAiT)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5">
                  <Image
                    src={A2SV}
                    alt="AAU Logo"
                    width={32}
                    height={32}
                    className="rounded bg-white"
                  />
                </div>
                <div>
                  <p className="font-medium">A2SV</p>
                  <p className="text-sm text-muted-foreground">ex-student</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">FS</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Self-Taught Developer</p>
                  <p className="text-sm text-muted-foreground">
                    Full-Stack Development
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Certificates */}
      <motion.div variants={item}>
        <Card className="h-full bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Certifications
            </h3>
            <ul className="space-y-4">
              {[
                {
                  logo: ScrimbaLogo,
                  title: "Frontend Career Path",
                  provider: "Scrimba",
                },
                {
                  logo: ScrimbaLogo,
                  title: "Learn React",
                  provider: "Scrimba",
                },
                {
                  logo: ScrimbaLogo,
                  title: "Learn TypeScript",
                  provider: "Scrimba",
                },
                {
                  logo: GDGLogo,
                  title: "Web Dev Bootcamp Instructor",
                  provider: "GDG AAU",
                },
              ].map((cert, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5">
                    <Image
                      src={cert.logo}
                      alt={cert.provider}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{cert.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.provider}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activities */}
      <motion.div variants={item} className="md:col-span-2">
        <Card className="bg-background/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Activities
            </h3>
            <div className="flex items-start gap-3">
              <div className="mt-1.5">
                <Image
                  src={GDGLogo}
                  alt="GDG"
                  width={32}
                  height={32}
                  className="rounded"
                />
              </div>
              <div>
                <p className="font-medium">Web Development Instructor</p>
                <p className="text-sm text-muted-foreground">
                  Google Developer Groups - AAU
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
