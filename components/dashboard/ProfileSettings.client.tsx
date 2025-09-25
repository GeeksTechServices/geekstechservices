"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = React.useState(user?.displayName || "");
  const [saving, setSaving] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [message, setMessage] = React.useState<string | null>(null);

  function save() {
    setSaving(true);
    setMessage(null);
    setTimeout(() => {
      setSaving(false);
      setMessage("Profile updated (simulated)");
    }, 800 + Math.random() * 600);
  }

  return (
    <div className='space-y-6 max-w-xl'>
      <div>
        <label className='block text-xs font-medium mb-1'>Display Name</label>
        <Input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder='Your name'
        />
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-sm font-medium'>Email Notifications</div>
          <div className='text-xs text-muted-foreground'>
            Product updates & security alerts.
          </div>
        </div>
        <Switch
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-sm font-medium'>Dark Mode</div>
          <div className='text-xs text-muted-foreground'>
            Theme preference (local only)
          </div>
        </div>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </div>
      <Button disabled={saving} onClick={save} size='sm'>
        {saving ? "Saving..." : "Save Changes"}
      </Button>
      {message && (
        <div className='text-xs text-green-600 dark:text-green-400'>
          {message}
        </div>
      )}
    </div>
  );
}
