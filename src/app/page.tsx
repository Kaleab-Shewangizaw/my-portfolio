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
      <div className="-mt-8  w-[100%] mx-auto relative ">
        <Navbar />
        <section id="home" className="mb-12 md:mb-0">
          <HeroSection />
        </section>
        <div className="md:w-[90%] md:mt-10 mx-auto">
          <section id="about" className="pt-16">
            <AboutMe />
          </section>
          <section id="skills">
            <SkillsSection />
          </section>
          <section id="projects">
            <ProjectsSection />
          </section>
          <section id="testimonials"></section>
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      </div>
    </div>
  );
}
