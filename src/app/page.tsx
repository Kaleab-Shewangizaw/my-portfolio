"use client";

import AboutMe from "@/componenets/aboutMe";
import HeroSection from "@/componenets/hero";
import Navbar from "@/componenets/navbar";
import { ModeToggle } from "@/componenets/themeToggle";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-3 z-100  w-fit left-full mr-5">
        <ModeToggle />
      </div>
      <div className="-mt-8 w-[80%]  mx-auto relative">
        <Navbar />
        <HeroSection />
        <AboutMe />
      </div>
    </div>
  );
}
