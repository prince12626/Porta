import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:4000/tunnel");

socket.on("open", () => {
  console.log("Connected to server");

  socket.send(
    JSON.stringify({
      type: "register",
      tunnelId: "test-123",
      targetPort: 3000,
    }),
  );
});

socket.on("message", async (data) => {
  const message = JSON.parse(data.toString());

  console.log("Server:", message);

  if (message.type !== "http_request") {
    return;
  }

  const response = await fetch(`http://localhost:${3000}${message.path}`, {
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
});

socket.on("close", () => {
  console.log("Disconnected");
});

socket.on("error", (error) => {
  console.error(error);
});
