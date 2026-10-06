import express from "express";
import cors from "cors";
import crypto from "crypto";
import authRoutes from "./routes/auth.route.js";
import tunnelRoutes from "./routes/tunnel.route.js";
import { getTunnel } from "./tunnel/tunnel-manager.js";
import { addPendingRequest } from "./tunnel/pending-requests.js";
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "mytunnel-server",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tunnels", tunnelRoutes);

async function forwardTunnelRequest(
  req: express.Request,
  res: express.Response,
) {
  const tunnelId = req.params.tunnelId as string;

  const socket = getTunnel(tunnelId);

  if (!socket) {
    return res.status(404).json({
      message: "Tunnel is offline",
    });
  }

  const requestId = crypto.randomUUID();

  addPendingRequest(requestId, res);

  const path = req.originalUrl.replace(`/t/${tunnelId}`, "") || "/";

  socket.send(
    JSON.stringify({
      type: "http_request",
      requestId,
      method: req.method,
      path,
      headers: req.headers,
    }),
  );
}

app.all("/t/:tunnelId", forwardTunnelRequest);

app.all("/t/:tunnelId/*path", forwardTunnelRequest);

export default app;
