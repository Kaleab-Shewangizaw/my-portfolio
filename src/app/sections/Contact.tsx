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

export default function ContactSection() {
  return (
    <section className="py-16 px-4 lg:px-16 bg-gradient-to-b from-[#332d43] to-[#41385d] text-white">
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
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-md p-3 bg-[#3c324f] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
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
          <div className="flex gap-4 mt-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#574a7c] rounded-full hover:bg-purple-600 transition-colors"
            >
              <BiLogoGithub className="text-xl" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#574a7c] rounded-full hover:bg-purple-600 transition-colors"
            >
              <BiLogoLinkedin className="text-xl" />
            </a>
            <a
              href="https://t.me/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#574a7c] rounded-full hover:bg-purple-600 transition-colors"
            >
              <BiLogoTelegram className="text-xl" />
            </a>
            <a
              href="https://dribbble.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#574a7c] rounded-full hover:bg-purple-600 transition-colors"
            >
              <BiLogoDribbble className="text-xl" />
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#574a7c] rounded-full hover:bg-purple-600 transition-colors"
            >
              <BiLogoInstagram className="text-xl" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
