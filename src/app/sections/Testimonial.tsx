"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="text-center mt-1 max-w-full mx-auto p-5 pb-5 bg-muted/20 rounded-t-xl "
    >
      <div className="max-w-6xl mx-auto">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center "
        >
          <p className="text-muted-foreground  max-w-2xl mx-auto not-dark:text-white">
            Let&apos;s discuss how I can help bring your project to life with
            clean code and innovative solutions.
          </p>
        </motion.div>
        <motion.div
          className=" rounded-full mt-2 mx-auto  text-center flex justify-center"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={30} />{" "}
        </motion.div>
      </div>
    </section>
  );
}
