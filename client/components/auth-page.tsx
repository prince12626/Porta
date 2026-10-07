"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Brand } from "@/components/brand";
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
    <main className="min-h-screen bg-[#0f0f0f] text-[#f2f2f2]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Brand />
        <Link
          href="/"
          className="text-sm text-[#aeaeae] transition hover:text-white"
        >
          Back to Porta
        </Link>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-8 sm:px-8 sm:pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24 lg:pb-24">
        <section className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.18em] text-[#cccccc]">
            DEVELOPER ACCESS
          </p>
          <h1 className="mt-5 max-w-lg text-4xl font-medium leading-[1.05] tracking-[-0.06em] sm:text-5xl">
            {isLogin
              ? "Pick up right where you left off."
              : "Make your local app reachable."}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#a5a5a5]">
            {isLogin
              ? "Sign in to manage your tunnels and keep your development workflow moving."
              : "Create a Porta account, install the CLI, and share a live route to your local app."}
          </p>

          <div className="mt-10 max-w-md border border-[#373737] bg-[#151515]">
            <div className="border-b border-[#2f2f2f] px-4 py-3 text-xs font-medium text-[#cfcfcf]">
              The short version
            </div>
            <div className="space-y-4 px-4 py-4 font-mono text-[13px]">
              <p className="text-[#e4e4e4]">
                <span className="mr-2 text-[#8c8c8c]">$</span>porta login
              </p>
              <p className="text-[#e4e4e4]">
                <span className="mr-2 text-[#8c8c8c]">$</span>porta http 3000
              </p>
              <p className="break-all text-[#e1e1e1]">
                <span className="mr-2 text-[#bababa]">→</span>
                https://your-app.porta.dev
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-5 text-[#7c7c7c]">
            Your app stays local. Porta gives it a public HTTPS endpoint.
          </p>
        </section>

        <section className="w-full max-w-md justify-self-end border border-[#3e3e3e] bg-[#151515] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-semibold tracking-[0.16em] text-[#979797]">
              {isLogin ? "WELCOME BACK" : "GET STARTED"}
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#f2f2f2]">
              {isLogin ? "Log in to Porta" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-[#a5a5a5]">
              {isLogin
                ? "Use your account email and password."
                : "A few details, then your first tunnel."}
            </p>
          </div>

          {registered ? (
            <div
              role="status"
              className="mb-5 border border-[#4c4c4c] bg-[#1e1e1e] px-3.5 py-3 text-sm leading-5 text-[#e1e1e1]"
            >
              Account created. Sign in to continue.
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-[#e3e3e3]">
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmailValue(event.target.value)}
                placeholder="you@example.com"
                className="mt-2.5 w-full border border-[#3e3e3e] bg-[#0f0f0f] px-3.5 py-3 text-sm text-[#f2f2f2] placeholder:text-[#6d6d6d] transition focus:border-[#bababa] focus:outline-none"
                autoComplete="email"
                required
              />
            </label>

            <label className="block text-sm font-medium text-[#e3e3e3]">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPasswordValue(event.target.value)}
                placeholder="Enter your password"
                className="mt-2.5 w-full border border-[#3e3e3e] bg-[#0f0f0f] px-3.5 py-3 text-sm text-[#f2f2f2] placeholder:text-[#6d6d6d] transition focus:border-[#bababa] focus:outline-none"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
              />
            </label>

            {error ? (
              <div
                role="alert"
                className="border border-[#444444] bg-[#191919] px-3.5 py-3 text-sm leading-5 text-[#c2c2c2]"
              >
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 bg-[#e1e1e1] px-4 py-3 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb] disabled:cursor-not-allowed disabled:bg-[#626262] disabled:text-[#dcdcdc]"
            >
              {isSubmitting
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}
              {!isSubmitting ? <span aria-hidden="true">→</span> : null}
            </button>
          </form>

          <p className="mt-6 border-t border-[#323232] pt-5 text-sm text-[#a5a5a5]">
            {isLogin ? "New to Porta?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? "/register" : "/login"}
              className="font-medium text-[#e7e7e7] underline-offset-4 hover:underline"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
