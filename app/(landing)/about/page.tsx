import Image from "next/image";

export const metadata = {
  title: "About — GeekStechServices",
  description: "About GeekStechServices — who we are and what we build",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen text-white bg-[var(--bg-dark)]">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-black/30 to-transparent">
        <div className="absolute inset-0 opacity-10">
          <Image src="/globe.svg" alt="globe" fill className="object-cover" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">We build reliable connected systems</h1>
            <p className="text-lg text-gray-300 mb-6">
              We design and build secure IoT systems with AI-driven monitoring and expert engineering.
              Our mission is to help companies deploy reliable connected devices and extract real value from their data.
            </p>
            <div className="flex gap-3">
              <a href="/contact" className="px-4 py-3 bg-[var(--accent)] text-black rounded-md font-medium">Get in touch</a>
              <a href="/features" className="px-4 py-3 border border-white/10 rounded-md text-sm">Our features</a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Values & What we build */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Security-first engineering</li>
              <li>Reliability and observability</li>
              <li>Practical AI that reduces operational load</li>
            </ul>
          </div>

          <div className="glass p-6 rounded-lg md:col-span-2">
            <h3 className="text-xl font-semibold mb-2">What we build</h3>
            <p className="text-gray-300 mb-4">
              We help organizations with hardware integration, embedded firmware, cloud ingestion, and
              machine learning operations to build robust, maintainable IoT solutions. We take projects
              from prototype to production — including monitoring, alerting, and automated remediation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white/3 rounded-md">
                <h4 className="font-medium">Embedded</h4>
                <p className="text-sm text-gray-300 mt-2">Firmware, low-power design, connectivity stacks.</p>
              </div>
              <div className="p-4 bg-white/3 rounded-md">
                <h4 className="font-medium">Cloud</h4>
                <p className="text-sm text-gray-300 mt-2">Ingestion, processing, and secure storage.</p>
              </div>
              <div className="p-4 bg-white/3 rounded-md">
                <h4 className="font-medium">AI & Ops</h4>
                <p className="text-sm text-gray-300 mt-2">Anomaly detection, predictive maintenance, automated ops.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Work */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Our Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-lg overflow-hidden">
              <div className="relative h-44 w-full">
                <Image src="/next.svg" alt="case1" fill className="object-cover p-6" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Connected Sensors</h4>
                <p className="text-sm text-gray-300 mt-2">Low-power sensors with secure OTA and real-time telemetry.</p>
              </div>
            </div>

            <div className="glass rounded-lg overflow-hidden">
              <div className="relative h-44 w-full">
                <Image src="/vercel.svg" alt="case2" fill className="object-cover p-6" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Industrial Monitoring</h4>
                <p className="text-sm text-gray-300 mt-2">Anomaly detection pipelines and dashboarding for operations teams.</p>
              </div>
            </div>

            <div className="glass rounded-lg overflow-hidden">
              <div className="relative h-44 w-full">
                <Image src="/window.svg" alt="case3" fill className="object-cover p-6" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">Edge Intelligence</h4>
                <p className="text-sm text-gray-300 mt-2">On-device inference and edge orchestration for low-latency actions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Process */}
        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-4">Team</h3>
            <p className="text-gray-300 mb-4">Engineers, data scientists, and product operators focused on embedded systems and ML.</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/3 rounded-md flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image src="/file.svg" alt="Alice" fill className="object-cover p-2" />
                </div>
                <div>
                  <div className="font-medium">Alice Chen</div>
                  <div className="text-sm text-gray-300">Lead Embedded Engineer</div>
                </div>
              </div>

              <div className="p-4 bg-white/3 rounded-md flex items-center gap-3">
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image src="/file.svg" alt="Ravi" fill className="object-cover p-2" />
                </div>
                <div>
                  <div className="font-medium">Ravi Patel</div>
                  <div className="text-sm text-gray-300">Data Scientist</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Our Process</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-3">
              <li>
                Discovery & requirements — map constraints and success metrics.
              </li>
              <li>
                Prototype & validation — build hardware proofs and early analytics.
              </li>
              <li>
                Production & operations — monitoring, secure updates, and scaling.
              </li>
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
