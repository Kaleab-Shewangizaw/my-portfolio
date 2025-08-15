"use client";

import HeroSection from "@/componenets/hero";
import Navbar from "@/componenets/navbar";
import { ModeToggle } from "@/componenets/themeToggle";

export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-5 z-100">
        <ModeToggle />
      </div>
      <div className="-mt-8">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
