"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PulsingDot from "@/components/dashboard/PulsingDot.client";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";

interface SystemStatus {
  name: string;
  status: "operational" | "degraded" | "outage";
  uptime: number;
  responseTime: number;
  lastIncident?: string;
}

const services: SystemStatus[] = [
  {
    name: "API Gateway",
    status: "operational",
    uptime: 99.97,
    responseTime: 45,
    lastIncident: "12 days ago",
  },
  {
    name: "Database",
    status: "operational",
    uptime: 99.99,
    responseTime: 12,
    lastIncident: "45 days ago",
  },
  {
    name: "CDN",
    status: "degraded",
    uptime: 99.12,
    responseTime: 120,
    lastIncident: "2 hours ago",
  },
  {
    name: "Authentication",
    status: "operational",
    uptime: 99.95,
    responseTime: 67,
    lastIncident: "8 days ago",
  },
];

export default function SystemStatusWidget() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getStatusColor = (status: SystemStatus["status"]) => {
    switch (status) {
      case "operational":
        return "green";
      case "degraded":
        return "yellow";
      case "outage":
        return "red";
      default:
        return "green";
    }
  };

  const getStatusVariant = (status: SystemStatus["status"]) => {
    switch (status) {
      case "operational":
        return "default";
      case "degraded":
        return "secondary";
      case "outage":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold'>System Status</h3>
          <Badge variant='outline' className='text-xs'>
            All Systems Operational
          </Badge>
        </div>

        <div className='space-y-3'>
          {services.map((service) => (
            <div
              key={service.name}
              className='flex items-center justify-between'
            >
              <div className='flex items-center gap-3'>
                <PulsingDot color={getStatusColor(service.status)} size='sm' />
                <div>
                  <div className='text-sm font-medium'>{service.name}</div>
                  <div className='text-xs text-muted-foreground'>
                    <AnimatedCounter
                      value={service.uptime}
                      format='percent'
                      decimals={2}
                    />{" "}
                    uptime
                  </div>
                </div>
              </div>

              <div className='text-right'>
                <Badge
                  variant={getStatusVariant(service.status)}
                  className='mb-1'
                >
                  {service.status}
                </Badge>
                <div className='text-xs text-muted-foreground'>
                  <AnimatedCounter value={service.responseTime} />
                  ms avg
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-3 border-t'>
          <div className='text-xs text-muted-foreground text-center'>
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
