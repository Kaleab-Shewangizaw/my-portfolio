"use client";

import AboutMe from "@/app/sections/aboutMe";
import ContactSection from "@/app/sections/Contact";
import HeroSection from "@/app/sections/hero";
import Navbar from "@/componenets/navbar";
import ProjectsSection from "@/app/sections/Projects";
import SkillsSection from "@/app/sections/Skills";
import { ModeToggle } from "@/componenets/themeToggle";
import Footer from "./sections/Footer";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-1 z-100  w-fit left-full mr-2 hidden md:block">
        <ModeToggle />
      </div>
      <div className="-mt-8  w-[100%] px-1 md:px-0 md:w-[90%]  mx-auto relative">
        <Navbar />
        <section id="home" className="mb-12 md:mb-0">
          <HeroSection />
        </section>
        <section id="about">
          <AboutMe />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
