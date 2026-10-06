import WebSocket from "ws";
import { getConfig, API_URL, WS_URL } from "../config.js";

export async function httpTunnel(port: number) {
  const config = getConfig();

  if (!config.token) {
    console.error("You are not logged in. Run: mytunnel login");
    return;
  }

  // 1. Create tunnel through REST API
  const tunnelResponse = await fetch(`${API_URL}/api/tunnels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    body: JSON.stringify({
      targetPort: port,
    }),
  });

  const tunnelData = await tunnelResponse.json();

  if (!tunnelResponse.ok) {
    console.error(
      `Failed to create tunnel: ${tunnelData.message ?? "Unknown error"}`,
    );
    return;
  }

  const { tunnelId, subdomain } = tunnelData.tunnel;

  console.log(`Tunnel ID: ${tunnelId}`);
  console.log(`Subdomain: ${subdomain}`);

  // 2. Connect WebSocket
  const socket = new WebSocket(WS_URL);

  socket.on("open", () => {
    console.log("✓ Connected to MyTunnel");

    socket.send(
      JSON.stringify({
        type: "register",
        tunnelId,
        token: config.token,
      }),
    );
  });

  socket.on("message", async (data) => {
    const message = JSON.parse(data.toString());

    if (message.type === "connected") {
      return;
    }

    if (message.type === "registered") {
      console.log("✓ Tunnel established");
      console.log(`→ http://localhost:4000/t/${tunnelId}`);
      return;
    }

    if (message.type === "http_request") {
      await handleRequest(socket, message, port);
    }

    if (message.type === "error") {
      console.error(`Tunnel error: ${message.message}`);
    }
  });

  socket.on("close", () => {
    console.log("\nTunnel disconnected");
  });

  socket.on("error", (error) => {
    console.error("Tunnel error:", error.message);
  });
}

async function handleRequest(socket: WebSocket, message: any, port: number) {
  try {
    const response = await fetch(`http://localhost:${port}${message.path}`, {
      method: message.method,
      headers: message.headers,
    });

    const body = await response.text();

    socket.send(
      JSON.stringify({
        type: "http_response",
        requestId: message.requestId,
        status: response.status,
        headers: Object.fromEntries(response.headers),
        body,
      }),
    );
  } catch {
    socket.send(
      JSON.stringify({
        type: "http_response",
        requestId: message.requestId,
        status: 502,
        headers: {
          "content-type": "text/plain",
        },
        body: "Unable to connect to local server",
      }),
    );
  }
}
