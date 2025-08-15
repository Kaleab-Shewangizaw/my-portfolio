import Image from "next/image";
import Kal_X from "../../public/Kal_X.png";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function HeroSection() {
  return (
    <div className={`h-screen relative  flex ${inter.className}`}>
      <Image
        src={Kal_X}
        alt="main img"
        width={900}
        className="absolute inset-0 m-auto object-contain dark:brightness-[0.6] -z-10"
        priority
      />

      {/* Hero content */}
      <div className="ml-30 mt-95 ">
        <p className="text-lg text-gray-200 z-10 tracking-widest">Hello,</p>
        <div className="bg-black/25 px-8 z-10 pt-5 pb-10">
          <h1 className="text-6xl font-light text-white tracking-wider">
            I&apos;m{" "}
            <span className="font-bold ">Kaleab Shewangizaw [Kal_X]</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-15 border-2 border-gray-300"></div>

            <p className="text-lg text-gray-300">
              A Full Stack Developer, Tech Enthusiast, and Open Source
              Contributor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
