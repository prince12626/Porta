"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";
import { clearAuth, getToken, getUserEmail } from "@/lib/auth";
import { getTunnelUrl } from "@/lib/tunnel";
import type { Tunnel, TunnelsResponse } from "@/types/api";
import { CreateTunnelModal } from "@/components/create-tunnel-modal";
import { TunnelCard } from "@/components/tunnel-card";

export function DashboardShell() {
  const router = useRouter();
  const [tunnels, setTunnels] = useState<Tunnel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const fetchTunnels = async () => {
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
    }
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
      return;
    }

    setIsReady(true);
    setEmail(getUserEmail());
    void fetchTunnels();
  }, [router]);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  const handleTunnelCreated = (tunnel: Tunnel) => {
    setTunnels((current) => [tunnel, ...current]);
  };

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 text-zinc-600">
        Checking session...
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

      <div className="min-h-screen bg-zinc-100">
        <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold tracking-tight text-zinc-950">Porta</span>
              <span className="hidden text-sm text-zinc-500 sm:inline">Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-zinc-600 sm:inline">{email ?? "Developer"}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                Tunnels
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
                Your tunnel workspace
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              + Create tunnel
            </button>
          </div>

          {error ? (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
              Loading your tunnels...
            </div>
          ) : tunnels.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-8 text-center shadow-sm">
              <p className="text-2xl font-semibold text-zinc-950">No tunnels yet.</p>
              <p className="mt-3 text-zinc-600">
                Expose your first local application with Porta.
              </p>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="mt-6 rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
              >
                Create tunnel
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {tunnels.map((tunnel) => (
                <TunnelCard key={tunnel._id} tunnel={tunnel} />
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
