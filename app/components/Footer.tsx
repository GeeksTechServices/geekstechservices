import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  return (
    <Card className='max-w-6xl mx-auto px-4 py-6 mt-8 bg-transparent border-t border-muted'>
      <CardContent className='text-center text-sm text-gray-400'>
        © {new Date().getFullYear()} GeekStechServices — AI-powered IoT network
        health.
      </CardContent>
    </Card>
  );
}
