"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { apiFetch } from "@/lib/api";
import { setToken, setUserEmail } from "@/lib/auth";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmailValue] = useState("");
  const [password, setPasswordValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";
  const registered = searchParams.get("registered") === "1";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string;
        token?: string;
      };

      if (!response.ok) {
        throw new Error(
          typeof payload.message === "string"
            ? payload.message
            : "Request failed.",
        );
      }

      if (!isLogin) {
        router.push("/login?registered=1");
        return;
      }

      const token = payload.token;

      if (!token) {
        throw new Error("The server did not return a JWT token.");
      }

      setToken(token);
      setUserEmail(email.trim());
      router.push("/dashboard");
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unable to complete this request.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_18px_48px_rgba(24,24,27,0.08)] sm:p-8">
        <div className="mb-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-950">
            Porta
          </Link>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
            {isLogin ? "Welcome back" : "Create account"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            {isLogin ? "Log in to Porta" : "Register your account"}
          </h1>
        </div>

        {registered ? (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Registration successful. Please sign in to continue.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmailValue(event.target.value)}
              placeholder="hello@example.com"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 outline-none transition focus:border-zinc-950"
              autoComplete="email"
              required
            />
          </label>

          <label className="block text-sm font-medium text-zinc-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPasswordValue(event.target.value)}
              placeholder="Your password"
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 outline-none transition focus:border-zinc-950"
              autoComplete={isLogin ? "current-password" : "new-password"}
              required
            />
          </label>

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
          >
            {isSubmitting ? (isLogin ? "Logging in..." : "Creating account...") : isLogin ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-medium text-zinc-950 underline-offset-4 hover:underline"
          >
            {isLogin ? "Create one" : "Log in"}
          </Link>
        </p>
      </div>
    </main>
  );
}
