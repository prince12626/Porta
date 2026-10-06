import { Router } from "express";
import {
  createTunnel,
  getMyTunnels,
} from "../controllers/tunnel.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", createTunnel);
router.get("/", getMyTunnels);

export default router;
