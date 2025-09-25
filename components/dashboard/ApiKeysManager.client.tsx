"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
};

export default function ApiKeysManager() {
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API",
      key: "pk_live_" + Math.random().toString(36).slice(2, 12),
      created: "2025-01-15",
      lastUsed: "2025-09-24",
    },
    {
      id: "2",
      name: "Development API",
      key: "pk_dev_" + Math.random().toString(36).slice(2, 12),
      created: "2025-02-10",
      lastUsed: "2025-09-20",
    },
  ]);
  const [message, setMessage] = React.useState<string | null>(null);

  function flash(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  }

  function generateApiKey() {
    const k: ApiKey = {
      id: Date.now().toString(),
      name: `API Key ${apiKeys.length + 1}`,
      key: `pk_${Math.random() > 0.5 ? "live" : "dev"}_${Math.random()
        .toString(36)
        .slice(2, 14)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys((prev) => [k, ...prev]);
    flash("New key generated");
  }

  function revoke(id: string) {
    setApiKeys((p) => p.filter((k) => k.id !== id));
    flash("Key revoked");
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='text-base'>API Keys</CardTitle>
            <CardDescription>Manage programmatic access</CardDescription>
          </div>
          <Button size='sm' onClick={generateApiKey}>
            Generate
          </Button>
        </div>
        {message && (
          <p className='text-xs text-muted-foreground mt-2'>{message}</p>
        )}
      </CardHeader>
      <CardContent className='space-y-3'>
        {apiKeys.map((k) => (
          <div
            key={k.id}
            className='flex items-center justify-between rounded-md border p-3'
          >
            <div className='space-y-1'>
              <p className='text-sm font-medium'>{k.name}</p>
              <p className='font-mono text-xs text-muted-foreground'>
                {k.key.slice(0, 10)}***{k.key.slice(-3)}
              </p>
              <p className='text-[10px] text-muted-foreground'>
                Created {k.created} • Last used {k.lastUsed}
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  navigator.clipboard.writeText(k.key);
                  flash("Copied");
                }}
              >
                Copy
              </Button>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => revoke(k.id)}
              >
                Revoke
              </Button>
            </div>
          </div>
        ))}
        {apiKeys.length === 0 && (
          <p className='text-xs text-muted-foreground'>No API keys yet.</p>
        )}
      </CardContent>
    </Card>
  );
}
