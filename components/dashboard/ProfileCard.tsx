"use client";

import React from "react";
import { signOut, User } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function initials(name: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileCard({ user }: { user: User | null }) {
  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
    // page will redirect via auth hook in DashboardShell
  };

  const name = user?.displayName || null;
  const email = user?.email || null;
  const photo = user?.photoURL || null;

  return (
    <div className='flex items-center gap-3 p-2'>
      <Avatar>
        {photo ? (
          <AvatarImage src={photo} alt={name || email || "User avatar"} />
        ) : (
          <AvatarFallback>{initials(name || email)}</AvatarFallback>
        )}
      </Avatar>
      <div className='flex-1 min-w-0'>
        <div className='text-sm font-medium truncate'>{name || email}</div>
        <div className='text-xs text-muted-foreground truncate'>{email}</div>
      </div>
      <div>
        <Button variant='ghost' size='sm' onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
