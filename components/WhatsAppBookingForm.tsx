"use client";

import {
  ADULTS_MAX,
  CHILDREN_MAX,
  NAME_MAX,
  PHONE_MAX,
  REQUESTS_MAX,
  bookingApartmentOptions,
  bookingDisclaimer,
  buildBookingMessage,
  buildWhatsAppBookingUrl,
  emptyBookingDraft,
  nextIsoDay,
  parseApartmentQuery,
  todayIsoLocal,
  validateBooking,
  whatsappClickChatNote,
  type BookingDraft,
  type BookingErrors,
  type BookingField,
} from "@/lib/whatsappBooking";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useId, useMemo, useState } from "react";

const fieldClass =
  "mt-2 w-full min-h-11 border border-[#D7C5A7] bg-[#F4F0E7] px-4 py-3 text-sm text-[#203C30] outline-none transition-colors placeholder:text-[#203C30]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-sm text-[#7A2E2E]" role="alert">
      {message}
    </p>
  );
}

export default function WhatsAppBookingForm() {
  const formId = useId();
  const searchParams = useSearchParams();
  const apartmentQuery = parseApartmentQuery(searchParams.get("apartment"));
  const minDate = todayIsoLocal();

  const [draft, setDraft] = useState<BookingDraft>(() => ({
    ...emptyBookingDraft(),
    apartmentId: apartmentQuery,
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    setDraft((current) => ({ ...current, apartmentId: apartmentQuery }));
  }, [apartmentQuery]);

  function update<K extends BookingField>(field: K, value: BookingDraft[K]) {
    setDraft((current) => {
      const next = { ...current, [field]: value };

      if (field === "checkIn" && next.checkOut && next.checkOut <= value) {
        next.checkOut = "";
      }

      return next;
    });
    setCopyStatus("idle");
  }

  const preview = useMemo(() => buildBookingMessage(draft), [draft]);
  const whatsappHref = useMemo(() => buildWhatsAppBookingUrl(preview), [preview]);
  const liveErrors = useMemo(() => validateBooking(draft), [draft]);
  const isValid = Object.keys(liveErrors).length === 0;

  function shownError(field: BookingField) {
    return attempted ? errors[field] ?? liveErrors[field] : errors[field];
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validateBooking(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
  }

  async function copyMessage() {
    setAttempted(true);
    const nextErrors = validateBooking(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setCopyStatus("idle");
      return;
    }

    try {
      await navigator.clipboard.writeText(preview);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div className="border-t border-[#D7C5A7] bg-transparent pt-8">
      <p className="border-l-2 border-[#D7C5A7] px-4 py-3 text-sm leading-6 text-[#203C30]">
        {bookingDisclaimer}
      </p>
      <p className="mt-3 text-sm leading-6 text-[#203C30]/80">{whatsappClickChatNote}</p>

      <form className="mt-8" noValidate onSubmit={handleSubmit} aria-describedby={`${formId}-disclaimer`}>
        <p id={`${formId}-disclaimer`} className="sr-only">
          {bookingDisclaimer} {whatsappClickChatNote}
        </p>

        <fieldset>
          <legend className="text-sm font-medium text-[#203C30]">Apartment</legend>
          <div className="mt-3 grid gap-2" role="radiogroup" aria-required="true" aria-invalid={Boolean(shownError("apartmentId"))}>
            {bookingApartmentOptions.map((option) => {
              const inputId = `${formId}-${option.id}`;
              const selected = draft.apartmentId === option.id;

              return (
                <label
                  key={option.id}
                  htmlFor={inputId}
                  className={`flex min-h-11 cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${
                    selected
                      ? "border-[#244D39] bg-[#244D39] text-[#F4F0E7]"
                      : "border-[#D7C5A7] bg-[#F4F0E7] text-[#203C30]"
                  }`}
                >
                  <input
                    id={inputId}
                    type="radio"
                    name="apartment"
                    value={option.id}
                    checked={selected}
                    onChange={() => update("apartmentId", option.id)}
                    className="sr-only"
                  />
                  {option.name}
                </label>
              );
            })}
          </div>
          <FieldError id={`${formId}-apartment-error`} message={shownError("apartmentId")} />
        </fieldset>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-checkin`} className="text-sm font-medium text-[#203C30]">
              Check-in
            </label>
            <input
              id={`${formId}-checkin`}
              type="date"
              name="checkIn"
              required
              min={minDate}
              value={draft.checkIn}
              onChange={(event) => update("checkIn", event.target.value)}
              aria-invalid={Boolean(shownError("checkIn"))}
              aria-describedby={shownError("checkIn") ? `${formId}-checkin-error` : undefined}
              className={fieldClass}
            />
            <FieldError id={`${formId}-checkin-error`} message={shownError("checkIn")} />
          </div>
          <div>
            <label htmlFor={`${formId}-checkout`} className="text-sm font-medium text-[#203C30]">
              Check-out
            </label>
            <input
              id={`${formId}-checkout`}
              type="date"
              name="checkOut"
              required
              min={draft.checkIn ? nextIsoDay(draft.checkIn) : nextIsoDay(minDate)}
              value={draft.checkOut}
              onChange={(event) => update("checkOut", event.target.value)}
              aria-invalid={Boolean(shownError("checkOut"))}
              aria-describedby={shownError("checkOut") ? `${formId}-checkout-error` : undefined}
              className={fieldClass}
            />
            <FieldError id={`${formId}-checkout-error`} message={shownError("checkOut")} />
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${formId}-adults`} className="text-sm font-medium text-[#203C30]">
              Adults
            </label>
            <input
              id={`${formId}-adults`}
              type="number"
              name="adults"
              inputMode="numeric"
              min={1}
              max={ADULTS_MAX}
              step={1}
              required
              value={draft.adults}
              onChange={(event) => update("adults", event.target.value)}
              aria-invalid={Boolean(shownError("adults"))}
              aria-describedby={shownError("adults") ? `${formId}-adults-error` : undefined}
              className={fieldClass}
            />
            <FieldError id={`${formId}-adults-error`} message={shownError("adults")} />
          </div>
          <div>
            <label htmlFor={`${formId}-children`} className="text-sm font-medium text-[#203C30]">
              Children <span className="font-normal text-[#203C30]/60">(optional)</span>
            </label>
            <input
              id={`${formId}-children`}
              type="number"
              name="children"
              inputMode="numeric"
              min={0}
              max={CHILDREN_MAX}
              step={1}
              value={draft.children}
              onChange={(event) => update("children", event.target.value)}
              aria-invalid={Boolean(shownError("children"))}
              aria-describedby={shownError("children") ? `${formId}-children-error` : undefined}
              className={fieldClass}
            />
            <FieldError id={`${formId}-children-error`} message={shownError("children")} />
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium text-[#203C30]">
            Full name
          </label>
          <input
            id={`${formId}-name`}
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={NAME_MAX}
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(shownError("name"))}
            aria-describedby={shownError("name") ? `${formId}-name-error` : undefined}
            className={fieldClass}
          />
          <FieldError id={`${formId}-name-error`} message={shownError("name")} />
        </div>

        <div className="mt-5">
          <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-[#203C30]">
            Phone / WhatsApp <span className="font-normal text-[#203C30]/60">(optional)</span>
          </label>
          <input
            id={`${formId}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={PHONE_MAX}
            value={draft.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-describedby={`${formId}-phone-help ${shownError("phone") ? `${formId}-phone-error` : ""}`.trim()}
            className={fieldClass}
          />
          <p id={`${formId}-phone-help`} className="mt-1 text-xs leading-5 text-[#203C30]/70">
            Optional. This is not required to open WhatsApp. The request is sent to Fiona’s business
            WhatsApp number.
          </p>
          <FieldError id={`${formId}-phone-error`} message={shownError("phone")} />
        </div>

        <div className="mt-5">
          <label htmlFor={`${formId}-requests`} className="text-sm font-medium text-[#203C30]">
            Special requests <span className="font-normal text-[#203C30]/60">(optional)</span>
          </label>
          <textarea
            id={`${formId}-requests`}
            name="requests"
            rows={4}
            maxLength={REQUESTS_MAX}
            value={draft.requests}
            onChange={(event) => update("requests", event.target.value)}
            aria-describedby={`${formId}-requests-count`}
            className={`${fieldClass} resize-y`}
          />
          <p id={`${formId}-requests-count`} className="mt-1 text-xs text-[#203C30]/60">
            {draft.requests.length} / {REQUESTS_MAX}
          </p>
        </div>

        <section className="mt-8 border border-[#D7C5A7] bg-[#F4F0E7] p-4" aria-labelledby={`${formId}-preview-heading`}>
          <h3 id={`${formId}-preview-heading`} className="text-sm font-medium text-[#203C30]">
            Booking request preview
          </h3>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-[#203C30]">{preview}</pre>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {isValid ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center bg-[#244D39] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]"
            >
              Continue to WhatsApp
            </a>
          ) : (
            <button
              type="submit"
              className="inline-flex min-h-11 flex-1 items-center justify-center bg-[#244D39] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#F4F0E7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]"
            >
              Continue to WhatsApp
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              void copyMessage();
            }}
            className="inline-flex min-h-11 flex-1 items-center justify-center border border-[#244D39] bg-[#F4F0E7] px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#244D39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244D39]"
          >
            Copy Booking Request
          </button>
        </div>
        {copyStatus === "copied" ? (
          <p className="mt-3 text-sm text-[#244D39]" role="status">
            Booking request copied. Paste it into WhatsApp if the app does not open.
          </p>
        ) : null}
        {copyStatus === "failed" ? (
          <p className="mt-3 text-sm text-[#7A2E2E]" role="alert">
            Copying was blocked by the browser. Select the preview text and copy it yourself.
          </p>
        ) : null}
      </form>
    </div>
  );
}
