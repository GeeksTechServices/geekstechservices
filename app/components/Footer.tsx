"use client";
import React, { useState } from "react";
import footerData from "@/lib/footer.json";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { IconType } from "react-icons";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

type SocialItem =
  | { type: "svg"; name: string; href: string; svg: string }
  | { type: "react"; name: string; href: string; icon: string };

type FooterData = {
  elevatorPitch: string;
  columns: FooterColumn[];
  social: SocialItem[];
  copyright: string;
};

const typedFooter = footerData as FooterData;

function getReactIcon(name: string): IconType | null {
  // support common react-icons prefixes (Fa, Ri, etc.) using index signature safely
  const anyFa = FaIcons as unknown as Record<string, IconType>;
  const anyRi = RiIcons as unknown as Record<string, IconType>;
  if (anyFa[name]) return anyFa[name];
  if (anyRi[name]) return anyRi[name];
  return null;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);

  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID || "";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError(null);
    if (!email) {
      setSubscribeError("Please enter your email address.");
      return;
    }
    // basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeError("Please enter a valid email address.");
      return;
    }

    if (!FORMSPREE_ID) {
      setSubscribeError(
        "Formspree not configured. Set NEXT_PUBLIC_FORMSPREE_FORM_ID."
      );
      console.warn(
        "Missing NEXT_PUBLIC_FORMSPREE_FORM_ID — subscribe will not be sent."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          (data && data.error) || `Subscription failed (${res.status})`;
        setSubscribeError(msg);
        console.warn("Formspree error", data);
      } else {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setSubscribeError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Card className='max-w-6xl mx-auto px-6 py-12 mt-12 bg-transparent border-t border-muted'>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='space-y-4'>
            <Logo />
            <p className='mt-2 text-gray-300 max-w-sm'>
              {typedFooter.elevatorPitch}
            </p>

            <form onSubmit={handleSubscribe} className='mt-4'>
              {subscribed ? (
                <div className='text-sm text-green-400'>
                  Thanks — you&apos;re subscribed.
                </div>
              ) : (
                <div>
                  <div className='flex items-center gap-2'>
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Email address'
                      className='bg-white/3 placeholder-white/60 rounded-md px-3 py-2 text-sm flex-1'
                      aria-label='Email address'
                      disabled={submitting}
                    />
                    <button
                      className='px-3 py-2 rounded-md bg-[var(--accent)] text-black text-sm disabled:opacity-60'
                      onClick={handleSubscribe}
                      disabled={submitting}
                    >
                      {submitting ? "Sending..." : "Subscribe"}
                    </button>
                  </div>
                  {subscribeError && (
                    <div className='mt-2 text-sm text-rose-400'>
                      {subscribeError}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6'>
            {typedFooter.columns.map((col) => (
              <div key={col.title}>
                <h4 className='font-semibold mb-3 text-white'>{col.title}</h4>
                <ul className='space-y-2'>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className='text-gray-300 hover:text-[var(--accent)] transition-colors text-sm'
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-8 border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              {/* Social icons with staggered hover animations and sized containers */}
              {typedFooter.social.map((s, idx) => {
                const key = `social-${s.name}`;
                const delay = `${idx * 60}ms`;

                if (s.type === "svg") {
                  return (
                    <a
                      key={key}
                      href={s.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300'
                      style={{ transitionDelay: delay }}
                      aria-label={s.name}
                    >
                      <span
                        className='w-5 h-5 inline-block'
                        // svg in JSON uses currentColor for strokes/fills
                        dangerouslySetInnerHTML={{ __html: s.svg }}
                      />
                    </a>
                  );
                }

                if (s.type === "react") {
                  const Icon = getReactIcon(s.icon);
                  if (Icon) {
                    return (
                      <a
                        key={key}
                        href={s.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-transform duration-300'
                        style={{ transitionDelay: delay }}
                        aria-label={s.name}
                      >
                        <Icon size={16} />
                      </a>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>

          <div className='text-sm text-gray-400 md:text-right'>
            {/* Render copyright with company link */}
            {(() => {
              const raw = typedFooter.copyright.replace("{year}", String(year));
              const company = "GeekStechServices";
              if (raw.includes(company)) {
                const parts = raw.split(company);
                return (
                  <>
                    <span>{parts[0]}</span>
                    <Link
                      href='/'
                      className='text-gray-300 hover:text-[var(--accent)]'
                    >
                      {company}
                    </Link>
                    <span>{parts[1]}</span>
                  </>
                );
              }
              return <span>{raw}</span>;
            })()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
