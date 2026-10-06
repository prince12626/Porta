import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const elmsSans = IBM_Plex_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://porta.dev"),
  title: {
    default: "Porta — Expose Local Ports to the Internet",
    template: "%s | Porta",
  },
  description:
    "Porta is a developer tunneling platform that lets you expose localhost ports and local applications to the internet with secure HTTP tunnels.",
  keywords: [
    "Porta",
    "port forwarding",
    "local port",
    "localhost tunnel",
    "HTTP tunnel",
    "developer tunnel",
    "local development",
    "localhost",
    "expose localhost",
    "port tunnel",
    "ngrok alternative",
    "local server",
    "webhook testing",
    "developer tools",
  ],
  applicationName: "Porta",
  authors: [
    {
      name: "Porta",
      url: "https://porta.dev",
    },
  ],
  creator: "Porta",
  publisher: "Porta",
  category: "developer tools",
  alternates: {
    canonical: "https://porta.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://porta.dev",
    siteName: "Porta",
    title: "Porta — Expose Local Ports to the Internet",
    description:
      "Expose localhost ports and local applications to the internet with secure HTTP tunnels. Built for developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Porta — Expose Local Ports to the Internet",
    description:
      "Secure HTTP tunnels for exposing your localhost and local development servers to the internet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${elmsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-zinc-950">{children}</body>
    </html>
  );
}