"use client";

import React, { useEffect, useState } from "react";
import CookiePreferencesModal from "./CookiePreferencesModal.client";
import { motion, AnimatePresence } from "framer-motion";

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // keep Secure and SameSite for modern browsers; HttpOnly can't be set from JS
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; Secure; SameSite=Lax`;
}

type CookiePreferences = Record<string, boolean> | undefined;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const hasCookie = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("cookie_consent="));
      const closed = localStorage.getItem("cookie_banner_closed");
      if (!hasCookie && !closed) setVisible(true);
    } catch (e) {
      // If storage is inaccessible, show the banner (safer default)
      console.error("CookieBanner storage access error:", e);
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    setCookie("cookie_consent", JSON.stringify({ accepted: true }), 365);
    // clear closed marker if present
    try {
      localStorage.removeItem("cookie_banner_closed");
    } catch {}
    setVisible(false);
  };

  const rejectAll = () => {
    setCookie("cookie_consent", JSON.stringify({ accepted: false }), 365);
    try {
      localStorage.removeItem("cookie_banner_closed");
    } catch {}
    setVisible(false);
  };

  const closeBanner = () => {
    try {
      localStorage.setItem("cookie_banner_closed", "1");
    } catch (e) {
      console.error("Error accessing localStorage:", e);
    }
    setVisible(false);
  };

  const openPreferences = () => setModalOpen(true);

  return (
    <>
      {/* Preferences modal (controlled) */}
      {modalOpen && (
        <CookiePreferencesModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={(prefs: CookiePreferences) => {
            try {
              setCookie("cookie_preferences", JSON.stringify(prefs || {}), 365);
            } catch (e) {
              console.error("Failed to save cookie preferences:", e);
            }
            setModalOpen(false);
            setVisible(false);
          }}
        />
      )}

      {/* Only render the banner on client and when visible */}
      <AnimatePresence>
        {mounted && visible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className='fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-50'
            role='dialog'
            aria-live='polite'
            aria-label='Cookie consent banner'
          >
            <div className='max-w-3xl mx-auto'>
              <div className='backdrop-blur-md bg-white/4 border border-white/6 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center gap-3 md:gap-6 shadow-lg'>
                <div className='flex-1 text-sm'>
                  <div className='flex items-center gap-3'>
                    <span className='inline-flex items-center justify-center rounded-full bg-[rgba(179,45,255,0.14)] text-[var(--accent)] w-9 h-9 font-semibold'>
                      🍪
                    </span>
                    <div>
                      <div className='font-medium text-white'>
                        We use cookies
                      </div>
                      <div className='text-gray-300'>
                        We use cookies to personalize content, analyze traffic,
                        and provide a better experience. Manage your preferences
                        or accept all.
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    onClick={openPreferences}
                    className='px-3 py-2 rounded-md text-sm border border-white/10 text-gray-100 hover:bg-white/6 focus:outline-none focus-visible:ring focus-visible:ring-white/20'
                    aria-label='Open cookie preferences'
                  >
                    Preferences
                  </button>

                  <button
                    onClick={rejectAll}
                    className='px-3 py-2 rounded-md text-sm bg-transparent border border-white/10 text-gray-100 hover:bg-white/6 focus:outline-none focus-visible:ring focus-visible:ring-white/20'
                    aria-label='Reject non-essential cookies'
                  >
                    Reject
                  </button>

                  <button
                    onClick={acceptAll}
                    className='px-4 py-2 rounded-md text-sm bg-[var(--accent)] text-black font-semibold hover:brightness-95 focus:outline-none focus-visible:ring focus-visible:ring-[var(--accent)]'
                    aria-label='Accept all cookies'
                  >
                    Accept
                  </button>

                  <button
                    onClick={closeBanner}
                    className='ml-2 text-sm text-gray-400 hover:text-gray-200 focus:outline-none'
                    aria-label='Dismiss cookie banner temporarily'
                    title='Dismiss'
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className='mt-2 text-xs text-gray-400 text-center md:text-right'>
                <a href='/privacy' className='underline underline-offset-2'>
                  Privacy policy
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
