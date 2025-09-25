"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Turnstile from "@/app/(landing)/contact/Turnstile.client";
import { Button } from "@/components/ui/button";

const REQUEST_TEMPLATES: Record<string, { subject: string; message: string }> =
  {
    demo: {
      subject: "Request: Demo — IoT Network Health Dashboard",
      message:
        "Hi! I'd like to request a demo of the AI-Powered IoT Network Health Dashboard to see how it can help our fleet. Please contact me to schedule a 15–30 minute walkthrough.",
    },
    enterprise: {
      subject: "Inquiry: Enterprise / Pilot",
      message:
        "Hi! We're evaluating solutions for large-scale device fleets and would like information about enterprise pricing, SLAs, and pilot programs.",
    },
    support: {
      subject: "Support request",
      message:
        "I need help with an existing deployment — please advise on next steps and support options.",
    },
    sales: {
      subject: "Contact sales",
      message:
        "Please connect me with your sales team to discuss options and pricing.",
    },
  };

export default function ContactForm() {
  const params = useSearchParams();
  const request = params?.get("request") || undefined;
  const pre = request ? REQUEST_TEMPLATES[request] : undefined;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("New contact from GeekStechServices");

  useEffect(() => {
    if (pre) {
      setSubject(pre.subject);
      setMessage(pre.message);
    }
    // intentionally do NOT autofill name/email from query params for privacy
  }, [pre]);

  return (
    <div className='bg-white/5 p-6 rounded-xl'>
      <form
        action='https://formspree.io/f/xwprkzgq'
        method='POST'
        className='space-y-4'
      >
        {/* visible subject (also mirrored to _subject for Formspree) */}
        <input type='hidden' name='_subject' value={subject} />
        <div>
          <label className='text-sm text-gray-300'>Subject</label>
          <input
            name='subject'
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-300'>Name</label>
          <input
            name='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-300'>Email</label>
          <input
            name='email'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
          />
        </div>

        <div>
          <label className='text-sm text-gray-300'>Message</label>
          <textarea
            name='message'
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='w-full bg-transparent border border-white/10 rounded px-3 py-2 mt-1'
          />
        </div>

        <div className='mt-2'>
          <Turnstile
            siteKey={
              process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "your-site-key"
            }
          />
        </div>

        <div className='flex justify-end'>
          <Button type='submit' variant='default'>
            Send message
          </Button>
        </div>
      </form>
    </div>
  );
}
