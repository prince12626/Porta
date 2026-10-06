"use client";

import { useEffect, useState } from "react";

import { apiFetch } from "@/lib/api";
import type { Tunnel, TunnelResponse } from "@/types/api";

export function CreateTunnelModal({
  open,
  onClose,
  onTunnelCreated,
}: {
  open: boolean;
  onClose: () => void;
  onTunnelCreated: (tunnel: Tunnel) => void;
}) {
  const [targetPort, setTargetPort] = useState("3000");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setError(null);
    setTargetPort("3000");
  }, [open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    const trimmed = targetPort.trim();

    if (!trimmed) {
      setError("Target port is required.");
      return;
    }

    const port = Number(trimmed);

    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      setError("Target port must be an integer between 1 and 65535.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await apiFetch("/api/tunnels", {
        method: "POST",
        body: JSON.stringify({ targetPort: port }),
      });

      const payload = (await response.json().catch(() => ({}))) as Partial<TunnelResponse> & {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(
          typeof payload.message === "string"
            ? payload.message
            : "Failed to create tunnel.",
        );
      }

      if (!payload.tunnel) {
        throw new Error("The server did not return a tunnel.");
      }

      onTunnelCreated(payload.tunnel);
      onClose();
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unable to create tunnel right now.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-zinc-950">Create tunnel</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-300 px-2.5 py-1 text-sm text-zinc-600 transition hover:border-zinc-900 hover:text-zinc-950"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-zinc-700">
            Target port
            <input
              type="number"
              min={1}
              max={65535}
              step={1}
              value={targetPort}
              onChange={(event) => setTargetPort(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-base text-zinc-950 outline-none transition focus:border-zinc-950"
              placeholder="3000"
            />
          </label>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-950"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {isSubmitting ? "Creating..." : "Create tunnel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
