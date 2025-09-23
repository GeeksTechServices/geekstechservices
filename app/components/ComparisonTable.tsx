"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import pricingData from "@/lib/pricing.json";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Plan = {
  id: string;
  name: string;
  slug?: string;
  short_description?: string;
  price_monthly?: number | null;
  price_yearly?: number | null;
  included_devices?: number | null;
  included_gateways?: number | null;
  included_users?: number | null;
  overage_per_device_month?: number | null;
  per_device_ingest_per_minute?: number | null;
  max_ingest_events_per_minute?: number | null;
  data_retention_days?: number | null;
  analytics_retention_days?: number | null;
  storage_gb_included?: number | null;
  extra_storage_gb_price_month?: number | null;
  api_rate_limit_per_minute?: number | null;
  webhook_calls_per_month?: number | null;
  alerts_per_month?: number | null;
  max_reports_per_month?: number | null;
  export_formats?: string[];
  predictive_maintenance?: boolean;
  ai_health_score?: boolean;
  realtime_alerts?: boolean;
  historical_analytics?: boolean;
  custom_metrics_limit?: number | null;
  predictive_model_slots?: number | null;
  predictive_model_runs_per_month?: number | null;
  integrations_included?: string[];
  sso?: boolean;
  audit_logs_days?: number | null;
  onboarding_hours_included?: number | null;
  migration_hours_included?: number | null;
  support_tier?: string;
  support_response_time_hours?: number | null;
  sla?: boolean;
  sla_uptime_percent?: number | null;
  dedicated_account_manager?: boolean;
  private_networking?: boolean;
  on_premise_option?: boolean;
  contract_required?: boolean;
  min_commit_months?: number | null;
  recommended?: boolean;
};

const rows = [
  { key: "price", label: "Price" },
  { key: "billing_hint", label: "Billing" },
  { key: "trial_days", label: "Trial" },
  { key: "included_devices", label: "Included devices" },
  { key: "included_gateways", label: "Included gateways" },
  { key: "included_users", label: "Included users" },
  { key: "overage_per_device_month", label: "Overage per device (mo)" },
  { key: "per_device_ingest_per_minute", label: "Per-device ingest (rpm)" },
  { key: "max_ingest_events_per_minute", label: "Max ingest events/min" },
  { key: "data_retention_days", label: "Data retention (days)" },
  { key: "analytics_retention_days", label: "Analytics retention (days)" },
  { key: "storage_gb_included", label: "Storage included (GB)" },
  { key: "extra_storage_gb_price_month", label: "Extra storage $/GB/mo" },
  { key: "api_rate_limit_per_minute", label: "API rate limit (rpm)" },
  { key: "webhook_calls_per_month", label: "Webhook calls / month" },
  { key: "alerts_per_month", label: "Alerts / month" },
  { key: "max_reports_per_month", label: "Reports / month" },
  { key: "export_formats", label: "Export formats" },
  { key: "predictive_maintenance", label: "Predictive maintenance" },
  { key: "ai_health_score", label: "AI health score" },
  { key: "realtime_alerts", label: "Real-time alerts" },
  { key: "historical_analytics", label: "Historical analytics" },
  { key: "custom_metrics_limit", label: "Custom metrics limit" },
  { key: "predictive_model_slots", label: "Predictive model slots" },
  {
    key: "predictive_model_runs_per_month",
    label: "Predictive model runs / mo",
  },
  { key: "integrations_included", label: "Integrations" },
  { key: "sso", label: "SSO" },
  { key: "audit_logs_days", label: "Audit logs (days)" },
  { key: "onboarding_hours_included", label: "Onboarding hours" },
  { key: "migration_hours_included", label: "Migration hours" },
  { key: "support_tier", label: "Support tier" },
  { key: "support_response_time_hours", label: "Support response time (hrs)" },
  { key: "sla", label: "SLA" },
  { key: "sla_uptime_percent", label: "SLA uptime" },
  { key: "dedicated_account_manager", label: "Dedicated account manager" },
  { key: "private_networking", label: "Private networking" },
  { key: "on_premise_option", label: "On-premise option" },
  { key: "contract_required", label: "Contract required" },
  { key: "min_commit_months", label: "Minimum commitment (months)" },
];

const sections = [
  {
    key: "pricing",
    label: "Pricing",
    keys: ["price", "billing_hint", "trial_days"],
  },
  {
    key: "limits",
    label: "Usage & limits",
    keys: [
      "included_devices",
      "included_gateways",
      "included_users",
      "overage_per_device_month",
      "per_device_ingest_per_minute",
      "max_ingest_events_per_minute",
      "api_rate_limit_per_minute",
      "webhook_calls_per_month",
      "alerts_per_month",
      "max_reports_per_month",
    ],
  },
  {
    key: "retention",
    label: "Retention & storage",
    keys: [
      "data_retention_days",
      "analytics_retention_days",
      "storage_gb_included",
      "extra_storage_gb_price_month",
    ],
  },
  {
    key: "analytics",
    label: "Analytics & models",
    keys: [
      "historical_analytics",
      "predictive_maintenance",
      "ai_health_score",
      "custom_metrics_limit",
      "predictive_model_slots",
      "predictive_model_runs_per_month",
    ],
  },
  {
    key: "integrations",
    label: "Integrations & support",
    keys: [
      "integrations_included",
      "export_formats",
      "sso",
      "support_tier",
      "support_response_time_hours",
      "onboarding_hours_included",
      "migration_hours_included",
    ],
  },
  {
    key: "enterprise",
    label: "Enterprise features",
    keys: [
      "sla",
      "sla_uptime_percent",
      "dedicated_account_manager",
      "private_networking",
      "on_premise_option",
      "contract_required",
      "min_commit_months",
    ],
  },
];

export default function ComparisonTable() {
  const data = pricingData as { plans?: Plan[]; currency?: string };
  const plans = Array.isArray(data?.plans) ? data.plans : [];

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      sections.forEach((s, i) => {
        // open the first two sections by default
        initial[s.key] = i < 2;
      });
      return initial;
    }
  );

  const toggleSection = (k: string) =>
    setOpenSections((s) => ({ ...s, [k]: !s[k] }));

  const tooltipExplanations: Record<string, string> = {
    "-1": "-1 means Unlimited for Enterprise where applicable.",
    webhook_calls_per_month:
      "-1 indicates unlimited webhook calls for Enterprise.",
    alerts_per_month: "-1 indicates unlimited alerts for Enterprise.",
    max_reports_per_month: "-1 indicates unlimited reports for Enterprise.",
    included_devices:
      "For Enterprise this value may be custom or unlimited; contact sales for exact numbers.",
    sla: "SLA indicates whether a service-level agreement is available on the plan.",
  };

  const renderCellValue = (p: Plan, rKey: string) => {
    const val: unknown = (p as Plan)[rKey as keyof Plan];

    if (rKey === "price") {
      const m = p.price_monthly;
      const y = p.price_yearly;
      if (m == null && y == null) return <span>Contact sales</span>;
      return (
        <div className='text-sm'>
          {m != null && <div>${m}/mo</div>}
          {y != null && <div className='text-xs text-white/70'>${y}/yr</div>}
        </div>
      );
    }

    if (rKey === "export_formats" || rKey === "integrations_included") {
      if (Array.isArray(val)) return (val as string[]).join(", ");
      return val ? String(val) : "—";
    }

    if (
      rKey === "webhook_calls_per_month" ||
      rKey === "alerts_per_month" ||
      rKey === "max_reports_per_month"
    ) {
      if (typeof val === "number") {
        return (val as number) < 0 ? "Unlimited" : String(val);
      }
      return "—";
    }

    if (
      [
        "sso",
        "predictive_maintenance",
        "ai_health_score",
        "realtime_alerts",
        "historical_analytics",
        "sla",
        "dedicated_account_manager",
        "private_networking",
        "on_premise_option",
        "contract_required",
      ].includes(rKey)
    ) {
      return (val as boolean) ? "✓" : "—";
    }

    if (rKey === "extra_storage_gb_price_month") {
      return typeof val === "number" ? `$${val}/GB` : "—";
    }

    if (rKey === "sla_uptime_percent") {
      return typeof val === "number" ? `${val}%` : "—";
    }

    if (rKey === "support_response_time_hours") {
      return typeof val === "number" ? `≤ ${val} hrs` : "—";
    }

    if (rKey === "min_commit_months") {
      return typeof val === "number" && (val as number) > 0 ? `${val} mo` : "—";
    }

    if (typeof val === "number") return String(val);
    if (val == null) return "—";
    return String(val);
  };

  return (
    <TooltipProvider>
      <section className='mb-20 md:mb-32'>
        <Card id='pricing-comparison' className='p-6 glass-faint'>
          <h4 className='text-lg font-semibold mb-4'>Compare plans</h4>

          {/* Desktop / large table */}
          <div className='hidden md:block overflow-x-auto'>
            <Table className='w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-1/3'>Features</TableHead>
                  {plans.map((p) => (
                    <TableHead
                      key={p.id}
                      className={`text-center ${
                        p.recommended
                          ? "ring-1 ring-[var(--accent)]/20 bg-[rgba(255,255,255,0.01)]"
                          : ""
                      }`}
                    >
                      <div className='flex flex-col items-center'>
                        <span className='font-semibold'>{p.name}</span>
                        <span className='text-xs text-white/60'>
                          {p.short_description}
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {sections.map((sec) => (
                  <React.Fragment key={sec.key}>
                    <TableRow className='bg-[rgba(255,255,255,0.02)]'>
                      <TableCell colSpan={plans.length + 1}>
                        <div
                          role='button'
                          tabIndex={0}
                          aria-expanded={!!openSections[sec.key]}
                          onClick={() => toggleSection(sec.key)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleSection(sec.key);
                            }
                          }}
                          className='cursor-pointer select-none'
                        >
                          <div
                            className={`flex items-center justify-between px-3 ${
                              // bigger vertical padding to make category title stand out
                              "py-3"
                            } ${
                              openSections[sec.key]
                                ? "rounded-t-lg bg-[rgba(255,255,255,0.02)]"
                                : "rounded-lg bg-[rgba(255,255,255,0.02)]"
                            }`}
                          >
                            <div className='font-semibold'>{sec.label}</div>
                            <div className='text-xs text-white/60 flex items-center gap-2'>
                              <span>
                                {openSections[sec.key] ? "Hide" : "Show"}
                              </span>
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  openSections[sec.key] ? "rotate-180" : ""
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>

                    <AnimatePresence initial={false}>
                      {openSections[sec.key] &&
                        sec.keys.map((k, idx) => {
                          const r = rows.find((rr) => rr.key === k);
                          if (!r) return null;
                          const isLast = idx === sec.keys.length - 1;
                          return (
                            <motion.tr
                              key={r.key}
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18 }}
                              className=''
                            >
                              <TableCell className='font-medium align-top p-0'>
                                <div
                                  className={`px-3 py-3 ${
                                    isLast
                                      ? "rounded-b-lg bg-[rgba(255,255,255,0.01)]"
                                      : ""
                                  }`}
                                >
                                  {r.label}
                                  {[
                                    "webhook_calls_per_month",
                                    "alerts_per_month",
                                    "max_reports_per_month",
                                    "-1",
                                    "included_devices",
                                  ].includes(r.key) && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className='text-xs text-white/50 cursor-help'>
                                          ?
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className='text-xs'>
                                          {tooltipExplanations[r.key] ||
                                            tooltipExplanations["-1"]}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </TableCell>

                              {plans.map((p) => (
                                <TableCell
                                  key={p.id + r.key}
                                  className={`text-center align-top p-0`}
                                >
                                  <div
                                    className={`px-3 py-3 ${
                                      isLast
                                        ? "rounded-b-lg bg-[rgba(255,255,255,0.01)]"
                                        : ""
                                    }`}
                                  >
                                    {renderCellValue(p, r.key)}
                                  </div>
                                </TableCell>
                              ))}
                            </motion.tr>
                          );
                        })}
                    </AnimatePresence>

                    {/* spacer between sections for visual breathing room */}
                    {/* <TableRow>
                    <TableCell colSpan={plans.length + 1}>
                      <div className='h-4' />
                    </TableCell>
                  </TableRow> */}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: stacked plan cards */}
          <div className='md:hidden space-y-4'>
            {plans.map((p) => (
              <Card
                key={p.id}
                className={`${
                  p.recommended
                    ? "ring-1 ring-[var(--accent)]/20 bg-[rgba(255,255,255,0.01)]"
                    : "glass-faint"
                } p-4`}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-semibold'>{p.name}</div>
                    <div className='text-xs text-white/60'>
                      {p.short_description}
                    </div>
                  </div>
                  <div className='text-right'>
                    {p.price_monthly != null ? (
                      <div className='font-extrabold'>
                        ${p.price_monthly}/mo
                      </div>
                    ) : (
                      <div className='text-sm'>Contact sales</div>
                    )}
                    {p.price_yearly != null && (
                      <div className='text-xs text-white/70'>
                        ${p.price_yearly}/yr
                      </div>
                    )}
                  </div>
                </div>

                <div className='mt-3 text-sm space-y-3'>
                  {sections.map((sec) => (
                    <details
                      key={sec.key}
                      className='bg-[rgba(255,255,255,0.01)] rounded-md overflow-hidden mb-3'
                    >
                      <summary className='px-3 py-2 cursor-pointer flex items-center justify-between'>
                        <span className='text-sm font-medium'>{sec.label}</span>
                        <span className='text-xs text-white/60'>
                          {openSections[sec.key] ? "Hide" : "Show"}
                        </span>
                      </summary>
                      <div className='p-3 grid grid-cols-2 gap-2'>
                        {sec.keys.map((k) => {
                          const r = rows.find((rr) => rr.key === k);
                          if (!r) return null;
                          return (
                            <div key={r.key} className='flex flex-col'>
                              <span className='text-xs text-white/60'>
                                {r.label}
                              </span>
                              <span className='text-sm'>
                                {renderCellValue(p, r.key)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </details>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </TooltipProvider>
  );
}
