import Image from "next/image";
import Kal_X from "../../public/Kal_X.png";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  BiLogoDribbble,
  BiLogoGithub,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoTwitter,
} from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { CiAirportSign1 } from "react-icons/ci";
import { CgInstagram } from "react-icons/cg";
import { BsTelegram, BsTwitterX } from "react-icons/bs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HeroSection() {
  return (
    <div className={`h-screen relative  flex ${inter.className}  -mt-14`}>
      <Image
        src={Kal_X}
        alt="main img"
        width={700}
        className="absolute inset-0 -top-50 m-auto object-contain dark:brightness-[0.6] -z-10"
        priority
      />

      {/* Hero content */}
      <div className=" mt-65 ">
        <p className="text-lg text-gray-200 z-10 tracking-widest">Hello,</p>
        <div className="bg-black/25 px-8 z-2 pt-5 pb-10">
          <h1 className="text-5xl font-light text-white tracking-wider">
            I&apos;m{" "}
            <span className="font-bold ">Kaleab Shewangizaw [Kal_X]</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-10 border-2 border-gray-300"></div>

            <p className="text-lg text-gray-300">
              A{" "}
              <span className="text-white font-bold">Full Stack Developer</span>
              , <span className="text-white font-bold">Web Designer</span>, Tech
              Enthusiast, and Open Source Contributor.
            </p>
          </div>
        </div>
        <div className="flex gap-10 mt-5">
          <Button className="text-lg">See my Work</Button>
          <Button className="text-lg">Let&apos;s work together</Button>
        </div>
      </div>
      <div className=" ml-auto flex items-center flex-col justify-center gap-10 text-white">
        <BsTwitterX className=" text-xl" />
        <BiLogoLinkedin className="text-xl" />
        <BiLogoTelegram className=" text-xl" />
        <BiLogoInstagram className=" text-xl" />
        <BiLogoGithub className=" text-xl" />
        <BiLogoDribbble className=" text-xl" />
      </div>
    </div>
  );
}
