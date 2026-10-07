import os from "os";
import path from "path";
import fs from "fs";

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

export const API_URL = "https://porta-api.princechaurasiya.in";

export const WS_URL = "wss://porta-api.princechaurasiya.in/tunnel";
