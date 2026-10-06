import { Response } from "express";

const pendingRequests = new Map<string, Response>();

export function addPendingRequest(requestId: string, response: Response) {
  pendingRequests.set(requestId, response);
}

export function resolvePendingRequest(
  requestId: string,
  status: number,
  headers: Record<string, string>,
  body: string,
) {
  const response = pendingRequests.get(requestId);

  if (!response) {
    console.log(`No pending request: ${requestId}`);
    return;
  }

  pendingRequests.delete(requestId);

  response.status(status);

  for (const [key, value] of Object.entries(headers)) {
    response.setHeader(key, value);
  }

  response.send(body);
}
