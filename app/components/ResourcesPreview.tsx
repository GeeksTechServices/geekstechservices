"use client";

import Link from "next/link";
import Image from "next/image";
import resources from "../../lib/resources.json";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

export default function ResourcesPreview() {
  return (
    <section className='my-16'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--accent)]'>
              From our blog
            </h3>
            <p className='mt-2 text-2xl font-bold'>Resources & guides</p>
          </div>
          <Link href='/blog' className='text-sm text-white/80 hover:underline'>
            View all
          </Link>
        </div>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {resources.map((r) => (
            <article key={r.href} className='glass p-4 rounded-lg'>
              <div className='h-36 w-full relative rounded-md overflow-hidden'>
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  className='object-cover'
                />
              </div>
              <h4 className='mt-3 text-lg font-semibold'>
                <Link href={r.href}>{r.title}</Link>
              </h4>
              <p className='mt-2 text-sm text-white/80'>{r.excerpt}</p>
              <div className='mt-3 flex items-center justify-between text-xs text-white/70'>
                <span>{formatDate(r.date)}</span>
                <Link href={r.href} className='text-[var(--accent)]'>
                  Read
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
