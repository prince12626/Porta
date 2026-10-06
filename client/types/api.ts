export type TunnelStatus = "online" | "offline";

export interface Tunnel {
  _id: string;
  userId: string;
  tunnelId: string;
  subdomain: string;
  targetPort: number;
  status: TunnelStatus;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  user?: {
    id?: string;
    email?: string;
  };
}

export interface TunnelResponse {
  tunnel: Tunnel;
}

export interface TunnelsResponse {
  tunnels: Tunnel[];
}
