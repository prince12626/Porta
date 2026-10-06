import { API_BASE_URL } from "@/lib/config";
import type { Tunnel } from "@/types/api";

export function getTunnelUrl(tunnel: Pick<Tunnel, "tunnelId">): string {
  return `${API_BASE_URL}/t/${tunnel.tunnelId}`;
}
