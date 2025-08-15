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

export default function AboutMe() {
  const [content, setContent] = useState("AboutMe");
  return (
    <div
      id="aboutMe"
      className="not-dark:bg-gray-100/90 dark:bg-[#41385d] py-5 px-7 rounded-md flex flex-col lg:flex-row md:gap-5 mb-500 gap-5"
    >
      <div className="flex flex-col items-center lg:w-1/3">
        <Image src={Kal_X} alt="me" width={200} className="rounded-full " />

        <h1 className="font-bold mt-3">Kaleab Shewangizaw [Kal_X]</h1>
        <div className="flex h-5 items-center space-x-4 text-sm mt-3">
          <div className="min-w-fit">21 yo</div>
          <Separator orientation="vertical" />
          <div>M</div>
          <Separator orientation="vertical" />
          <div>Developer</div>
          <Separator orientation="vertical" />
          <div>Designer</div>
          <Separator orientation="vertical" />
          <div className="min-w-fit">🇪🇹 Ethiopian</div>
        </div>
      </div>
      <div className="lg:w-2/3 border rounded-md px-5 py-3">
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
