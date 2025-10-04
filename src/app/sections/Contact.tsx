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
import { Textarea } from "@/components/ui/textarea";
import { BsTwitterX } from "react-icons/bs";
import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, Send } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<null | string>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzjvdyq";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("Success");
        setMessage("Message sent successfully!");
        form.reset();
      } else {
        setStatus("Error");
        setMessage("Failed to send. Please try again later.");
      }
    } catch (err) {
      setStatus("Error");
      setMessage("Network error. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "kaleab.stk@gmail.com",
      href: "mailto:kaleab.stk@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+251 906 983 178",
      href: "tel:+251906983178",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Addis Ababa, Ethiopia",
      href: "#",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      href: "https://calendly.com/kal_x", // ✅ Calendly
      value: "Schedule a Call",
      label: "Book a Call",
    },
  ];

  const socialLinks = [
    {
      icon: BsTwitterX,
      href: "https://x.com/Kal_abX",
      label: "Twitter",
    },
    {
      icon: BiLogoLinkedin,
      href: "https://linkedin.com/in/kal-x",
      label: "LinkedIn",
    },
    {
      icon: BiLogoTelegram,
      href: "https://t.me/kal_ab_s",
      label: "Telegram",
    },
    {
      icon: BiLogoInstagram,
      href: "https://instagram.com/kal_ab.s",
      label: "Instagram",
    },
    {
      icon: BiLogoGithub,
      href: "https://github.com/Kaleab-Shewangizaw",
      label: "GitHub",
    },
    {
      icon: BiLogoDribbble,
      href: "",
      label: "Dribbble",
    },
  ];

  return (
    <section id="contact" className="pb-20 pt-5 mt-0 px-4 lg:px-8 rounded-b-lg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="max-w-2xl mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-card rounded-2xl p-8 shadow-lg border border-border"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-primary" />
              Send me a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="rounded-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="rounded-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  className="rounded-lg min-h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg h-12 gap-2"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </Button>

              {message && (
                <p
                  className={`text-center mt-4 ${
                    status === "Success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Information */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    target="_blank"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="text-foreground group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all group"
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs mt-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
