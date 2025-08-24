"use client";

import AboutMe from "@/app/sections/aboutMe";
import ContactSection from "@/app/sections/Contact";
import HeroSection from "@/app/sections/hero";
import Navbar from "@/componenets/navbar";
import ProjectsSection from "@/app/sections/Projects";
import SkillsSection from "@/app/sections/Skills";
import TestimonialsSection from "./sections/Testimonial";

export default function Home() {
  return (
    <div className="relative">
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
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </div>
  );
}
