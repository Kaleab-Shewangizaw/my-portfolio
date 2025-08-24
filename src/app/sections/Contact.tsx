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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
  ];

  const socialLinks = [
    {
      icon: BsTwitterX,
      href: "https://x.com/KaleabShew27310",
      label: "Twitter",
    },
    {
      icon: BiLogoLinkedin,
      href: "https://linkedin.com/in/your-profile",
      label: "LinkedIn",
    },
    {
      icon: BiLogoTelegram,
      href: "https://t.me/yourusername",
      label: "Telegram",
    },
    {
      icon: BiLogoInstagram,
      href: "https://instagram.com/yourusername",
      label: "Instagram",
    },
    {
      icon: BiLogoGithub,
      href: "https://github.com/yourusername",
      label: "GitHub",
    },
    {
      icon: BiLogoDribbble,
      href: "https://dribbble.com/yourusername",
      label: "Dribbble",
    },
  ];

  return (
    <section id="contact" className="pb-20 pt-5 mt-0 px-4 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 not-dark:from-purple-100 not-dark:to-blue-200 bg-clip-text text-transparent">
            Let&apos;s Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg not-dark:text-gray-200">
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
                  value={formData.name}
                  onChange={handleInputChange}
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="rounded-lg min-h-32"
                />
              </div>

              <Button type="submit" className="w-full rounded-lg h-12 gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </Button>
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

            {/* Call to Action */}
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Calendar className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Ready to start your project?
              </h3>
              <p className="mb-4 opacity-90">
                Let&apos;s schedule a call to discuss your ideas
              </p>
              <Button variant="secondary" className="rounded-full gap-2">
                <Calendar className="w-4 h-4" />
                Book a Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
