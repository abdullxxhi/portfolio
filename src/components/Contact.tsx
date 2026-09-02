import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactProps {
  onCopyEmail: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function Contact({
  onCopyEmail,
  onShowToast,
}: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const validate = () => {
    const errs: {
      name?: string;
      email?: string;
      message?: string;
    } = {};

    if (!formData.name.trim()) {
      errs.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      errs.message = 'Message is required';
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const mailtoUrl = `mailto:${personalInfo.email}?subject=Inquiry from Portfolio (${encodeURIComponent(
        formData.name
      )})&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      onShowToast(
        'Message sent successfully! Opening email client...',
        'success'
      );

      setFormData({
        name: '',
        email: '',
        message: '',
      });

      setErrors({});
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative z-10 bg-[#F5F1E8] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="mb-14 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#2F5D50]">
              08 / Contact
            </span>

            <span className="h-px w-10 bg-[#DDD6C8]" />
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-[#1D2A26] sm:text-4xl">
            Let's build something useful.
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-[#4B5563]">
            {personalInfo.contactHeadline}
          </p>
        </motion.div>

        {/* Main Contact Layout */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5"
          >
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#2F5D50]" />

                <h3 className="font-display text-xl font-bold text-[#1D2A26]">
                  Get in touch
                </h3>
              </div>

              <p className="max-w-md text-sm leading-6 text-[#4B5563]">
                Whether you need a custom Google Workspace automation,
                an AI agent, a Power BI dashboard, or a data analyst for
                your team, I'm ready to collaborate.
              </p>
            </div>

            {/* Contact Details */}
            <div className="border-y border-[#DDD6C8]">

              {/* Email */}
              <div className="flex items-center justify-between gap-4 border-b border-[#DDD6C8] py-5">
                <div className="flex min-w-0 items-center gap-4">
                  <Mail className="h-5 w-5 shrink-0 text-[#2F5D50]" />

                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
                      Email
                    </p>

                    <p className="truncate text-sm font-semibold text-[#1D2A26]">
                      {personalInfo.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy email"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDD6C8] bg-[#FCFAF6] text-[#4B5563] transition-colors hover:border-[#2F5D50] hover:text-[#2F5D50]"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[#4E8D66]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Phone */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-4 border-b border-[#DDD6C8] py-5 transition-colors hover:text-[#2F5D50]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#D97745]" />

                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
                    Phone / WhatsApp
                  </p>

                  <p className="text-sm font-semibold text-[#1D2A26]">
                    {personalInfo.phone}
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 py-5">
                <MapPin className="h-5 w-5 shrink-0 text-[#4E8D66]" />

                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B7280]">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-[#1D2A26]">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                Find me online
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D2A26] transition-colors hover:text-[#2F5D50]"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                  <span className="text-[#6B7280]">↗</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D2A26] transition-colors hover:text-[#2F5D50]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                  <span className="text-[#6B7280]">↗</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            <div className="border-t border-[#DDD6C8] pt-6 sm:pt-8">

              <div className="mb-8 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#1D2A26]">
                    Send a message
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Tell me a little about what you're working on.
                  </p>
                </div>

                <Send className="h-5 w-5 text-[#2F5D50]" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]"
                  >
                    Your Full Name{' '}
                    <span className="text-[#D97745]">*</span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className={`w-full rounded-lg border bg-[#FCFAF6] px-4 py-3.5 text-sm text-[#1D2A26] outline-none transition-colors placeholder:text-[#6B7280]/60 ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]"
                  >
                    Your Email Address{' '}
                    <span className="text-[#D97745]">*</span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="john@example.com"
                    className={`w-full rounded-lg border bg-[#FCFAF6] px-4 py-3.5 text-sm text-[#1D2A26] outline-none transition-colors placeholder:text-[#6B7280]/60 ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]"
                  >
                    Project / Message Details{' '}
                    <span className="text-[#D97745]">*</span>
                  </label>

                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell me about your project, requirements, or inquiry..."
                    className={`w-full resize-none rounded-lg border bg-[#FCFAF6] px-4 py-3.5 text-sm text-[#1D2A26] outline-none transition-colors placeholder:text-[#6B7280]/60 ${
                      errors.message
                        ? 'border-red-500'
                        : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    }`}
                  />

                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex flex-col gap-3 border-t border-[#DDD6C8] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-[#6B7280]">
                    Your message will open in your email client.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2F5D50] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#244A40] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Opening...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
