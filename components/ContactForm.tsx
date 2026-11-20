"use client";

import WhatsAppBookingForm from "@/components/WhatsAppBookingForm";
import { Suspense } from "react";

function BookingFormFallback() {
  return (
    <div className="border-t border-[#D7C5A7] py-6 text-sm text-[#203C30]">
      Loading the booking request form…
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<BookingFormFallback />}>
      <WhatsAppBookingForm />
    </Suspense>
  );
}
