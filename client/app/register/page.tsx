import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a Porta account to expose your local ports.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://porta.dev/register",
  },
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-zinc-600">Loading...</div>}>
      <AuthPage mode="register" />
    </Suspense>
  );
}
