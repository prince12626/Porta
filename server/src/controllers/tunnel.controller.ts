import { Response } from "express";
import crypto from "crypto";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Tunnel } from "../models/tunnel.model.js";

export async function createTunnel(req: AuthRequest, res: Response) {
  try {
    const { targetPort } = req.body;

    if (!targetPort || !Number.isInteger(targetPort)) {
      return res.status(400).json({
        message: "Valid targetPort is required",
      });
    }

    const tunnelId = crypto.randomUUID();
    const subdomain = crypto.randomBytes(4).toString("hex");

    const tunnel = await Tunnel.create({
      userId: req.userId,
      tunnelId,
      subdomain,
      targetPort,
      status: "offline",
    });

    return res.status(201).json({
      tunnel,
    });
  } catch {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMyTunnels(req: AuthRequest, res: Response) {
  const tunnels = await Tunnel.find({
    userId: req.userId,
  });

  return res.json({
    tunnels,
  });
}
