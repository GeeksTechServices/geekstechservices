"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/ui/Logo";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuHome,
  LuInfo,
  LuDollarSign,
  LuNewspaper,
  LuMail,
  LuLayoutDashboard,
  LuLogIn,
  LuUserPlus,
  LuLogOut,
} from "react-icons/lu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", Icon: LuHome },
    { href: "/about", label: "About", Icon: LuInfo },
    { href: "/pricing", label: "Pricing", Icon: LuDollarSign },
    { href: "/blogs", label: "Blogs", Icon: LuNewspaper },
    { href: "/contact", label: "Contact", Icon: LuMail },
  ] as const;

  // Close menu when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!menuRef.current) return;
      if (e.target instanceof Node && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  // Subscribe to Firebase auth state
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
    });
    return () => unsub();
  }, []);

  // Detect scroll for glass header emphasis
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(getFirebaseAuth());
      setOpen(false);
      router.push("/");
    } catch (err) {
      // ignore or show toast
      console.warn("Sign-out failed", err);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`sticky top-0 z-50 border-b transition-colors supports-[backdrop-filter]:backdrop-blur-md ${
        scrolled
          ? "bg-[#0b0b0f]/70 border-white/10"
          : "bg-transparent border-transparent"
      }`}
      role='banner'
    >
      <div className='max-w-6xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link href='/' className='flex items-center gap-3'>
            <Logo />
          </Link>
        </div>

        <div className='flex items-center gap-3'>
          {/* Desktop navigation */}
          <nav aria-label='Main navigation' className='hidden sm:block'>
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map(({ href, label }) => (
                  <NavigationMenuItem key={href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={href}
                        className={
                          "group relative px-3 py-2 text-sm text-gray-200 no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                        }
                        aria-current={isActive(href) ? "page" : undefined}
                      >
                        {label}
                        {isActive(href) && (
                          <motion.span
                            layoutId='nav-underline'
                            className='absolute left-3 right-3 -bottom-[2px] h-[2px] rounded bg-[var(--accent)]'
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                          />
                        )}
                        {/* subtle hover glow */}
                        <span className='pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-10 group-focus-visible:opacity-10 bg-[var(--accent)]' />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile hamburger */}
          <div className='sm:hidden' ref={menuRef}>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls='mobile-navigation'
              onClick={() => setOpen((s) => !s)}
              className='inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:bg-white/5 transition-colors'
            >
              <svg
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                {open ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  id='mobile-navigation'
                  initial={{ opacity: 0, scale: 0.98, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -6 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className='absolute right-4 top-14 z-50 w-72 rounded-xl border border-white/10 bg-[#0b0b0f]/80 p-3 shadow-2xl shadow-black/50 backdrop-blur-xl'
                >
                  <motion.ul
                    className='flex flex-col gap-1'
                    initial='hidden'
                    animate='show'
                    exit='hidden'
                    variants={{
                      hidden: {
                        transition: {
                          staggerChildren: 0.03,
                          staggerDirection: -1,
                        },
                      },
                      show: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.03,
                        },
                      },
                    }}
                  >
                    {navLinks.map(({ href, label, Icon }) => (
                      <motion.li
                        key={href}
                        variants={{
                          hidden: { opacity: 0, x: -6 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className={[
                            "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                            isActive(href)
                              ? "bg-white/10 text-white"
                              : "hover:bg-white/8 hover:text-white",
                          ].join(" ")}
                          aria-current={isActive(href) ? "page" : undefined}
                        >
                          <Icon
                            className='h-4 w-4 opacity-90'
                            aria-hidden='true'
                          />
                          <span>{label}</span>
                        </Link>
                      </motion.li>
                    ))}

                    {user ? (
                      <motion.li
                        className='mt-2'
                        variants={{
                          hidden: { opacity: 0, x: -6 },
                          show: { opacity: 1, x: 0 },
                        }}
                      >
                        <button
                          onClick={() => {
                            setOpen(false);
                            handleSignOut();
                          }}
                          className='flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors duration-200 hover:bg-white/8 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                        >
                          <LuLogOut className='h-4 w-4' aria-hidden='true' />
                          Sign out
                        </button>
                      </motion.li>
                    ) : (
                      <>
                        <motion.li
                          className='mt-2'
                          variants={{
                            hidden: { opacity: 0, x: -6 },
                            show: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            href='/auth/signin'
                            onClick={() => setOpen(false)}
                            className='block'
                          >
                            <Button
                              variant='ghost'
                              className='w-full inline-flex items-center gap-2'
                            >
                              <LuLogIn className='h-4 w-4' aria-hidden='true' />
                              Sign in
                            </Button>
                          </Link>
                        </motion.li>
                        <motion.li
                          variants={{
                            hidden: { opacity: 0, x: -6 },
                            show: { opacity: 1, x: 0 },
                          }}
                        >
                          <Link
                            href='/auth/signup'
                            onClick={() => setOpen(false)}
                            className='block'
                          >
                            <Button className='w-full inline-flex items-center gap-2'>
                              <LuUserPlus
                                className='h-4 w-4'
                                aria-hidden='true'
                              />
                              Sign up
                            </Button>
                          </Link>
                        </motion.li>
                      </>
                    )}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop auth buttons + avatar */}
          <div className='hidden sm:flex items-center gap-3'>
            {user ? (
              <DropdownMenu>
                <div className='flex items-center gap-3'>
                  <Button
                    variant='ghost'
                    className='hidden md:inline-flex'
                    onClick={() => router.push("/dashboard")}
                  >
                    <LuLayoutDashboard
                      className='mr-2 h-4 w-4'
                      aria-hidden='true'
                    />
                    Dashboard
                  </Button>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label='Account'
                      className='ml-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] hover:ring-1 hover:ring-white/20 transition'
                    >
                      <Avatar>
                        {user.photoURL ? (
                          <AvatarImage src={user.photoURL} alt='avatar' />
                        ) : (
                          <AvatarFallback>
                            {(user.displayName || "U").charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                </div>

                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/profile' className='block w-full'>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href='/dashboard/settings' className='block w-full'>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => handleSignOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href='/auth/signin'>
                  <Button
                    variant='ghost'
                    className='inline-flex items-center gap-2'
                  >
                    <LuLogIn className='h-4 w-4' aria-hidden='true' />
                    Sign in
                  </Button>
                </Link>
                <Link href='/auth/signup'>
                  <Button className='inline-flex items-center gap-2'>
                    <LuUserPlus className='h-4 w-4' aria-hidden='true' />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
