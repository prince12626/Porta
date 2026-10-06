import type { Metadata } from "next";

import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Porta — Expose Local Ports to the Internet",
  description:
    "Porta lets developers expose localhost, local development servers, and local apps to the internet with secure HTTP tunnels.",
  alternates: {
    canonical: "https://porta.dev",
  },
  openGraph: {
    title: "Porta — Expose Local Ports to the Internet",
    description:
      "Secure HTTP tunnels for exposing localhost and local development servers to the internet.",
    url: "https://porta.dev",
    siteName: "Porta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porta — Expose Local Ports to the Internet",
    description:
      "HTTP tunnel, port forwarding, and localhost tunnel tools built for developers.",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
