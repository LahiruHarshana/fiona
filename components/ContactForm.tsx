"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="border border-sand bg-paper p-6 shadow-insetLine max-sm:p-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm text-olive-500">
          Name
          <input
            required
            name="name"
            className="mt-2 w-full border border-sand bg-ivory px-4 py-3 text-olive-700 outline-none transition-colors placeholder:text-olive-300 focus:border-gold"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm text-olive-500">
          Email
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full border border-sand bg-ivory px-4 py-3 text-olive-700 outline-none transition-colors placeholder:text-olive-300 focus:border-gold"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm text-olive-500">
        Stay dates
        <input
          name="dates"
          className="mt-2 w-full border border-sand bg-ivory px-4 py-3 text-olive-700 outline-none transition-colors placeholder:text-olive-300 focus:border-gold"
          placeholder="June 14 - June 18"
        />
      </label>

      <label className="mt-5 block text-sm text-olive-500">
        Message
        <textarea
          required
          name="message"
          rows={5}
          className="mt-2 w-full resize-none border border-sand bg-ivory px-4 py-3 text-olive-700 outline-none transition-colors placeholder:text-olive-300 focus:border-gold"
          placeholder="Tell us the kind of stay you are imagining."
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex items-center gap-3 bg-olive-900 border border-olive-900 px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gold hover:border-gold hover:text-olive-900 max-sm:w-full max-sm:justify-center max-sm:tracking-[0.14em]"
      >
        Send Enquiry
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>

      {sent && (
        <p className="mt-5 border border-gold-soft bg-cream px-4 py-3 text-sm text-olive-700">
          Thank you. Your enquiry has been received, and the Villa FIONA team will reply shortly.
        </p>
      )}
    </form>
  );
}
