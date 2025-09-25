"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { updateProfile, signOut } from "firebase/auth";

export default function AccountProfileManager() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = React.useState(user?.displayName || "");
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error">(
    "success"
  );

  React.useEffect(() => {
    if (user?.displayName) setDisplayName(user.displayName);
  }, [user?.displayName]);

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 4000);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      const auth = getFirebaseAuth();
      await updateProfile(auth.currentUser!, { displayName });
      showMessage("Profile updated successfully");
    } catch (e) {
      console.error(e);
      showMessage("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    const auth = getFirebaseAuth();
    await signOut(auth);
  }

  if (!user) return <div className='text-sm'>No user loaded.</div>;

  return (
    <div className='space-y-6'>
      {message && (
        <div
          className={`p-2 text-xs rounded-md border ${
            messageType === "success"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <Card className='border shadow-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base'>Profile Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent className='space-y-5'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-16 w-16'>
              <AvatarImage src={user.photoURL || ""} />
              <AvatarFallback className='text-lg'>
                {(user.displayName || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant='outline' size='sm'>
                Change Photo
              </Button>
              <p className='text-[10px] text-muted-foreground mt-1'>
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label className='block text-xs font-medium mb-1'>
                Display Name
              </label>
              <Input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Your name'
              />
            </div>
            <div>
              <label className='block text-xs font-medium mb-1'>Email</label>
              <Input value={user.email || ""} disabled />
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <Button onClick={handleSave} size='sm' disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant='outline' size='sm' onClick={handleSignOut}>
              Sign Out
            </Button>
            <Badge variant={user.emailVerified ? "default" : "secondary"}>
              {user.emailVerified ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className='border shadow-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base'>Account Status</CardTitle>
          <CardDescription>Your account timeline</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-3 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Created</span>
            <span className='font-medium'>
              {user.metadata.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-muted-foreground'>Last Sign-In</span>
            <span className='font-medium'>
              {user.metadata.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                : "Unknown"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
