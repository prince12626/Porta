"use client";

import { useState } from "react";

import { getTunnelUrl } from "@/lib/tunnel";
import type { Tunnel } from "@/types/api";

export function TunnelCard({ tunnel }: { tunnel: Tunnel }) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const tunnelUrl = getTunnelUrl(tunnel);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tunnelUrl);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    } catch {
      setCopyState("failed");
    }
  };

  const isOnline = tunnel.status === "online";

  return (
    <article className="border border-[#323232] bg-[#151515] transition-colors hover:border-[#464646]">
      <div className="flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[11px] font-medium ${
                isOnline
                  ? "border-[#4c4c4c] bg-[#1e1e1e] text-[#e1e1e1]"
                  : "border-[#474747] bg-[#1e1e1e] text-[#aeaeae]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline ? "bg-[#d7d7d7]" : "bg-[#8f8f8f]"
                }`}
              />
              {isOnline ? "Online" : "Offline"}
            </span>
            <span className="font-mono text-[11px] text-[#828282]">
              PORT {tunnel.targetPort}
            </span>
          </div>

          <p className="mt-4 text-[10px] font-semibold tracking-[0.15em] text-[#7e7e7e]">
            PUBLIC URL
          </p>
          <a
            href={tunnelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all font-mono text-sm leading-6 text-[#e1e1e1] underline decoration-[#4b4b4b] underline-offset-4 transition hover:text-[#ececec] sm:text-base"
          >
            {tunnelUrl}
          </a>
          <p className="mt-2 text-xs text-[#8c8c8c]">
            Forwarding to{" "}
            <span className="font-mono text-[#c2c2c2]">
              localhost:{tunnel.targetPort}
            </span>
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center justify-center gap-2 border border-[#4d4d4d] px-3.5 py-2.5 text-xs font-medium text-[#e3e3e3] transition hover:border-[#bababa] hover:bg-[#1e1e1e] hover:text-white"
          aria-live="polite"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5"
            fill="none"
          >
            <rect
              x="5"
              y="5"
              width="8"
              height="9"
              rx="1.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
            <path
              d="M10.5 5V3.8A1.8 1.8 0 0 0 8.7 2H4a2 2 0 0 0-2 2v5.2A1.8 1.8 0 0 0 3.8 11H5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy URL"}
        </button>
      </div>

      <div className="grid border-t border-[#2f2f2f] bg-[#131313] sm:grid-cols-3">
        <div className="border-b border-[#2f2f2f] px-4 py-3.5 sm:border-b-0 sm:px-5">
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#7c7c7c]">
            TUNNEL ID
          </p>
          <p className="mt-1.5 truncate font-mono text-xs text-[#c6c6c6]" title={tunnel.tunnelId}>
            {tunnel.tunnelId}
          </p>
        </div>
        <div className="border-b border-[#2f2f2f] px-4 py-3.5 sm:border-b-0 sm:border-l sm:px-5">
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#7c7c7c]">
            SUBDOMAIN
          </p>
          <p className="mt-1.5 truncate font-mono text-xs text-[#c6c6c6]">
            {tunnel.subdomain}
          </p>
        </div>
        <div className="px-4 py-3.5 sm:border-l sm:border-[#2f2f2f] sm:px-5">
          <p className="text-[10px] font-semibold tracking-[0.13em] text-[#7c7c7c]">
            STATUS
          </p>
          <p className="mt-1.5 text-xs text-[#c6c6c6]">
            {isOnline ? "Accepting connections" : "Not connected"}
          </p>
        </div>
      </div>
    </article>
  );
}
