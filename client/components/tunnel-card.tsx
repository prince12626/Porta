"use client";

import { useState } from "react";

import { getTunnelUrl } from "@/lib/tunnel";
import type { Tunnel } from "@/types/api";

export function TunnelCard({ tunnel }: { tunnel: Tunnel }) {
  const [copied, setCopied] = useState(false);
  const tunnelUrl = getTunnelUrl(tunnel);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tunnelUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-2.5 w-2.5 rounded-full ${
              tunnel.status === "online" ? "bg-emerald-500" : "bg-zinc-400"
            }`}
            aria-label={
              tunnel.status === "online" ? "Tunnel is online" : "Tunnel is offline"
            }
          />
          <span className="text-sm font-medium text-zinc-700">
            {tunnel.status === "online" ? "Online" : "Offline"}
          </span>
        </div>

        <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600">
          {tunnel.targetPort}
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">URL</p>
          <p className="mt-1 break-all font-mono text-sm text-zinc-800">
            {tunnelUrl}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-zinc-600 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Status
            </p>
            <p className="mt-1 font-medium text-zinc-800">
              {tunnel.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Tunnel ID
            </p>
            <p className="mt-1 break-all font-mono text-zinc-800">
              {tunnel.tunnelId}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Target port
            </p>
            <p className="mt-1 text-zinc-800">{tunnel.targetPort}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Subdomain
            </p>
            <p className="mt-1 text-zinc-800">{tunnel.subdomain}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="mt-5 inline-flex rounded-full border border-zinc-300 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        {copied ? "Copied" : "Copy URL"}
      </button>
    </article>
  );
}
