import { CalendarDays, Search, Sparkles, Users } from "lucide-react";

export default function BookingBar() {
  return (
    <form action="/contact" className="editorial-container relative z-20 -mt-10">
      <div className="grid border border-sand bg-paper shadow-botanical md:grid-cols-[1fr_1fr_0.8fr_0.8fr_auto]">
        <label className="border-b border-sand p-5 md:border-b-0 md:border-r">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-deep">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Check in
          </span>
          <input
            type="date"
            name="check-in"
            className="mt-3 w-full bg-paper text-sm text-olive-700 outline-none"
          />
        </label>

        <label className="border-b border-sand p-5 md:border-b-0 md:border-r">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-deep">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Check out
          </span>
          <input
            type="date"
            name="check-out"
            className="mt-3 w-full bg-paper text-sm text-olive-700 outline-none"
          />
        </label>

        <label className="border-b border-sand p-5 md:border-b-0 md:border-r">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-deep">
            <Users className="h-4 w-4" aria-hidden="true" />
            Guests
          </span>
          <select name="guests" className="mt-3 w-full bg-paper text-sm text-olive-700 outline-none">
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>6 Guests</option>
          </select>
        </label>

        <label className="border-b border-sand p-5 md:border-b-0 md:border-r">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-deep">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Mood
          </span>
          <select name="mood" className="mt-3 w-full bg-paper text-sm text-olive-700 outline-none">
            <option>Rest</option>
            <option>Romance</option>
            <option>Wellness</option>
            <option>Family</option>
          </select>
        </label>

        <button
          type="submit"
          className="flex min-h-20 items-center justify-center gap-3 bg-gold px-8 text-xs font-medium uppercase tracking-[0.2em] text-olive-900 transition-colors duration-300 hover:bg-gold-deep hover:text-ivory"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Enquire
        </button>
      </div>
    </form>
  );
}
