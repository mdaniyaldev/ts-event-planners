"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { burstConfetti } from "@/lib/confetti";

const projectTypes = ["Wedding", "Mehndi or dholki", "Reception or dinner", "Birthday or party", "Something else"];

const field =
  "mt-2 block w-full border border-ink/30 bg-page px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 focus:border-gold-deep";

export function Contact() {
  const [sent, setSent] = useState(false);

  // A static site has no server to receive a form, so the enquiry opens in the
  // visitor's own email app, already written out.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `Event enquiry: ${data.get("type")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Event: ${data.get("type")}`,
      `Date: ${data.get("date") || "Not decided yet"}`,
      `Guests: ${data.get("guests") || "Not decided yet"}`,
      "",
      `${data.get("details")}`,
    ].join("\n");
    // Confetti bursts from the button that was pressed.
    const button = (e.nativeEvent as SubmitEvent).submitter;
    if (button) {
      const r = button.getBoundingClientRect();
      burstConfetti({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="bg-page pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-24">
        <Reveal>
          <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">Tell us what you are celebrating</h1>
          <p className="mt-5 max-w-[30rem] text-ink-soft">
            Share the date, the number of guests and the venue if you have one. We reply within {site.quoteWithin} with
            ideas and a price for your event in {site.city}.
          </p>

          <dl className="mt-10 space-y-6 border-t border-gold/60 pt-8 text-base">
            <div>
              <dt className="text-ink-soft">Email</dt>
              <dd className="mt-1 font-medium">
                <a href={`mailto:${site.email}`} className="link-ink underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Phone and WhatsApp</dt>
              <dd className="mt-1 font-medium">
                {site.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center pr-6">
                    {p}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Office</dt>
              <dd className="mt-1 font-medium">
                {site.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="mt-1 block font-normal text-ink-soft">{site.hours}</span>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.12}>
        <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2" aria-describedby="form-status">
          <label className="block text-base font-medium">
            Your name
            <input name="name" type="text" required autoComplete="name" className={field} />
          </label>
          <label className="block text-base font-medium">
            Your email
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="block text-base font-medium sm:col-span-2">
            What are you celebrating?
            <select name="type" required defaultValue="" className={field}>
              <option value="" disabled>
                Choose one
              </option>
              {projectTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-base font-medium">
            Event date (optional)
            <input name="date" type="date" className={field} />
          </label>
          <label className="block text-base font-medium">
            Number of guests (optional)
            <input name="guests" type="number" min={1} inputMode="numeric" className={field} />
          </label>
          <label className="block text-base font-medium sm:col-span-2">
            Tell us about it
            <textarea
              name="details"
              required
              rows={6}
              placeholder="Venue, colours or theme, and anything you have already booked."
              className={field}
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn-gold inline-flex min-h-12 items-center px-8 text-base font-semibold"
            >
              Send enquiry
            </button>
            <p id="form-status" role="status" className="mt-4 max-w-[34rem] text-base text-ink-soft">
              {sent
                ? `Your email app should now open with the enquiry filled in. If it does not, write to ${site.email} instead.`
                : "This opens your email app with your message ready to send."}
            </p>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
