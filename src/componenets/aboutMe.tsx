"use client";

import Image from "next/image";
import Kal_X from "../../public/my.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AboutMeDesc from "./aboutMeDesc";
import EducationDesc from "./EducationDesc";
import Hobbiesdesc from "./HobbiesDesc";
import FunFactDesc from "./FunFactDesc";
import { motion } from "framer-motion";
import { BadgeCheckIcon } from "lucide-react";

export default function AboutMe() {
  const infoItems = [
    { label: "21 yo", color: "bg-green-500" },
    { label: "Male", color: "bg-blue-500" },
    { label: "Developer", color: "bg-purple-500" },
    { label: "Designer", color: "bg-pink-500" },
    { label: "🇪🇹 Ethiopian", color: "bg-yellow-500" },
  ];
  const [content, setContent] = useState("AboutMe");
  return (
    <div
      id="aboutMe"
      className="not-dark:bg-gray-300 dark:bg-[#41385d] py-7  px-7 rounded-md flex flex-col lg:flex-row md:gap-5 mb-10  gap-5"
    >
      <div className="flex flex-col items-center lg:w-1/3">
        <Image src={Kal_X} alt="me" width={200} className="rounded-full " />

        <h1 className="font-bold mt-3 flex gap-2 text-xl md:text-2xl">
          Kaleab Shewangizaw [Kal_X]{" "}
          <BadgeCheckIcon className="text-blue-600" />
        </h1>

        {/* Personal Info */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-3 text-sm">
          <div className="px-2 py-0.5 rounded bg-gray-700/50">21 yo</div>
          <div className="px-2 py-0.5 rounded bg-gray-700/50">Male</div>
          <div className="px-2 py-0.5 rounded bg-gray-700/50">🇪🇹 Ethiopian</div>
          <div className="px-2 py-0.5 rounded bg-gray-700/50">
            BSc Chemical Eng.
          </div>
          <div className="px-2 py-0.5 rounded bg-gray-700/50">
            MERN Stack Dev
          </div>
          <div className="px-2 py-0.5 rounded bg-gray-700/50">
            UI/UX Designer
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-3 w-3/4" />

        {/* Skills / Roles */}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <div className="px-3 py-1 rounded bg-green-500 text-white">
            Full-Stack Developer
          </div>
          <div className="px-3 py-1 rounded bg-blue-500 text-white">
            UI/UX Designer
          </div>
          <div className="px-3 py-1 rounded bg-purple-500 text-white">
            Tech Enthusiast
          </div>
          <div className="px-3 py-1 rounded bg-yellow-500 text-white">
            Content Creator
          </div>
        </div>
      </div>

      <div className="lg:w-2/3  rounded-md px-5 py-3">
        <div className="flex flex-col  gap-3">
          <div className=" self-center flex gap-5">
            <Button
              variant={`${content === "AboutMe" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("AboutMe");
              }}
            >
              About me
            </Button>
            <Button
              variant={`${content === "Education" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("Education");
              }}
            >
              Education
            </Button>
            <Button
              variant={`${content === "Hobbies" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("Hobbies");
              }}
            >
              Hobbies
            </Button>
            <Button
              variant={`${content === "FunFact" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("FunFact");
              }}
            >
              Fun fact
            </Button>
          </div>
          <div className="min-h-fit h-60  mt-3">
            {content === "AboutMe" ? (
              <AboutMeDesc />
            ) : content === "Education" ? (
              <EducationDesc />
            ) : content === "Hobbies" ? (
              <Hobbiesdesc />
            ) : (
              <FunFactDesc />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
