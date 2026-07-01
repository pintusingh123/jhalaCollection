import React, { useState } from "react";
import Layout from "./Layout";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

function Contactus() {
  const INITIAL_FORM_STATE = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: "", type: "" });

  const COOLDOWN_TIME = 30000; // 30 seconds

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showStatus = (text, type) => {
    setStatus({ text, type });

    setTimeout(() => {
      setStatus({ text: "", type: "" });
    }, 4000);
  };

  const validateForm = () => {
    const name = formData.fullName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (name.length < 3) {
      showStatus("Name must be at least 3 characters.", "error");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showStatus("Please enter a valid email address.", "error");
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      showStatus("Please enter a valid 10-digit mobile number.", "error");
      return false;
    }

    if (subject.length < 5) {
      showStatus("Subject should contain at least 5 characters.", "error");
      return false;
    }

    if (message.length < 15) {
      showStatus("Message should contain at least 15 characters.", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const lastSubmit = localStorage.getItem("contact_last_submit");

    if (lastSubmit && Date.now() - Number(lastSubmit) < COOLDOWN_TIME) {
      const seconds = Math.ceil(
        (COOLDOWN_TIME - (Date.now() - Number(lastSubmit))) / 1000,
      );

      showStatus(
        `Please wait ${seconds} seconds before sending another message.`,
        "error",
      );
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.fullName.trim(),
          from_email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      localStorage.setItem("contact_last_submit", Date.now().toString());

      showStatus(
        "✓ Message sent successfully! We'll get back to you soon.",
        "success",
      );

      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error("EmailJS Error:", error);

      showStatus(
        "Unable to send your message. Please try again later.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col justify-center items-center">
        <div className="max-w-[1600px] w-full mx-auto">
          {/* Main Section */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 sm:p-12 md:p-16 lg:p-20 border border-gray-100/80">
            <div className="flex flex-col gap-12 sm:gap-16">
              {/* Contact Info (Row 1 on md+) */}
              <div className="w-full space-y-8">
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Contact With JhalaCollection
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base mt-1">
                    Get in touch with us through any of these channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {/* WhatsApp Support */}
                  <a
                    href="https://wa.me/918441992003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 rounded-2xl hover:bg-yellow-50/60 border border-gray-100 hover:border-yellow-200/50 shadow-sm hover:shadow transition-all duration-300 group bg-gray-50/30"
                  >
                    <div className="bg-yellow-100 text-yellow-600 p-4 rounded-2xl group-hover:scale-110 transition duration-300 shadow-sm shrink-0">
                      <MessageCircle size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition">
                        Chat With Us
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Talk to our support team for instant assistance.
                      </p>
                      <span className="text-sm font-bold text-black underline mt-2 block group-hover:text-yellow-600 transition">
                        WhatsApp Support
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:pintujhala5@gmail.com"
                    className="flex items-start gap-4 p-5 rounded-2xl hover:bg-yellow-50/60 border border-gray-100 hover:border-yellow-200/50 shadow-sm hover:shadow transition-all duration-300 group bg-gray-50/30"
                  >
                    <div className="bg-yellow-100 text-yellow-600 p-4 rounded-2xl group-hover:scale-110 transition duration-300 shadow-sm shrink-0">
                      <Mail size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition">
                        Email Us
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        For any queries, orders or feedback.
                      </p>
                      <span className="text-sm font-bold text-black underline mt-2 block group-hover:text-yellow-600 transition">
                        pintujhala5@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+918441992003"
                    className="flex items-start gap-4 p-5 rounded-2xl hover:bg-yellow-50/60 border border-gray-100 hover:border-yellow-200/50 shadow-sm hover:shadow transition-all duration-300 group bg-gray-50/30"
                  >
                    <div className="bg-yellow-100 text-yellow-600 p-4 rounded-2xl group-hover:scale-110 transition duration-300 shadow-sm shrink-0">
                      <Phone size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-yellow-600 transition">
                        Call Us
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Active from Monday to Saturday.
                      </p>
                      <span className="text-sm font-bold text-black underline mt-2 block group-hover:text-yellow-600 transition">
                        +91 8441992003
                      </span>
                    </div>
                  </a>

                  {/* Visit Us */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl hover:bg-yellow-50/60 border border-gray-100 hover:border-yellow-200/50 shadow-sm hover:shadow transition-all duration-300 group bg-gray-50/30">
                    <div className="bg-yellow-100 text-yellow-600 p-4 rounded-2xl group-hover:scale-110 transition duration-300 shadow-sm shrink-0">
                      <MapPin size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        Visit Our Store
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Step in to experience physical items.
                      </p>
                      <span className="text-sm font-bold text-black mt-2 block">
                        Jhalawar, Rajasthan, India
                      </span>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                <div className="bg-gradient-to-br from-black via-gray-900 to-yellow-950 text-white rounded-[2rem] p-6 sm:p-8 shadow-xl border border-yellow-500/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      Need Quick Help?
                    </h4>
                    <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
                      Our support team typically responds to all inquiries
                      within 24 hours.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400 text-base shrink-0 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                    <span>★ ★ ★ ★ ★</span>
                    <span className="text-xs sm:text-sm text-gray-200 font-medium ml-1">
                      Rated 5.0 by customers
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full border-t border-gray-100 my-2"></div>

              {/* Contact Form (Row 2 on md+) */}
              <div className="w-full">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
                  Send Us a Message
                </h2>

                {status.text && (
                  <div
                    className={`mb-8 px-6 py-4 rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                      status.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {status.text}
                  </div>
                )}

                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                        maxLength={50}
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-base"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-base"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        placeholder="Subject topic"
                        value={formData.subject}
                        onChange={handleChange}
                        autoComplete="off"
                        className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-base"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-semibold text-gray-700 text-sm sm:text-base">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="3"
                      required
                      placeholder="Write your detailed message here..."
                      value={formData.message}
                       maxLength={1000}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-xl px-5 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 text-base leading-relaxed"
                    />
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-black text-white px-12 py-5 rounded-2xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-yellow-500/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-base tracking-wide"
                  >
                    {loading ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contactus;
