import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to Porta and manage your tunnels.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://porta.dev/login",
  },
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-zinc-600">Loading...</div>}>
      <AuthPage mode="login" />
    </Suspense>
  );
}
