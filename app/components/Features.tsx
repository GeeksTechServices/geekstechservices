"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Features() {
  const features = [
    {
      title: "Unified IoT Health Score",
      desc: "A single metric that summarizes connectivity, latency, and device health across your fleet.",
    },
    {
      title: "AI-driven Recommendations",
      desc: "Automated troubleshooting steps and predictive alerts so you act before problems escalate.",
    },
    {
      title: "Role-based Dashboards",
      desc: "Custom views for admins, operators, and managers with drilldowns and historic trends.",
    },
  ];

  return (
    <section
      id='features'
      className='w-full max-w-6xl mx-auto px-4 sm:px-6 my-16'
    >
      <div className='mb-8 text-center'>
        <h2 className='text-2xl sm:text-3xl font-semibold'>
          Platform features
        </h2>
        <p className='mt-2 text-gray-300 max-w-2xl mx-auto'>
          Everything you need to keep your IoT deployments healthy, secure, and
          scalable.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='grid grid-cols-1 sm:grid-cols-3 gap-6'
      >
        {features.map((f, idx) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.08 + 0.08, duration: 0.5 }}
          >
            <Card className='p-6 glass-faint hover:shadow-lg transition-shadow'>
              <CardHeader className='p-0'>
                <div className='text-lg font-semibold'>{f.title}</div>
              </CardHeader>
              <CardContent className='p-0 mt-3 text-sm text-gray-300'>
                {f.desc}
              </CardContent>
              <div className='mt-4'>
                <Button variant='ghost'>Learn more</Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
