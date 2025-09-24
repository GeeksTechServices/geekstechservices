"use client";
import React from "react";
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
  return (
    <Card className='max-w-6xl mx-auto px-6 py-12 mt-12 bg-transparent border-t border-muted'>
      <CardContent>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <Logo />
            <p className='mt-4 text-gray-300'>{footerData.elevatorPitch}</p>
          </div>

          <div className='md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6'>
            {typedFooter.columns.map((col) => (
              <div key={col.title}>
                <h4 className='font-semibold mb-3'>{col.title}</h4>
                <ul className='space-y-2'>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className='text-gray-300 hover:text-[var(--accent)] transition-colors'
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
            <div className='flex items-center gap-3 text-[var(--accent)]'>
              {/* Social icons with staggered hover animations */}
              {typedFooter.social.map((s, idx) => {
                const key = `social-${s.name}`;
                if (s.type === "svg") {
                  return (
                    <a
                      key={key}
                      href={s.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='hover:-translate-y-1 transition-transform duration-300'
                      style={{ transitionDelay: `${idx * 60}ms` }}
                      aria-label={s.name}
                      dangerouslySetInnerHTML={{ __html: s.svg }}
                    />
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
                        className='text-[var(--accent)] hover:scale-110 transition-transform duration-300'
                        style={{ transitionDelay: `${idx * 60}ms` }}
                        aria-label={s.name}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>

          <div className='text-sm text-gray-400'>
            {footerData.copyright.replace("{year}", String(year))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
