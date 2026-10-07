"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand } from "@/components/brand";
import { CreateTunnelModal } from "@/components/create-tunnel-modal";
import { TunnelCard } from "@/components/tunnel-card";
import { apiFetch } from "@/lib/api";
import { clearAuth, getToken, getUserEmail } from "@/lib/auth";
import type { Tunnel, TunnelsResponse } from "@/types/api";

export function DashboardShell() {
  const router = useRouter();
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const fetchTunnels = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await apiFetch("/api/tunnels", { method: "GET" });
      const payload = (await response.json().catch(() => ({}))) as Partial<TunnelsResponse> & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          typeof payload.message === "string"
            ? payload.message
            : "Unable to load tunnels.",
        );
      }

      setTunnels(payload.tunnels ?? []);
      setError(null);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load tunnels.";

      setError(message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
    setEmail(getUserEmail());
    void fetchTunnels();
  }, [fetchTunnels, router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const handleTunnelCreated = (tunnel: Tunnel) => {
    setTunnels((current) => [tunnel, ...current]);
  };

  const onlineCount = useMemo(
    () => tunnels.filter((tunnel) => tunnel.status === "online").length,
    [tunnels],
  );
  const portCount = useMemo(
    () => new Set(tunnels.map((tunnel) => tunnel.targetPort)).size,
    [tunnels],
  );

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-sm text-[#a5a5a5]">
        Checking your session…
      </div>
    );
  }

  return (
    <>
      <CreateTunnelModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onTunnelCreated={handleTunnelCreated}
      />

      <div className="min-h-screen bg-[#0f0f0f] text-[#f2f2f2] lg:flex">
        <aside className="hidden w-[248px] shrink-0 flex-col border-r border-[#2f2f2f] bg-[#131313] px-5 py-6 lg:flex">
          <Brand href="/dashboard" />
          <div className="mt-11">
            <p className="px-3 text-[10px] font-semibold tracking-[0.17em] text-[#7a7a7a]">
              WORKSPACE
            </p>
            <nav className="mt-3 space-y-1" aria-label="Workspace">
              <Link
                href="/dashboard"
                aria-current="page"
                className="flex items-center gap-3 border border-[#3e3e3e] bg-[#1e1e1e] px-3 py-2.5 text-sm font-medium text-[#efefef]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#e1e1e1]" />
                Tunnels
              </Link>
              <Link
                href="/#cli"
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#a5a5a5] transition hover:bg-[#1b1b1b] hover:text-[#efefef]"
              >
                <span className="font-mono text-xs text-[#838383]">&gt;_</span>
                CLI quick start
              </Link>
            </nav>
          </div>
          <div className="mt-auto border-t border-[#2f2f2f] pt-5">
            <Link
              href="/"
              className="block px-3 py-2 text-sm text-[#a5a5a5] transition hover:text-white"
            >
              Porta home
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-1 w-full px-3 py-2 text-left text-sm text-[#a5a5a5] transition hover:text-white"
            >
              Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-[#2f2f2f] bg-[#131313]">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
              <div className="flex items-center gap-4">
                <div className="lg:hidden">
                  <Brand href="/dashboard" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs text-[#828282]">Workspace</p>
                  <p className="mt-0.5 text-sm font-medium text-[#e3e3e3]">
                    Tunnels
                  </p>
                </div>
                <nav
                  className="flex items-center gap-4 text-xs text-[#999999] lg:hidden"
                  aria-label="Dashboard links"
                >
                  <Link href="/dashboard" aria-current="page" className="text-[#e3e3e3]">
                    Dashboard
                  </Link>
                  <Link href="/#cli" className="transition hover:text-white">
                    CLI
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden max-w-52 truncate text-sm text-[#a5a5a5] sm:block">
                  {email ?? "Developer"}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-[#3e3e3e] px-3 py-2 text-xs font-medium text-[#d7d7d7] transition hover:border-[#787878] hover:text-white lg:hidden"
                >
                  Sign out
                </button>
                <span
                  aria-hidden="true"
                  className="hidden h-8 w-8 items-center justify-center border border-[#3e3e3e] bg-[#202020] text-xs font-semibold uppercase text-[#e1e1e1] sm:flex"
                >
                  {email?.[0] ?? "P"}
                </span>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="flex flex-col gap-5 border-b border-[#2f2f2f] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-[#bababa]">
                  DEVELOPER WORKSPACE
                </p>
                <h1 className="mt-3 text-3xl font-medium tracking-[-0.05em] text-[#f2f2f2] sm:text-4xl">
                  Your tunnels
                </h1>
                <p className="mt-2 text-sm text-[#a5a5a5]">
                  Expose a local service and manage its public endpoint.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center justify-center gap-2 bg-[#e1e1e1] px-4 py-2.5 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb]"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  +
                </span>
                Create tunnel
              </button>
            </div>

            <section
              aria-label="Tunnel overview"
              className="grid border-b border-[#2f2f2f] sm:grid-cols-3"
            >
              {[
                { label: "Active tunnels", value: onlineCount },
                { label: "Total tunnels", value: tunnels.length },
                { label: "Ports in use", value: portCount },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`py-5 sm:py-6 ${index > 0 ? "sm:border-l sm:border-[#2f2f2f] sm:pl-6" : ""} ${index < 2 ? "border-b border-[#282828] sm:border-b-0 sm:pr-6" : ""}`}
                >
                  <p className="text-xs text-[#8f8f8f]">{stat.label}</p>
                  <p className="mt-2 font-mono text-2xl tracking-tight text-[#f2f2f2]">
                    {isLoading ? "—" : String(stat.value).padStart(2, "0")}
                  </p>
                </div>
              ))}
            </section>

            <section className="pt-7">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-medium text-[#ececec]">
                    All tunnels
                  </h2>
                  <p className="mt-1 text-xs text-[#8c8c8c]">
                    {tunnels.length} {tunnels.length === 1 ? "endpoint" : "endpoints"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void fetchTunnels(true)}
                  disabled={isRefreshing || isLoading}
                  className="border border-[#3e3e3e] px-3 py-2 text-xs font-medium text-[#c2c2c2] transition hover:border-[#787878] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRefreshing ? "Refreshing…" : "Refresh"}
                </button>
              </div>

              {error ? (
                <div
                  role="alert"
                  className="flex flex-col gap-4 border border-[#444444] bg-[#151515] px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-[#c2c2c2]">
                      Couldn’t load tunnels
                    </p>
                    <p className="mt-1 text-sm text-[#a0a0a0]">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void fetchTunnels()}
                    className="shrink-0 border border-[#4d4d4d] px-3 py-2 text-xs font-medium text-[#c2c2c2] transition hover:bg-[#1e1e1e]"
                  >
                    Try again
                  </button>
                </div>
              ) : isLoading ? (
                <div
                  role="status"
                  className="border border-[#323232] bg-[#151515] px-5 py-8 text-sm text-[#a5a5a5]"
                >
                  Loading your tunnels…
                </div>
              ) : tunnels.length === 0 ? (
                <div className="border border-dashed border-[#454545] bg-[#151515] px-5 py-10 sm:px-8 sm:py-12">
                  <p className="font-mono text-xs tracking-wide text-[#bababa]">
                    NO ENDPOINTS YET
                  </p>
                  <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-[#f2f2f2]">
                    Your next app can be public in seconds.
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-[#a5a5a5]">
                    Create a tunnel here, or install the CLI and run it from
                    your project directory.
                  </p>
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(true)}
                      className="bg-[#e1e1e1] px-4 py-2.5 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb]"
                    >
                      Create your first tunnel
                    </button>
                    <Link
                      href="/#cli"
                      className="border border-[#3e3e3e] px-4 py-2.5 text-center text-sm font-medium text-[#e3e3e3] transition hover:border-[#747474]"
                    >
                      Set up the CLI
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {tunnels.map((tunnel) => (
                    <TunnelCard key={tunnel._id} tunnel={tunnel} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
