import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <header className='max-w-6xl mx-auto px-4 py-6 flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Image src='/file.svg' alt='logo' width={32} height={32} />
        <span className='font-semibold'>GeekStechServices</span>
      </div>

      <div className='flex items-center gap-3'>
        <nav
          className='hidden sm:flex gap-6 text-sm text-gray-200'
          aria-label='Main navigation'
        >
          <Link href='#' className='hover:underline'>
            Home
          </Link>
          <Link href='#features' className='hover:underline'>
            Features
          </Link>
          <Link href='#pricing' className='hover:underline'>
            Pricing
          </Link>
          <Link href='#blog' className='hover:underline'>
            Blog
          </Link>
          <Link href='#contact' className='hover:underline'>
            Contact
          </Link>
        </nav>

        <Button variant='ghost' className='hidden sm:inline-flex'>
          Sign in
        </Button>

        <Avatar>
          <AvatarImage src='/file.svg' alt='avatar' />
          <AvatarFallback>G</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
