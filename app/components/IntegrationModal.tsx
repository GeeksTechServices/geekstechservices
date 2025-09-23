"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Integration = {
  name: string;
  logo: string;
  href: string;
  category?: string;
  description?: string;
  docs?: string;
};

export default function IntegrationModal({
  integration,
}: {
  integration: Integration;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className='glass-strong backdrop-blur-sm border border-[var(--accent)]/18 bg-[rgba(255,255,255,0.02)]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <Avatar className='bg-transparent'>
              <AvatarImage
                src={integration.logo}
                alt={`${integration.name} logo`}
              />
            </Avatar>
            <div>
              <DialogTitle>{integration.name}</DialogTitle>
              <DialogDescription className='text-sm text-white/80'>
                {integration.category}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='mt-4 text-sm text-white/80'>
          <p>{integration.description}</p>

          <ol className='mt-4 list-decimal list-inside text-sm space-y-2'>
            <li>Install the connector or SDK for your environment.</li>
            <li>Provide API credentials and configure ingestion endpoints.</li>
            <li>Map device tags and alert rules to your on-call schedules.</li>
          </ol>

          <div className='mt-4 text-xs text-white/70'>
            For full details, see the vendor docs or our integration guide.
          </div>
        </div>

        <DialogFooter>
          <div className='flex items-center gap-2'>
            <a href={integration.docs} target='_blank' rel='noreferrer'>
              <Button variant='ghost' size='sm'>
                Open docs
              </Button>
            </a>
            <a href={integration.href} target='_blank' rel='noreferrer'>
              <Button variant='default' size='sm'>
                Go to site
              </Button>
            </a>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
