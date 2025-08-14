"use client";

import { InstagramIcon, TextSelect, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Kal_X from "../../public/Kal_X .png";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="pt-20 flex items-start justify-between">
      <div className="flex flex-col gap-10 w-30">
        {/* icons go here */}
        <InstagramIcon />
        <Twitter />
        <TextSelect />
        <Youtube />
      </div>

      <div>
        {/* the bar goes here */}
        <div className="w-10 border mt-4  border-gray-700 dark:border-gray-200"></div>
      </div>

      <div>
        <h1 className=" text-lg text-gray-700 dark:text-gray-200 mt-0.5">
          Hello,
        </h1>
        <p className="font-bold text-5xl  mt-3 text-gray-200">
          <span className="text-gray-700 dark:text-gray-200 font-normal">
            I&apos;m
          </span>{" "}
          Kaleab Shewangizaw [Kal_X]
        </p>
        <p className="text-lg text-gray-100 dark:text-gray-200 mt-3">
          Full-stack web developer and aspirng web designer
        </p>
        <Button className="mt-10 not-dark:bg-amber-600 dark:text-amber-50">
          Learn More
        </Button>
      </div>
      <div>
        <Image
          src={Kal_X}
          alt="profile_pic"
          width={200}
          className="rounded-full "
        />
      </div>
    </div>
  );
}
