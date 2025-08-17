"use client";

import AboutMe from "@/componenets/aboutMe";
import HeroSection from "@/componenets/hero";
import Navbar from "@/componenets/navbar";
import SkillsSection from "@/componenets/Skills";
import { ModeToggle } from "@/componenets/themeToggle";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-3 z-100  w-fit left-full mr-5 hidden md:block">
        <ModeToggle />
      </div>
      <div className="-mt-8 w-[90%]  mx-auto relative">
        <Navbar />
        <HeroSection />
        <AboutMe />
        <SkillsSection />
      </div>
    </div>
  );
}
