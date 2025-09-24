"use client";

import React, { useEffect, useState } from "react";

export default function CookiePreferencesModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (prefs: {
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }) => void;
}) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [functional, setFunctional] = useState(true);

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem("cookie_preferences");
      if (raw) {
        const parsed = JSON.parse(raw);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
        setFunctional(
          parsed.functional !== undefined ? !!parsed.functional : true
        );
      }
    } catch (e) {
      // ignore
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-end md:items-center justify-center'>
      <div className='absolute inset-0 bg-black/60' onClick={onClose} />
      <div className='relative w-full md:w-3/4 lg:w-1/2 bg-[#0b0b0b] border border-white/5 rounded-lg p-6 z-10'>
        <h3 className='text-lg font-semibold mb-4'>Cookie preferences</h3>
        <p className='text-sm text-gray-400 mb-4'>
          Customize which cookies we may use. You can change these later.
        </p>

        <div className='space-y-4'>
          <label className='flex items-start space-x-3'>
            <input
              type='checkbox'
              checked={functional}
              onChange={(e) => setFunctional(e.target.checked)}
            />
            <div>
              <div className='font-medium'>Functional cookies</div>
              <div className='text-sm text-gray-400'>
                Required for core site functionality.
              </div>
            </div>
          </label>

          <label className='flex items-start space-x-3'>
            <input
              type='checkbox'
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <div>
              <div className='font-medium'>Analytics cookies</div>
              <div className='text-sm text-gray-400'>
                Helps us understand site usage.
              </div>
            </div>
          </label>

          <label className='flex items-start space-x-3'>
            <input
              type='checkbox'
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <div>
              <div className='font-medium'>Marketing cookies</div>
              <div className='text-sm text-gray-400'>
                Used for advertising and personalization.
              </div>
            </div>
          </label>
        </div>

        <div className='mt-6 flex items-center justify-end space-x-3'>
          <button
            className='bg-transparent border border-white/10 px-3 py-2 rounded text-sm'
            onClick={() => {
              // Reject all: save preferences as all false (functional may remain false if user unchecks)
              const prefs = { analytics: false, marketing: false, functional };
              localStorage.setItem("cookie_preferences", JSON.stringify(prefs));
              onSave(prefs);
              onClose();
            }}
          >
            Reject all
          </button>

          <button
            className='bg-[var(--accent)] px-4 py-2 rounded text-sm'
            onClick={() => {
              const prefs = { analytics, marketing, functional };
              localStorage.setItem("cookie_preferences", JSON.stringify(prefs));
              onSave(prefs);
              onClose();
            }}
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}
