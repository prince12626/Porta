import { WebSocket } from "ws";

const tunnels = new Map<string, WebSocket>();

export function registerTunnel(tunnelId: string, socket: WebSocket) {
  tunnels.set(tunnelId, socket);

  console.log(`Tunnel registered: ${tunnelId}`);
}

export function getTunnel(tunnelId: string) {
  return tunnels.get(tunnelId);
}

export function removeTunnel(tunnelId: string) {
  tunnels.delete(tunnelId);

  console.log(`Tunnel removed: ${tunnelId}`);
}
