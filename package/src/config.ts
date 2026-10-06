import os from "os";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const directory = path.join(os.homedir(), ".mytunnel");
const configPath = path.join(directory, "config.json");

export interface Config {
  token?: string;
}

export function saveConfig(config: Config) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export function getConfig(): Config {
  if (!fs.existsSync(configPath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

export function clearConfig() {
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
  }
}

export const API_URL = process.env.MYTUNNEL_API_URL!;

export const WS_URL = process.env.MYTUNNEL_WS_URL!;

if (!API_URL) {
  throw new Error("MYTUNNEL_API_URL is not configured");
}

if (!WS_URL) {
  throw new Error("MYTUNNEL_WS_URL is not configured");
}
