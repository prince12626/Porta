import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your Porta tunnels and expose local apps to the internet.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://porta.dev/dashboard",
  },
};

export default function DashboardPage() {
  return <DashboardShell />;
}
