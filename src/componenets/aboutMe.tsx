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

import { BadgeCheckIcon } from "lucide-react";

export default function AboutMe() {
  const [content, setContent] = useState("AboutMe");
  return (
    <div
      id="aboutMe"
      className="not-dark:bg-gray-300 dark:bg-[#41385d] py-5 md:py-7 px-3  md:px-7 rounded-md flex flex-col lg:flex-row md:gap-5 mb-10  gap-5"
    >
      <div className="flex flex-col items-center lg:w-1/3">
        <Image
          src={Kal_X}
          alt="me"
          width={200}
          className="rounded-full w-30 md:w-60"
        />

        <h1 className="font-bold mt-3 flex gap-2 text-lg  md:text-xl ">
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
      </div>

      <div className="lg:w-2/3 h-full rounded-md px-1 md:px-3 py-3">
        <div className="flex flex-col  gap-3">
          <div className=" self-center flex gap-0  md:gap-5 ">
            <Button
              className="text-[15px] px-3 font-normal"
              variant={`${content === "AboutMe" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("AboutMe");
              }}
            >
              About me
            </Button>
            <Button
              className="text-[15px] px-3 font-normal"
              variant={`${content === "Education" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("Education");
              }}
            >
              Education
            </Button>
            <Button
              className="text-[15px] px-3 font-normal"
              variant={`${content === "Hobbies" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("Hobbies");
              }}
            >
              Hobbies
            </Button>
            <Button
              className="text-[15px] px-3 font-normal"
              variant={`${content === "FunFact" ? "default" : "ghost"}`}
              onClick={() => {
                setContent("FunFact");
              }}
            >
              Fun fact
            </Button>
          </div>
          <div className="min-h-fit   mt-3">
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
