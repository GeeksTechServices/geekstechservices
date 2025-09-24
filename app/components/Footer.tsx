"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
// Avoid importing react-icons at module level to reduce server-side bundle
// and eliminate potential RSC serialization issues. We'll render a simple
// fallback for 'react' social items.

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

// We'll load the JSON dynamically on the client to avoid bringing raw SVG strings
// into server-side rendering/serialization which can cause RSC streaming errors.

function useFooterData() {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    let mounted = true;
    import("@/lib/footer.json")
      .then((m) => {
        if (!mounted) return;
        setData(m.default as FooterData);
      })
      .catch((err) => {
        // keep silent but log in dev for debugging
        // eslint-disable-next-line no-console
        console.error("Failed to load footer data", err);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return data;
}

// No-op icon resolver; importing react-icons at top-level caused heavy bundling
// and may be implicated in the RSC streaming crash. We'll show a lightweight
// text fallback for those entries instead.
// intentionally left empty: we render initials for react-type icons instead

export default function Footer() {
  const footer = useFooterData();
  const year = new Date().getFullYear();

  if (!footer) {
    // Render nothing (or a lightweight placeholder) while footer JSON loads on the client
    return null;
  }

  return (
    <Card className='max-w-6xl mx-auto px-8 py-14 mt-12 bg-white/3 backdrop-blur-sm rounded-xl border border-white/6'>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          <div className='md:pr-6'>
            <Logo />
            <p className='mt-4 text-gray-300 max-w-sm leading-relaxed'>
              {footer.elevatorPitch}
            </p>
          </div>

          <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8'>
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h4 className='font-semibold mb-3 text-white'>{col.title}</h4>
                <ul className='space-y-2'>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className='text-gray-300 hover:text-[var(--accent)] transition-colors duration-200 inline-block'
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

        <div className='mt-8 border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              {/* Social icons with staggered hover animations and accent-filled buttons */}
              {footer.social.map((s, idx) => {
                const key = `social-${s.name}`;
                const delay = `${idx * 60}ms`;

                if (s.type === "svg") {
                  // Render the SVG string as a data URI image instead of
                  // injecting HTML. This avoids using dangerouslySetInnerHTML
                  // and prevents server-side HTML serialization issues.
                  const dataUri =
                    "data:image/svg+xml;utf8," + encodeURIComponent(s.svg);
                  return (
                    <a
                      key={key}
                      href={s.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label={s.name}
                      className='w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300 overflow-hidden'
                      style={{ transitionDelay: delay }}
                    >
                      <img src={dataUri} alt={s.name} className='w-4 h-4' />
                    </a>
                  );
                }

                if (s.type === "react") {
                  // Render a small fallback (initials) instead of importing
                  // react-icons at module level.
                  const initials = s.name
                    .split(" ")
                    .map((p) => p.charAt(0))
                    .slice(0, 2)
                    .join("");
                  return (
                    <a
                      key={key}
                      href={s.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-transform duration-300'
                      style={{ transitionDelay: delay }}
                      aria-label={s.name}
                    >
                      <span className='text-xs font-semibold'>{initials}</span>
                    </a>
                  );
                }

                return null;
              })}
            </div>
          </div>

          <div className='text-sm text-gray-400 md:text-right'>
            {footer.copyright.replace("{year}", String(year))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
