"use client";

import Link from "next/link";
import { useState } from "react";

import { Brand } from "@/components/brand";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Porta",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Porta lets developers expose local applications to the internet through secure HTTP tunnels.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const commands = [
  { command: "porta login", detail: "Authenticate once" },
  { command: "porta http 3000", detail: "Expose your local app" },
  { command: "porta -V", detail: "Check your CLI version" },
];

export function LandingPage() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyInstallCommand = async () => {
    try {
      await navigator.clipboard.writeText(
        "npm install -g @princechaurasiya/porta",
      );
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen overflow-hidden bg-[#0f0f0f] text-[#f2f2f2]">
        <header className="border-b border-[#2f2f2f]">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
            <Brand />
            <div className="hidden items-center gap-8 text-sm text-[#afafaf] md:flex">
              <a className="transition hover:text-white" href="#how-it-works">
                How it works
              </a>
              <a className="transition hover:text-white" href="#cli">
                CLI
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-2 py-2 text-sm font-medium text-[#cbcbcb] transition hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-[#e1e1e1] px-4 py-2.5 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb]"
              >
                Get started
              </Link>
            </div>
          </nav>
        </header>

        <section className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 sm:px-8 sm:pb-28 sm:pt-28 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-32">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 border border-[#404040] bg-[#181818] px-3 py-1.5 text-xs font-medium tracking-wide text-[#cccccc]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d7d7d7]" />
              LOCALHOST, MEET THE INTERNET
            </div>
            <h1 className="max-w-3xl text-[clamp(3rem,7vw,5.5rem)] font-medium leading-[0.99] tracking-[-0.075em] text-[#f4f4f4]">
              Your local app,
              <br />
              <span className="text-[#e1e1e1]">out in the world.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#aeaeae] sm:text-lg sm:leading-8">
              Porta gives your local development server a public URL through a
              secure tunnel—so you can test webhooks, share previews, and build
              without deploying first.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#e1e1e1] px-5 py-3 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb]"
              >
                Create your account
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-[#3e3e3e] px-5 py-3 text-sm font-medium text-[#e7e7e7] transition hover:border-[#747474] hover:bg-[#181818]"
              >
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#8c8c8c]">
              <span>Install with npm</span>
              <code className="border border-[#343434] bg-[#161616] px-2.5 py-1.5 font-mono text-[#cacaca]">
                @princechaurasiya/porta
              </code>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 -z-10 bg-[#1d1d1d] blur-3xl" />
            <div className="overflow-hidden border border-[#3e3e3e] bg-[#131313] shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between border-b border-[#2f2f2f] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2 w-2 rounded-full bg-[#7c7c7c]" />
                    <span className="h-2 w-2 rounded-full bg-[#7c7c7c]" />
                    <span className="h-2 w-2 rounded-full bg-[#7c7c7c]" />
                  </span>
                  <span className="text-xs text-[#8c8c8c]">Terminal</span>
                </div>
                <span className="font-mono text-[11px] text-[#7c7c7c]">
                  zsh
                </span>
              </div>
              <div className="space-y-6 px-5 py-6 font-mono text-[13px] leading-6 sm:px-7 sm:py-8 sm:text-sm">
                <div>
                  <p className="text-[#e4e4e4]">
                    <span className="mr-2 text-[#9c9c9c]">$</span>porta login
                  </p>
                  <p className="mt-1 text-[#afafaf]">
                    <span className="mr-2 text-[#e1e1e1]">✓</span>Logged in
                    successfully
                  </p>
                </div>
                <div>
                  <p className="text-[#e4e4e4]">
                    <span className="mr-2 text-[#9c9c9c]">$</span>porta http
                    3000
                  </p>
                  <p className="mt-1 text-[#afafaf]">
                    <span className="mr-2 text-[#e1e1e1]">✓</span>Connected to
                    Porta
                  </p>
                  <p className="text-[#afafaf]">
                    <span className="mr-2 text-[#e1e1e1]">✓</span>Tunnel
                    established
                  </p>
                  <p className="mt-2 break-all text-[#e1e1e1]">
                    <span className="mr-2 text-[#9c9c9c]">→</span>
                    https://p7k2.porta.dev
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[#2f2f2f] pt-4 text-[11px] text-[#7c7c7c] sm:text-xs">
                  <span>public URL</span>
                  <span className="text-[#b2b2b2]">for localhost:3000</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-[#7c7c7c]">
              From local process to shareable endpoint in seconds.
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-8 border-y border-[#2f2f2f] bg-[#131313]"
        >
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-[#cccccc]">
                  HOW PORTA WORKS
                </p>
                <h2 className="mt-4 max-w-lg text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">
                  A direct route to your local app.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-[#a5a5a5]">
                  The CLI connects your app to Porta. Requests to your public
                  URL travel through that connection and arrive at your local
                  port.
                </p>
              </div>
              <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] sm:items-center">
                {[
                  { title: "Your app", detail: "localhost:3000", mark: "01" },
                  { title: "Porta CLI", detail: "your machine", mark: "02" },
                  { title: "Porta server", detail: "secure relay", mark: "03" },
                  { title: "Internet", detail: "public HTTPS", mark: "04" },
                ].map((step, index) => (
                  <div key={step.mark} className="contents">
                    <div className="flex min-h-[98px] items-center gap-3 border border-[#363636] bg-[#181818] px-4 py-4 sm:block sm:px-4">
                      <span className="font-mono text-[10px] text-[#bababa]">
                        {step.mark}
                      </span>
                      <div className="sm:mt-3">
                        <p className="text-sm font-medium text-[#ececec]">
                          {step.title}
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-[#8c8c8c]">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                    {index < 3 ? (
                      <span
                        aria-hidden="true"
                        className="hidden px-1 text-[#7c7c7c] sm:block"
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2 border-t border-[#2f2f2f] pt-5 text-xs text-[#8d8d8d]">
              <span>Local process stays on your machine</span>
              <span>Incoming traffic reaches your chosen port</span>
              <span>Share the HTTPS URL, not your setup</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#cccccc]">
                MADE FOR THE BUILD LOOP
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">
                Useful before you ship.
              </h2>
            </div>
            <div className="grid divide-y divide-[#2f2f2f] border-y border-[#2f2f2f] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                {
                  title: "Test callbacks",
                  body: "Give webhook providers a reachable endpoint while your app runs locally.",
                },
                {
                  title: "Share a preview",
                  body: "Let a teammate or client try the work before it has a production home.",
                },
                {
                  title: "Keep your flow",
                  body: "Start and inspect tunnels from the CLI, then manage them in one place.",
                },
              ].map((feature, index) => (
                <article
                  key={feature.title}
                  className="py-5 sm:px-5 sm:py-4 first:sm:pl-0 last:sm:pr-0"
                >
                  <span className="font-mono text-xs text-[#bababa]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-5 text-base font-medium text-[#ececec]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#a5a5a5]">
                    {feature.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cli" className="scroll-mt-8 border-y border-[#2f2f2f] bg-[#131313]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#cccccc]">
                GET STARTED
              </p>
              <h2 className="mt-4 text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-4xl">
                Three commands to your first tunnel.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#a5a5a5]">
                Install the Porta CLI, sign in to your account, and point it at
                the port your app is already using.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-md bg-[#e1e1e1] px-4 py-2.5 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb]"
                >
                  Create an account
                </Link>
                <Link
                  href="/login"
                  className="rounded-md border border-[#3e3e3e] px-4 py-2.5 text-sm font-medium text-[#e7e7e7] transition hover:border-[#747474]"
                >
                  Already registered?
                </Link>
              </div>
            </div>

            <div className="border border-[#3e3e3e] bg-[#0f0f0f]">
              <div className="flex items-center justify-between border-b border-[#2f2f2f] px-4 py-3 sm:px-5">
                <span className="text-xs font-medium text-[#cdcdcd]">
                  Quick start
                </span>
                <button
                  type="button"
                  onClick={copyInstallCommand}
                  className="rounded border border-[#404040] px-2.5 py-1.5 text-xs text-[#cdcdcd] transition hover:border-[#bababa] hover:text-white"
                  aria-live="polite"
                >
                  {copied ? "Copied" : copyFailed ? "Copy failed" : "Copy install"}
                </button>
              </div>
              <div className="divide-y divide-[#282828]">
                <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <code className="break-all font-mono text-[13px] text-[#e1e1e1]">
                    npm install -g @princechaurasiya/porta
                  </code>
                  <span className="text-xs text-[#7c7c7c]">Install</span>
                </div>
                {commands.map((item, index) => (
                  <div
                    key={item.command}
                    className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="font-mono text-[10px] text-[#7c7c7c]">
                        0{index + 1}
                      </span>
                      <code className="truncate font-mono text-[13px] text-[#e7e7e7]">
                        {item.command}
                      </code>
                    </div>
                    <span className="hidden shrink-0 text-xs text-[#7c7c7c] sm:block">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-xs text-[#8c8c8c] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-3">
            <Brand />
            <span className="text-[#4d4d4d]">/</span>
            <span>Local to public, without the detour.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link className="transition hover:text-white" href="/login">
              Log in
            </Link>
            <Link className="transition hover:text-white" href="/register">
              Create account
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}
