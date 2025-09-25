"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/dashboard/AnimatedCounter.client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Deployment Complete",
    message:
      "Your application v2.1.0 has been successfully deployed to production.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "warning",
    title: "High CPU Usage",
    message: "Server load has exceeded 85% for the past 10 minutes.",
    time: "15 min ago",
    unread: true,
  },
  {
    id: "3",
    type: "info",
    title: "Maintenance Scheduled",
    message: "System maintenance scheduled for tomorrow at 2 AM UTC.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: "4",
    type: "error",
    title: "API Rate Limit",
    message: "Rate limit exceeded on /api/users endpoint.",
    time: "2 hours ago",
    unread: false,
  },
];

export default function NotificationsWidget() {
  const [mounted, setMounted] = React.useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-600 dark:text-green-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "error":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  const getTypeDot = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='font-semibold'>Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant='destructive'>
              <AnimatedCounter value={unreadCount} />
            </Badge>
          )}
        </div>

        <div className='space-y-3 max-h-80 overflow-y-auto'>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                notification.unread
                  ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                  : "bg-background"
              }`}
            >
              <div className='flex items-start gap-3'>
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${getTypeDot(
                    notification.type
                  )}`}
                />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between mb-1'>
                    <h4
                      className={`text-sm font-medium ${getTypeColor(
                        notification.type
                      )}`}
                    >
                      {notification.title}
                    </h4>
                    <span className='text-xs text-muted-foreground'>
                      {notification.time}
                    </span>
                  </div>
                  <p className='text-xs text-muted-foreground line-clamp-2'>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-3 border-t'>
          <Button variant='ghost' size='sm' className='w-full'>
            View all notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
