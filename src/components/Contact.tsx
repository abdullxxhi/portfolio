import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Copy, Check, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactProps {
  onCopyEmail: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export default function Contact({ onCopyEmail, onShowToast }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Trigger mailto link
      const mailtoUrl = `mailto:${personalInfo.email}?subject=Inquiry from Portfolio (${encodeURIComponent(
        formData.name
      )})&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      onShowToast('Message sent successfully! Opening email client...', 'success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF6] border border-[#DDD6C8] shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-[#2F5D50]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#2F5D50] font-semibold">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#1D2A26]">
            Let's Build Together
          </h2>
          <p className="text-base text-[#4B5563]">
            {personalInfo.contactHeadline}
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Contact Details & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold font-display text-[#1D2A26]">
                Contact Information
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Whether you need a custom Google Workspace automation, an AI agent, a Power BI dashboard, or a data analyst for your team, I'm ready to collaborate.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4">
              
              {/* Email Box with Copy Button */}
              <div className="bg-[#FCFAF6] p-4 rounded-2xl border border-[#DDD6C8] shadow-sm flex items-center justify-between group">
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  <div className="p-3 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-mono text-[#6B7280]">Email Address</div>
                    <div className="text-sm font-semibold text-[#1D2A26] truncate">{personalInfo.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  aria-label="Copy Email"
                  className="p-2.5 rounded-xl bg-[#F5F1E8] border border-[#DDD6C8] text-[#4B5563] hover:text-[#2F5D50] hover:border-[#2F5D50] transition-all shrink-0 ml-2"
                >
                  {copied ? <Check className="w-4 h-4 text-[#4E8D66]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Box */}
              <a
                href={`tel:${personalInfo.phone}`}
                className="bg-[#FCFAF6] p-4 rounded-2xl border border-[#DDD6C8] shadow-sm flex items-center space-x-3.5 group hover:border-[#2F5D50] transition-all"
              >
                <div className="p-3 rounded-xl bg-[#D97745]/10 text-[#D97745] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280]">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-[#1D2A26] group-hover:text-[#2F5D50] transition-colors">
                    {personalInfo.phone}
                  </div>
                </div>
              </a>

              {/* Location Box */}
              <div className="bg-[#FCFAF6] p-4 rounded-2xl border border-[#DDD6C8] shadow-sm flex items-center space-x-3.5">
                <div className="p-3 rounded-xl bg-[#4E8D66]/10 text-[#4E8D66] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280]">Location</div>
                  <div className="text-sm font-semibold text-[#1D2A26]">{personalInfo.location}</div>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-[#6B7280] mb-3 font-semibold">
                Social Profiles:
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-xs font-semibold text-[#1D2A26] hover:border-[#2F5D50] hover:text-[#2F5D50] transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#FCFAF6] border border-[#DDD6C8] text-xs font-semibold text-[#1D2A26] hover:border-[#2F5D50] hover:text-[#2F5D50] transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FCFAF6] p-8 sm:p-10 rounded-[22px] border border-[#DDD6C8] shadow-md relative">
              
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#D97745]" />
                <h3 className="text-xl font-bold font-display text-[#1D2A26]">
                  Send a Direct Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono text-[#6B7280] uppercase mb-2 font-semibold">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F1E8] border ${
                      errors.name ? 'border-red-500' : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    } text-[#1D2A26] text-sm outline-none transition-colors placeholder:text-[#6B7280]/60`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono text-[#6B7280] uppercase mb-2 font-semibold">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F1E8] border ${
                      errors.email ? 'border-red-500' : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    } text-[#1D2A26] text-sm outline-none transition-colors placeholder:text-[#6B7280]/60`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-[#6B7280] uppercase mb-2 font-semibold">
                    Project / Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your automation requirements, project goals, or inquiry..."
                    className={`w-full px-4 py-3.5 rounded-2xl bg-[#F5F1E8] border ${
                      errors.message ? 'border-red-500' : 'border-[#DDD6C8] focus:border-[#2F5D50]'
                    } text-[#1D2A26] text-sm outline-none transition-colors placeholder:text-[#6B7280]/60 resize-none`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#2F5D50] text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-md hover:bg-[#244A40] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
