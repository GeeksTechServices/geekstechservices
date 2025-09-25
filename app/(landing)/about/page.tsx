import Image from "next/image";

export const metadata = {
  title: "About — GeeksTechServices",
  description:
    "About GeeksTechServices — AI-powered IoT reliability & network health platform",
};

// Small internal UI helpers (kept inside page to avoid extra files for now)
function Section(
  props: React.PropsWithChildren<{
    className?: string;
    id?: string;
    ariaLabel?: string;
  }>
) {
  return (
    <section
      id={props.id}
      aria-label={props.ariaLabel}
      className={`relative scroll-mt-24 py-24 md:py-32 ${
        props.className || ""
      }`}
    >
      {props.children}
    </section>
  );
}

function GradientBackdrop() {
  return (
    <div
      aria-hidden
      className='pointer-events-none absolute inset-0 overflow-hidden'
    >
      <div className='absolute -top-32 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_65%)] opacity-[0.18] blur-3xl' />
      <div className='absolute top-1/3 left-[10%] h-72 w-72 rounded-full bg-[linear-gradient(135deg,#b32dff33,#ffffff05)] blur-2xl' />
      <div className='absolute bottom-0 right-[8%] h-80 w-80 rounded-full bg-[linear-gradient(45deg,#b32dff22,#ffffff03)] blur-2xl' />
    </div>
  );
}

function Card(
  props: React.PropsWithChildren<{
    title?: string;
    eyebrow?: string;
    className?: string;
  }>
) {
  return (
    <div
      className={`group relative rounded-xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm transition hover:border-[var(--accent)]/60 hover:bg-white/[0.06] ${
        props.className || ""
      }`}
    >
      {props.eyebrow && (
        <div className='mb-2 text-xs font-medium uppercase tracking-wider text-[var(--accent)]/80'>
          {props.eyebrow}
        </div>
      )}
      {props.title && (
        <h4 className='text-lg font-semibold leading-tight mb-1'>
          {props.title}
        </h4>
      )}
      <div className='text-sm text-gray-300 leading-relaxed'>
        {props.children}
      </div>
      <div className='pointer-events-none absolute inset-0 rounded-xl ring-0 ring-[var(--accent)]/0 group-hover:ring-2 group-hover:ring-[var(--accent)]/40 transition' />
    </div>
  );
}

function Stat(props: { label: string; value: string; desc?: string }) {
  return (
    <div className='relative flex flex-col gap-1 rounded-lg border border-white/5 bg-white/[0.02] px-6 py-5 shadow-inner shadow-black/40'>
      <span className='text-3xl font-bold tracking-tight bg-gradient-to-tr from-white to-white/70 bg-clip-text text-transparent'>
        {props.value}
      </span>
      <span className='text-sm font-medium text-[var(--accent)]/90'>
        {props.label}
      </span>
      {props.desc && (
        <span className='text-xs text-gray-400 leading-snug'>{props.desc}</span>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className='relative min-h-screen overflow-hidden bg-[var(--bg-dark)] text-white'>
      <GradientBackdrop />

      {/* Hero */}
      <header className='relative'>
        <div className='relative mx-auto max-w-7xl px-6 pt-32 pb-20 md:pt-40 md:pb-32'>
          <div className='max-w-4xl'>
            <p className='mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs font-medium tracking-wide text-[var(--accent)]/90 backdrop-blur-sm'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]' />{" "}
              AI-Powered IoT Reliability Platform
            </p>
            <h1 className='text-balance text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl'>
              Turning raw device telemetry into an actionable{" "}
              <span className='text-[var(--accent)]'>Network Health Score</span>
            </h1>
            <p className='mt-6 max-w-2xl text-lg leading-relaxed text-gray-300'>
              We help modern workplaces & factories maintain resilient,
              observable, and secure connected environments. Our stack unifies
              device metrics, anomaly models, and predictive maintenance signals
              into a clear operational pulse.
            </p>
            <div className='mt-8 flex flex-wrap gap-4'>
              <a
                href='/contact'
                className='inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_#ffffff20,0_4px_18px_-2px_#b32dff66] transition hover:brightness-110'
              >
                Start a conversation
              </a>
              <a
                href='/features'
                className='inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white/90 backdrop-blur hover:border-[var(--accent)]/50 hover:text-white'
              >
                Explore features
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className='mt-16 grid gap-5 sm:grid-cols-3'>
            <Stat
              label='Fleet Uptime'
              value='99.97%'
              desc='Rolling 30‑day aggregate'
            />
            <Stat
              label='Devices Observed'
              value='12K+'
              desc='Edge & on-prem endpoints'
            />
            <Stat
              label='Anomalies Resolved'
              value='4.3K'
              desc='Predictive interventions'
            />
          </div>
        </div>
      </header>

      {/* Values & What We Build */}
      <Section
        className='mx-auto max-w-7xl px-6'
        id='values'
        ariaLabel='Values and capabilities'
      >
        <div className='grid gap-14 md:grid-cols-5 md:gap-10'>
          <div className='md:col-span-2'>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Principles that shape durable systems
            </h2>
            <p className='mt-4 text-base leading-relaxed text-gray-300'>
              Our approach blends secure embedded engineering with
              production-grade cloud & ML operations. Every decision is biased
              toward observability, recoverability and measurable impact.
            </p>
            <div className='mt-8 space-y-4'>
              <Card eyebrow='Value' title='Security first'>
                Threat modeling, principle of least privilege, continuous
                posture monitoring.
              </Card>
              <Card eyebrow='Value' title='Operational clarity'>
                Unified metrics, correlated traces & anomaly narratives that
                reduce MTTR.
              </Card>
              <Card eyebrow='Value' title='Practical AI'>
                Models embedded where they create leverage: early failure
                signals & adaptive baselines.
              </Card>
            </div>
          </div>
          <div className='md:col-span-3 flex flex-col gap-6'>
            <div className='grid gap-6 sm:grid-cols-3'>
              <Card title='Embedded' className='p-5'>
                Firmware architecture, low‑power design, OTA pipelines.
              </Card>
              <Card title='Cloud Data' className='p-5'>
                Ingestion, time‑series compaction, streaming inference.
              </Card>
              <Card title='Edge AI' className='p-5'>
                Lightweight anomaly models & policy automation.
              </Card>
            </div>
            <div className='grid gap-6 sm:grid-cols-2'>
              <Card title='Observability' className='p-5'>
                Fleet health scoring, saturation mapping, predictive maintenance
                windows.
              </Card>
              <Card title='Remediation' className='p-5'>
                Automated rollback, throttling, escalation routing & secure
                update channels.
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Selected Work */}
      <Section
        className='mx-auto max-w-7xl px-6'
        id='work'
        ariaLabel='Case studies'
      >
        <div className='mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='max-w-2xl'>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Selected Impact
            </h2>
            <p className='mt-3 text-base leading-relaxed text-gray-300'>
              How our platform patterns accelerate resilient IoT operations
              across industries.
            </p>
          </div>
          <a
            href='/contact'
            className='inline-flex w-fit items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/80 hover:border-[var(--accent)]/50 hover:text-white'
          >
            Discuss your environment →
          </a>
        </div>
        <div className='grid gap-8 md:grid-cols-3'>
          {[
            {
              img: "/next.svg",
              title: "Adaptive Sensor Networks",
              body: "Low-power mesh devices with dynamic duty cycling & secure OTA scheduling.",
            },
            {
              img: "/vercel.svg",
              title: "Industrial Telemetry Fusion",
              body: "Correlated vibration, thermal & throughput metrics feeding anomaly layers.",
            },
            {
              img: "/window.svg",
              title: "Edge Orchestrated Inference",
              body: "Latency-sensitive models deployed at the perimeter with policy gating.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className='group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] transition hover:border-[var(--accent)]/50'
            >
              <div className='relative h-48 w-full overflow-hidden'>
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  className='object-contain p-8 opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0'
                />
              </div>
              <div className='flex flex-1 flex-col p-6'>
                <h3 className='text-lg font-semibold tracking-tight'>
                  {c.title}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-gray-300'>
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Process & Team */}
      <Section
        className='mx-auto max-w-7xl px-6'
        id='team-process'
        ariaLabel='Team and process'
      >
        <div className='grid gap-16 md:grid-cols-2 md:gap-12'>
          {/* Process Timeline */}
          <div>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              A Delivery Rhythm Built for Reliability
            </h2>
            <ol className='relative mt-10 space-y-10 before:absolute before:left-3.5 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-[var(--accent)]/40 before:to-white/5'>
              {[
                {
                  step: "Discovery",
                  body: "Constraint mapping, attack surface review & success metric alignment.",
                },
                {
                  step: "Prototyping",
                  body: "Hardware proofs, data model scaffolding & anomaly baseline establishment.",
                },
                {
                  step: "Hardening",
                  body: "Instrumentation, chaos drills & secure update channels.",
                },
                {
                  step: "Operations",
                  body: "Continuous scoring, predictive maintenance windows & automated remediation.",
                },
              ].map((p, i) => (
                <li key={p.step} className='relative pl-12'>
                  <span className='absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-black/60 text-xs font-semibold text-[var(--accent)] shadow-[0_0_0_3px_#000]'>
                    {i + 1}
                  </span>
                  <h3 className='text-sm font-semibold tracking-wide text-white/90'>
                    {p.step}
                  </h3>
                  <p className='mt-1 text-sm leading-relaxed text-gray-300'>
                    {p.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Team Snapshot */}
          <div>
            <h2 className='text-2xl font-bold tracking-tight md:text-3xl'>
              A Focused, Cross‑Disciplinary Core
            </h2>
            <p className='mt-4 text-base leading-relaxed text-gray-300'>
              Embedded engineers, data scientists & reliability operators
              combining deep protocol knowledge with production ML competency.
            </p>
            <div className='mt-10 grid gap-6 sm:grid-cols-2'>
              {["Alice Chen", "Ravi Patel", "Maya Singh", "Luis Ortega"].map(
                (name) => (
                  <div
                    key={name}
                    className='flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4'
                  >
                    <div className='relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-white/[0.06]'>
                      <Image
                        src='/file.svg'
                        alt={name}
                        fill
                        className='object-contain p-2 opacity-80'
                      />
                    </div>
                    <div>
                      <div className='text-sm font-semibold leading-tight'>
                        {name}
                      </div>
                      <div className='text-xs text-gray-400'>
                        {name === "Alice Chen"
                          ? "Lead Embedded"
                          : name === "Ravi Patel"
                          ? "Data Science"
                          : name === "Maya Singh"
                          ? "Edge AI"
                          : "Platform Ops"}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section
        className='mx-auto max-w-5xl px-6 pb-40 pt-0 md:pb-52'
        ariaLabel='Get started'
      >
        <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent px-8 py-16 backdrop-blur'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(179,45,255,0.35),transparent_65%)]' />
          <div className='relative max-w-3xl'>
            <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
              Ready to surface a unified health signal across your IoT fleet?
            </h2>
            <p className='mt-4 text-base leading-relaxed text-gray-300'>
              Let’s map your current telemetry maturity & identify the shortest
              path to predictive resilience.
            </p>
            <div className='mt-8 flex flex-wrap gap-4'>
              <a
                href='/contact'
                className='inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black shadow-[0_0_0_1px_#ffffff30,0_6px_28px_-4px_#b32dff88] transition hover:brightness-110'
              >
                Book an intro call
              </a>
              <a
                href='/pricing'
                className='inline-flex items-center justify-center rounded-md border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur hover:border-[var(--accent)]/60 hover:text-white'
              >
                View pricing
              </a>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
