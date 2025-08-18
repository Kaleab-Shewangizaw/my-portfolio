"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoTelegram,
  BiLogoInstagram,
  BiLogoDribbble,
} from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { BsTwitterX } from "react-icons/bs";

export default function ContactSection() {
  return (
    <section className="pt-16 pb-25 px-4 lg:px-16  text-white">
      <motion.h2
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Get in Touch
      </motion.h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.form
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Input
            type="text"
            placeholder="Your Name"
            className="rounded-md p-3 bg-[#3c324f] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="rounded-md p-3 bg-[#3c324f] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <textarea
            placeholder="Your Message"
            className="rounded-md p-3 bg-[#3c324f] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none h-32"
          />
          <Button type="submit" className="mt-2">
            Send Message
          </Button>
        </motion.form>

        {/* Contact Info & Socials */}
        <motion.div
          className="flex flex-col gap-6 justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg">
            I’m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out!
          </p>
          <Button>Book a call</Button>
          <div className="flex gap-4 mt-4">
            {[
              { icon: BsTwitterX, href: "https://x.com/KaleabShew27310" },
              {
                icon: BiLogoLinkedin,
                href: "https://linkedin.com/in/your-profile",
              },
              { icon: BiLogoTelegram, href: "https://t.me/yourusername" },
              {
                icon: BiLogoInstagram,
                href: "https://instagram.com/yourusername",
              },
              { icon: BiLogoGithub, href: "https://github.com/yourusername" },
              {
                icon: BiLogoDribbble,
                href: "https://dribbble.com/yourusername",
              },
            ].map((ic, i) => {
              const Icon = ic.icon;
              return (
                <motion.a
                  key={i}
                  href={ic.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-[#574a7c] bg-[#483e6b] dark:bg-[#292047] cursor-pointer text-xl text-white flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
