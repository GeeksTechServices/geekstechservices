"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Image from "next/image";
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

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

  return (
    <header className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Link href='/' className='flex items-center gap-3'>
          <Image src='/file.svg' alt='logo' width={32} height={32} />
          <span className='font-semibold'>GeekStechServices</span>
        </Link>
      </div>

      <div className='flex items-center gap-3'>
        {/* Desktop navigation */}
        <nav aria-label='Main navigation' className='hidden sm:block'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/'
                    className='px-3 py-2 text-sm text-gray-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/blogs'
                    className='px-3 py-2 text-sm text-gray-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Blogs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/about'
                    className='px-3 py-2 text-sm text-gray-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/pricing'
                    className='px-3 py-2 text-sm text-gray-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href='/contact'
                    className='px-3 py-2 text-sm text-gray-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
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
            className='inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
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

          {open && (
            <div
              id='mobile-navigation'
              className='absolute right-4 top-14 z-50 w-64 rounded-md border bg-card p-4 shadow-lg transition-transform duration-200 ease-out transform origin-top-right'
            >
              <ul className='flex flex-col gap-2'>
                <li>
                  <Link
                    href='/'
                    onClick={() => setOpen(false)}
                    className='block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/blogs'
                    onClick={() => setOpen(false)}
                    className='block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    onClick={() => setOpen(false)}
                    className='block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href='/pricing'
                    onClick={() => setOpen(false)}
                    className='block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    onClick={() => setOpen(false)}
                    className='block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                  >
                    Contact
                  </Link>
                </li>

                {user ? (
                  <>
                    <li className='mt-2'>
                      <button
                        onClick={() => {
                          setOpen(false);
                          handleSignOut();
                        }}
                        className='w-full text-left block px-2 py-2 rounded hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
                      >
                        Sign out
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className='mt-2'>
                      <Link
                        href='/auth/signin'
                        onClick={() => setOpen(false)}
                        className='block'
                      >
                        <Button variant='ghost' className='w-full'>
                          Sign in
                        </Button>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/auth/signup'
                        onClick={() => setOpen(false)}
                        className='block'
                      >
                        <Button className='w-full'>Sign up</Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop auth buttons + avatar */}
        <div className='hidden sm:flex items-center gap-3'>
          {user ? (
            <DropdownMenu>
              <div className='flex items-center gap-3'>
                <span className='text-sm text-gray-200 mr-2'>
                  {user.displayName || user.email}
                </span>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label='Account'
                    className='ml-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
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
                  <Link href='/account/profile' className='block w-full'>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href='/account/settings' className='block w-full'>
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
                <Button variant='ghost'>Sign in</Button>
              </Link>
              <Link href='/auth/signup'>
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
