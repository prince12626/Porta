import http from "http";
import jwt from "jsonwebtoken";
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";

import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import { Tunnel } from "./models/tunnel.model.js";
import { registerTunnel, removeTunnel } from "./tunnel/tunnel-manager.js";
import { resolvePendingRequest } from "./tunnel/pending-requests.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

await connectDB();

const server = http.createServer(app);

const wss = new WebSocketServer({
  server,
  path: "/tunnel",
});

wss.on("connection", (socket) => {
  console.log("Tunnel client connected");

  let registeredTunnelId: string | null = null;

  socket.send(
    JSON.stringify({
      type: "connected",
    }),
  );

  socket.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());

      console.log("Message:", message);

      // Register tunnel
      if (message.type === "register") {
        const { tunnelId, token } = message;

        if (!tunnelId || !token) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "tunnelId and token are required",
            }),
          );
          return;
        }

        // Verify JWT
        let decoded: jwt.JwtPayload;

        try {
          decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        } catch {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Invalid or expired token",
            }),
          );

          socket.close();
          return;
        }

        const userId = decoded.userId;

        if (!userId) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Invalid token payload",
            }),
          );

          socket.close();
          return;
        }

        // Find tunnel and make sure it belongs to the user
        const tunnel = await Tunnel.findOne({
          tunnelId,
          userId,
        });

        if (!tunnel) {
          socket.send(
            JSON.stringify({
              type: "error",
              message: "Tunnel not found",
            }),
          );

          socket.close();
          return;
        }

        // Register WebSocket
        registerTunnel(tunnelId, socket);

        registeredTunnelId = tunnelId;

        // Mark tunnel online
        tunnel.status = "online";
        await tunnel.save();

        socket.send(
          JSON.stringify({
            type: "registered",
            tunnelId,
            subdomain: tunnel.subdomain,
          }),
        );

        console.log(`Tunnel ${tunnelId} is now online for user ${userId}`);

        return;
      }

      // Response coming from CLI/local server
      if (message.type === "http_response") {
        resolvePendingRequest(
          message.requestId,
          message.status,
          message.headers ?? {},
          message.body ?? "",
        );

        return;
      }
    } catch (error) {
      console.error("WebSocket message error:", error);

      socket.send(
        JSON.stringify({
          type: "error",
          message: "Invalid WebSocket message",
        }),
      );
    }
  });

  socket.on("close", async () => {
    console.log("Tunnel client disconnected");

    if (!registeredTunnelId) {
      return;
    }

    removeTunnel(registeredTunnelId);

    try {
      await Tunnel.findOneAndUpdate(
        {
          tunnelId: registeredTunnelId,
        },
        {
          status: "offline",
        },
      );

      console.log(`Tunnel ${registeredTunnelId} is now offline`);
    } catch (error) {
      console.error("Failed to update tunnel status:", error);
    }
  });

  socket.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });
});

server.listen(PORT, () => {
  console.log(`MyTunnel server running on port ${PORT}`);
  console.log(`WebSocket: ws://localhost:${PORT}/tunnel`);
});
