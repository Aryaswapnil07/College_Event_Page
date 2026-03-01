import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!payload.email && !payload.phone) {
      alert("Please enter at least an email or a phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "contactQueries"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
      alert(
        "Your query has been submitted. Thank you! Our team will contact you within a few hours."
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Contact form submit failed:", error);
      alert("Failed to submit your query. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative text-gray-400 ">
      {/* Background Map */}
      <div className="absolute inset-0">
        <iframe
          title="map"
          frameBorder="0"
          scrolling="no"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4248.326003415768!2d87.93653137595263!3d26.148990192492647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e511d49252272f%3A0x3b19e1b5f2bf4a28!2sGovt.%20Engineering%20College%20Kishanganj!5e1!3m2!1sen!2sin!4v1771104462048!5m2!1sen!2sin"
          width="800"
          height="600"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"
          className="w-full h-full"
          style={{
            filter: "grayscale(0.8) contrast(1.2) opacity(0.70) ",
            border: 0,
          }}
        />
      </div>

      {/* Content Container */}
      
      {/* <div className="relative z-10 max-w-[100vw] mx-auto px-6 py-24 flex"></div> */}
      <div className="relative z-10 max-w-[100vw] mx-auto px-6 py-24 flex  pointer-events-none">
        {/* Contact Card */}
        <div className=" w-full md:w-1/2 lg:w-[28%] bg-white/10 backdrop-blur-xs border border-white/20 shadow-2xl rounded-2xl p-8 ml-auto pointer-events-auto">
          <h2 className="text-white text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-6 text-gray-400">
            Have questions? We’d love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm mb-1 text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-[#21212173] border border-gray-400 rounded px-3 py-2 text-gray-100 focus:border-red-500 focus:ring-2 focus:ring-red-900 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-white">Email (optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#21212173] border border-gray-400 rounded px-3 py-2 text-gray-100 focus:border-red-500 focus:ring-2 focus:ring-red-900 outline-none transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm mb-1 text-white">Phone (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-[#21212173] border border-gray-400 rounded px-3 py-2 text-gray-100 focus:border-red-500 focus:ring-2 focus:ring-red-900 outline-none transition"
              />
              <p className="text-xs text-gray-300 mt-1">
                Provide at least one contact method: email or phone.
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm mb-1 text-white">Message</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-[#21212173] border border-gray-400 rounded px-3 py-2 text-gray-100 focus:border-red-500 focus:ring-2 focus:ring-red-900 outline-none resize-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-lg font-semibold transition"
            >
              {submitting ? "Submitting..." : "Send Message"}
            </button>
          </form>

          <p className="text-xs text-gray-200 mt-6">
            📍 Government Engineering Collage Kishanganj
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
