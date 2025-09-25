"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from "firebase/auth";

export default function AccountSecurityManager() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [deleteConfirmText, setDeleteConfirmText] = React.useState("");
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error">(
    "success"
  );

  function showMessage(text: string, type: "success" | "error" = "success") {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  }

  async function handlePasswordChange() {
    if (!user?.email) return;
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters", "error");
      return;
    }
    setWorking(true);
    try {
      const auth = getFirebaseAuth();
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser!, credential);
      await updatePassword(auth.currentUser!, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showMessage("Password updated successfully");
    } catch (err: unknown) {
      const code = (err as { code?: string } | null)?.code;
      if (code === "auth/wrong-password") {
        showMessage("Current password is incorrect", "error");
      } else {
        console.error(err);
        showMessage("Failed to update password", "error");
      }
    } finally {
      setWorking(false);
    }
  }

  async function handleDeleteAccount() {
    if (!user || deleteConfirmText !== "DELETE") return;
    setWorking(true);
    try {
      const auth = getFirebaseAuth();
      await deleteUser(auth.currentUser!);
      showMessage("Account deleted");
    } catch (e) {
      console.error(e);
      showMessage("Failed to delete account. Re-authenticate first.", "error");
    } finally {
      setWorking(false);
      setShowDeleteDialog(false);
    }
  }

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
          <CardTitle className='text-base'>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <label className='block text-xs font-medium mb-1'>
              Current Password
            </label>
            <Input
              type='password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className='grid sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-medium mb-1'>
                New Password
              </label>
              <Input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className='block text-xs font-medium mb-1'>
                Confirm Password
              </label>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <Button
            size='sm'
            disabled={working || !currentPassword || !newPassword}
            onClick={handlePasswordChange}
          >
            {working ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>

      <Card className='border shadow-sm'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base text-red-600'>Danger Zone</CardTitle>
          <CardDescription>Irreversible account actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant='destructive' size='sm'>
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently remove
                  your account & data.
                </DialogDescription>
              </DialogHeader>
              <div className='space-y-4'>
                <div>
                  <label className='block text-xs font-medium mb-1'>
                    Type DELETE to confirm
                  </label>
                  <Input
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder='DELETE'
                  />
                </div>
                <div className='flex justify-end gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    disabled={deleteConfirmText !== "DELETE" || working}
                    onClick={handleDeleteAccount}
                  >
                    {working ? "Deleting..." : "Delete Account"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
