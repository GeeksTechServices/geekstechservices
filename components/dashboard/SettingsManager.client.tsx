"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
  signOut,
} from "firebase/auth";

export default function SettingsManager(): React.ReactElement {
  const { user, loading } = useAuth();
  const [displayName, setDisplayName] = React.useState(user?.displayName || "");
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [messageType, setMessageType] = React.useState<"success" | "error">(
    "success"
  );

  // Password change state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = React.useState("");

  // Preferences
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(false);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
  const [compactMode, setCompactMode] = React.useState(false);

  // API Keys
  const [apiKeys, setApiKeys] = React.useState([
    {
      id: "1",
      name: "Production API",
      key: "pk_live_..." + Math.random().toString(36).slice(2),
      created: "2024-01-15",
      lastUsed: "2024-09-24",
    },
    {
      id: "2",
      name: "Development API",
      key: "pk_dev_..." + Math.random().toString(36).slice(2),
      created: "2024-02-10",
      lastUsed: "2024-09-20",
    },
  ]);

  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
    }
  }, [user]);

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const updateProfileInfo = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const auth = getFirebaseAuth();
      await updateProfile(auth.currentUser!, { displayName });
      showMessage("Profile updated successfully");
    } catch (error) {
      console.error(error);
      const msg =
        error instanceof Error
          ? error.message
          : String(error ?? "Unknown error");
      showMessage("Failed to update profile: " + msg, "error");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async () => {
    if (!user || !user.email) return;
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
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
      // err may be a FirebaseError with a `code` property
      const code = (err as { code?: string } | undefined)?.code;
      if (code === "auth/wrong-password") {
        showMessage("Current password is incorrect", "error");
      } else {
        console.error(err);
        showMessage("Failed to update password", "error");
      }
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!user || deleteConfirmText !== "DELETE") return;

    setSaving(true);
    try {
      const auth = getFirebaseAuth();
      await deleteUser(auth.currentUser!);
      showMessage("Account deleted successfully");
      // User will be redirected by auth state change
    } catch (e) {
      // log the error for diagnostics and show a friendly message
      console.error(e);
      showMessage(
        "Failed to delete account. You may need to sign in again first.",
        "error"
      );
    } finally {
      setSaving(false);
      setShowDeleteDialog(false);
    }
  };

  const generateApiKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: `API Key ${apiKeys.length + 1}`,
      key: `pk_${Math.random() > 0.5 ? "live" : "dev"}_${Math.random()
        .toString(36)
        .slice(2, 20)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys((prev) => [newKey, ...prev]);
    showMessage("New API key generated");
  };

  const revokeApiKey = (id: string) => {
    setApiKeys((prev) => prev.filter((key) => key.id !== id));
    showMessage("API key revoked");
  };

  const signOutUser = async () => {
    const auth = getFirebaseAuth();
    await signOut(auth);
  };

  if (loading) {
    return <div className='p-6'>Loading...</div>;
  }

  if (!user) {
    return <div className='p-6'>Please sign in to access settings.</div>;
  }

  return (
    <div className='p-6 space-y-6 max-w-4xl'>
      {message && (
        <div
          className={`p-3 rounded-lg text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <Tabs defaultValue='account' className='w-full'>
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='preferences'>Preferences</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='api'>API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value='account' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account details and profile picture
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
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
                  <p className='text-xs text-muted-foreground mt-1'>
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Display Name
                  </label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>
                    Email
                  </label>
                  <Input value={user.email || ""} disabled />
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Button onClick={updateProfileInfo} disabled={saving} size='sm'>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button onClick={signOutUser} variant='outline' size='sm'>
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
              <CardDescription>
                Your account information and verification status
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Email Verified</span>
                <Badge variant={user.emailVerified ? "default" : "secondary"}>
                  {user.emailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Account Created</span>
                <span className='text-xs text-muted-foreground'>
                  {user.metadata.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm'>Last Sign In</span>
                <span className='text-xs text-muted-foreground'>
                  {user.metadata.lastSignInTime
                    ? new Date(
                        user.metadata.lastSignInTime
                      ).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='preferences' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-medium'>Email Notifications</div>
                  <div className='text-xs text-muted-foreground'>
                    Security alerts and account updates
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-medium'>Push Notifications</div>
                  <div className='text-xs text-muted-foreground'>
                    Browser push notifications
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-medium'>Marketing Emails</div>
                  <div className='text-xs text-muted-foreground'>
                    Product updates and tips
                  </div>
                </div>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interface</CardTitle>
              <CardDescription>
                Customize your dashboard experience
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-medium'>Dark Mode</div>
                  <div className='text-xs text-muted-foreground'>
                    Use dark theme
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className='flex items-center justify-between'>
                <div>
                  <div className='text-sm font-medium'>Compact Mode</div>
                  <div className='text-xs text-muted-foreground'>
                    Reduce spacing and padding
                  </div>
                </div>
                <Switch
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='security' className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Current Password
                </label>
                <Input
                  type='password'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder='Enter current password'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  New Password
                </label>
                <Input
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='Enter new password'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>
                  Confirm New Password
                </label>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm new password'
                />
              </div>

              <Button
                onClick={changePassword}
                disabled={saving || !currentPassword || !newPassword}
              >
                {saving ? "Updating..." : "Update Password"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-red-600'>Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <DialogTrigger asChild>
                  <Button variant='destructive' size='sm'>
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove all associated data.
                    </DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>
                        Type <code className='font-mono'>DELETE</code> to
                        confirm:
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
                        onClick={() => setShowDeleteDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant='destructive'
                        onClick={deleteAccount}
                        disabled={deleteConfirmText !== "DELETE" || saving}
                      >
                        {saving ? "Deleting..." : "Delete Account"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='api' className='space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for accessing our services
                  </CardDescription>
                </div>
                <Button onClick={generateApiKey} size='sm'>
                  Generate New Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className='flex items-center justify-between p-3 border rounded-lg'
                  >
                    <div className='space-y-1'>
                      <div className='font-medium text-sm'>{key.name}</div>
                      <div className='font-mono text-xs text-muted-foreground'>
                        {key.key.slice(0, 12)}...{key.key.slice(-4)}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        Created: {key.created} • Last used: {key.lastUsed}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button variant='outline' size='sm'>
                        Copy
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => revokeApiKey(key.id)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
