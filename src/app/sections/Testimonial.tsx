"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      image: "/placeholder-avatar.jpg", // Replace with actual image path
      content:
        "Kaleab delivered exceptional work on our web application. His attention to detail and problem-solving skills helped us launch two weeks ahead of schedule. Would definitely hire again!",
      rating: 5,
      project: "E-commerce Platform",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Startup Founder",
      image: "/placeholder-avatar.jpg",
      content:
        "Working with Kal_X was a game-changer for our business. He not only developed a beautiful website but also provided valuable insights that improved our user experience significantly.",
      rating: 5,
      project: "SaaS Dashboard",
    },
    {
      id: 3,
      name: "Amina Mohammed",
      role: "Creative Director",
      image: "/placeholder-avatar.jpg",
      content:
        "I'm impressed with Kaleab's ability to understand design concepts and translate them into functional code. His full-stack skills are truly remarkable.",
      rating: 5,
      project: "Portfolio Website",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "CTO at StartupHub",
      image: "/placeholder-avatar.jpg",
      content:
        "Rarely do you find a developer who excels in both frontend and backend. Kaleab's work on our API integration was flawless and his React components are perfectly crafted.",
      rating: 5,
      project: "API Integration Project",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section
      id="testimonials"
      className="pt-20 pb-5 px-4 lg:px-8 bg-muted/30 rounded-t-lg "
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border"
          >
            <Quote className="w-12 h-12 text-primary/30 mb-4" />

            <div className="flex items-start mb-6">
              <div className="flex-1">
                <p className="text-lg italic text-foreground mb-6">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[currentIndex].rating
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Project: {testimonials[currentIndex].project}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary not-dark:bg-white w-6"
                      : "bg-muted-foreground/30 not-dark:bg-gray-200"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "15+", label: "Projects Completed" },
            { number: "12", label: "Happy Clients" },
            { number: "100%", label: "Client Satisfaction" },
            { number: "2+", label: "Years Experience" },
          ].map((stat, index) => (
            <div
              key={index}
              className=" rounded-xl p-6 text-center border border-border bg-gray-900/90"
            >
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {stat.number}
              </p>
              <p className="text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto not-dark:text-white">
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
