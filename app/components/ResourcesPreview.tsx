"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

const container = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { stiffness: 260, damping: 28 },
  },
};

export default function ResourcesPreview() {
  return (
    <section className='my-20'>
      <div className='mx-auto max-w-6xl px-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-sm font-semibold uppercase tracking-wider text-[var(--accent)]'>
              From our blog
            </h3>
            <p className='mt-2 text-3xl font-extrabold'>Resources & guides</p>
            <p className='mt-1 text-sm text-white/70'>
              Deep dives, how-tos, and case studies hand-crafted by our team.
            </p>
          </div>
          <Link href='/blog' className='text-sm text-white/80 hover:underline'>
            View all
          </Link>
        </div>

        <motion.div
          initial='hidden'
          animate='show'
          variants={container}
          className='mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6'
        >
          {resources.map((r) => (
            <motion.article
              key={r.href}
              variants={item}
              whileHover={{ translateY: -6, scale: 1.01 }}
              className='glass-strong p-4 rounded-2xl overflow-hidden border border-[rgba(179,45,255,0.04)]'
            >
              <div className='h-44 w-full relative rounded-lg overflow-hidden bg-gradient-to-br from-[rgba(179,45,255,0.03)] to-transparent'>
                <Image
                  src={"/placeholder.svg"}
                  alt={r.title}
                  fill
                  className='object-cover opacity-95'
                />
                <div className='absolute left-4 bottom-4 bg-[rgba(0,0,0,0.35)] px-3 py-1 rounded-full text-xs text-white/90'>
                  {"Article"}
                </div>
              </div>

              <div className='mt-4'>
                <h4 className='text-lg font-semibold leading-tight'>
                  <Link href={r.href} className='hover:underline'>
                    {r.title}
                  </Link>
                </h4>
                <p className='mt-2 text-sm text-white/80 line-clamp-3'>
                  {r.excerpt}
                </p>
              </div>

              <div className='mt-4 flex items-center justify-between text-xs text-white/70'>
                <span>{formatDate(r.date)}</span>
                <Link
                  href={r.href}
                  className='text-[var(--accent)] font-medium'
                >
                  Read
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
