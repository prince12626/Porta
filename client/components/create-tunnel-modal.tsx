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

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isSubmitting, onClose, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  const closeWhenBackdropClicked = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      onMouseDown={closeWhenBackdropClicked}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-tunnel-title"
        className="my-auto w-full max-w-lg border border-[#454545] bg-[#161616] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-start justify-between border-b border-[#323232] px-5 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] text-[#bababa]">
              NEW ENDPOINT
            </p>
            <h2
              id="create-tunnel-title"
              className="mt-2 text-xl font-medium tracking-[-0.035em] text-[#f2f2f2]"
            >
              Create a tunnel
            </h2>
            <p className="mt-1 text-sm text-[#a5a5a5]">
              Connect a public URL to an app running on your machine.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#3e3e3e] text-[#b3b3b3] transition hover:border-[#7c7c7c] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="none"
            >
              <path
                d="m4 4 8 8m0-8-8 8"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
          <label
            htmlFor="target-port"
            className="block text-sm font-medium text-[#e3e3e3]"
          >
            Local port
            <div className="mt-2.5 flex border border-[#3e3e3e] bg-[#0f0f0f] focus-within:border-[#bababa]">
              <span className="flex items-center border-r border-[#323232] px-3 font-mono text-xs text-[#828282]">
                localhost:
              </span>
              <input
                id="target-port"
                type="number"
                min={1}
                max={65535}
                step={1}
                value={targetPort}
                onChange={(event) => setTargetPort(event.target.value)}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "create-tunnel-error" : "target-port-help"}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 font-mono text-sm text-[#f2f2f2] outline-none placeholder:text-[#6d6d6d]"
                placeholder="3000"
                autoFocus
                required
              />
            </div>
          </label>
          <p id="target-port-help" className="-mt-3 text-xs text-[#8c8c8c]">
            Enter a port between 1 and 65535.
          </p>

          {error ? (
            <p
              id="create-tunnel-error"
              role="alert"
              className="border border-[#444444] bg-[#191919] px-3.5 py-3 text-sm leading-5 text-[#c2c2c2]"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-2 border-t border-[#323232] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="border border-[#454545] px-4 py-2.5 text-sm font-medium text-[#cbcbcb] transition hover:border-[#7c7c7c] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#e1e1e1] px-4 py-2.5 text-sm font-semibold text-[#1d1d1d] transition hover:bg-[#ebebeb] disabled:cursor-not-allowed disabled:bg-[#626262] disabled:text-[#dcdcdc]"
            >
              {isSubmitting ? "Creating tunnel…" : "Create tunnel"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
