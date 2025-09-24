"use client";

import React, { useEffect, useState } from "react";
import CookiePreferencesModal from "./CookiePreferencesModal.client";

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expires +
    "; path=/; Secure; SameSite=Lax";
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      // If cookie exists, don't show. If localStorage "cookie_banner_closed" exists (user closed), don't create cookie but hide until next visit
      const hasCookie = document.cookie
        .split(";")
        .some((c) => c.trim().startsWith("cookie_consent="));
      const closed = localStorage.getItem("cookie_banner_closed");
      if (!hasCookie && !closed) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    setCookie("cookie_consent", JSON.stringify({ accepted: true }), 365);
    setVisible(false);
  };

  const closeBanner = () => {
    // user closed without consenting: store closed marker in localStorage (do not create cookie)
    try {
      localStorage.setItem("cookie_banner_closed", "1");
    } catch (e) {}
    setVisible(false);
  };

  const openPreferences = () => setModalOpen(true);

  if (!visible)
    return (
      <>
        {modalOpen && (
          <CookiePreferencesModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={() => setModalOpen(false)}
          />
        )}
      </>
    );

  return (
    <>
      <CookiePreferencesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(prefs) => {
          setCookie("cookie_preferences", JSON.stringify(prefs), 365);
          setModalOpen(false);
          setVisible(false);
        }}
      />

      <div className='fixed bottom-6 left-6 right-6 md:left-auto md:right-6 z-50'>
        <div className='bg-[#0b0b0b] border border-white/5 rounded-lg p-4 flex items-start justify-between gap-4'>
          <div className='flex-1'>
            <div className='font-medium'>We use cookies</div>
            <div className='text-sm text-gray-400'>
              We use cookies to improve your experience. You can accept or
              manage your preferences.
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={openPreferences}
              className='bg-transparent border border-white/10 px-3 py-2 rounded text-sm'
            >
              Preferences
            </button>
            <button
              onClick={closeBanner}
              className='bg-transparent border border-white/10 px-3 py-2 rounded text-sm'
            >
              Close
            </button>
            <button
              onClick={acceptAll}
              className='bg-[var(--accent)] px-4 py-2 rounded text-sm'
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
