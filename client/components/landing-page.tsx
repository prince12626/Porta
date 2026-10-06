import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Porta",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Porta is a developer tunneling platform that exposes localhost and local development servers to the internet with secure HTTP tunnels.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const features = [
  "Expose localhost securely with a developer-friendly HTTP tunnel.",
  "Test webhooks and local integrations without deploying to production.",
  "Keep every port forwarding workflow in one clean dashboard.",
];

const useCases = [
  "Local development and preview environments",
  "Webhook testing and API callbacks",
  "Sharing a local app with a teammate or client",
  "Traffic inspection for service debugging",
];

export function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white text-zinc-950">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-950">
            Porta
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950">
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-zinc-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800">
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              Developer tunneling platform
            </p>
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.06em] text-zinc-950 sm:text-6xl">
              Expose your local ports to the internet.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
              Secure HTTP tunnels for developers. Expose localhost, test webhooks,
              share local development servers, and inspect traffic from one simple CLI.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
                Get started
              </Link>
              <a href="#docs" className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950">
                View documentation
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-950 p-5 shadow-[0_20px_60px_rgba(24,24,27,0.2)]">
            <div className="mb-4 flex items-center gap-2 text-zinc-400">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7 text-zinc-100">
{`$ npm install -g porta

$ porta login

$ porta http 3000

✓ Connected to Porta
✓ Tunnel established

https://xxxx.porta.dev
→ localhost:3000`}
            </pre>
          </div>
        </div>
      </section>

      <section id="docs" className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              Simple port forwarding for local development.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Create a tunnel from your local app or API service.",
              "Porta creates a secure HTTP tunnel to your localhost port.",
              "Share the public URL for testing, previews, and integrations.",
            ].map((step, index) => (
              <div key={step} className="rounded-2xl border border-zinc-200 bg-white p-5">
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-sm font-medium text-white">
                  {index + 1}
                </div>
                <p className="text-base leading-7 text-zinc-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            Built for modern developer workflows.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature} className="rounded-2xl border border-zinc-200 bg-white p-5 text-base leading-7 text-zinc-700">
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
              CLI example
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              One command to expose a local port.
            </h2>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-950 p-6 text-zinc-100 shadow-sm">
            <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-7">
{`$ porta http 3000

✓ Connected to Porta
✓ Tunnel established

https://xxxx.porta.dev
→ localhost:3000`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Developer use cases
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            A simpler way to expose local development and test services.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {useCases.map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-200 bg-white p-5 text-base leading-7 text-zinc-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">
                Ready to get started?
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Expose your local port in minutes.
              </h2>
            </div>
            <Link href="/register" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200">
              Get started
            </Link>
          </div>
        </div>
      </section>

        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-zinc-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2026 Porta</p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:text-zinc-950">Login</Link>
              <Link href="/register" className="hover:text-zinc-950">Register</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
