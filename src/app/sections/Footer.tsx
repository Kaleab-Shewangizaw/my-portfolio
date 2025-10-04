"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiFire } from "react-icons/hi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:kaleab.stk@gmail.com";
  };

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-transpatent to-background/20">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-0 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 py-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-lg font-semibold text-blue-700"
              >
                [Kal_X]
              </motion.div>

              <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground not-dark:text-gray-200">
                <span>&copy; {currentYear}</span>
                <span>•</span>
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HiFire className="w-6 h-6 mx-1 text-green-500 fill-current" />
                </motion.div>
                <span>by Kaleab</span>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-1 text-sm text-muted-foreground not-dark:text-gray-200">
              <span>Made with</span>
              <HiFire className="w-4 h-4 mx-1 text-green-500 fill-current" />
              <span>by Kaleab</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailClick}
                className="rounded-full gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="rounded-full flex"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" /> Back to top
              </Button>
            </div>
          </div>

          {/* Copyright for mobile */}
          <div className="md:hidden text-xs text-muted-foreground not-dark:text-gray-200">
            © {currentYear} Kal_X • All rights reserved
          </div>

          {/* Copyright for desktop */}
          <div className="hidden md:block text-xs text-muted-foreground not-dark:text-gray-200">
            © {currentYear} Kal_X • All rights reserved
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
