"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:kaleab@example.com";
  };

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-background to-background/95 border-t border-border/50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-0 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Main footer content */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              >
                [Kal_X]
              </motion.div>

              <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                <span>© {currentYear}</span>
                <span>•</span>
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
                </motion.div>
                <span>by Kaleab</span>
              </div>
            </div>

            {/* Mobile love message */}
            <div className="md:hidden flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
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
                size="icon"
                onClick={scrollToTop}
                className="rounded-full"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Copyright for mobile */}
          <div className="md:hidden text-xs text-muted-foreground">
            © {currentYear} Kal_X • All rights reserved
          </div>

          {/* Copyright for desktop */}
          <div className="hidden md:block text-xs text-muted-foreground">
            © {currentYear} Kal_X • All rights reserved • Built with Next.js &
            Tailwind CSS
          </div>

          {/* Inspirational quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs text-muted-foreground text-center max-w-md italic"
          >
            &quot;Turning ideas into digital experiences, one line of code at a
            time.&quot;
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
