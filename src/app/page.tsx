"use client";

import AboutMe from "@/componenets/aboutMe";
import ContactSection from "@/componenets/Contact";
import HeroSection from "@/componenets/hero";
import Navbar from "@/componenets/navbar";
import ProjectsSection from "@/componenets/Projects";
import SkillsSection from "@/componenets/Skills";
import { ModeToggle } from "@/componenets/themeToggle";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-1 z-100  w-fit left-full mr-2 hidden md:block">
        <ModeToggle />
      </div>
      <div className="-mt-8  w-[100%] px-1 md:px-0 md:w-[90%]  mx-auto relative">
        <Navbar />
        <section id="home">
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
