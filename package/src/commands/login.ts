import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { saveConfig } from "../config.js";
import { API_URL } from "../config.js";

export async function login() {
  const rl = readline.createInterface({
    input,
    output,
  });

  const email = await rl.question("Email: ");
  const password = await rl.question("Password: ");

  rl.close();

  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(`Login failed: ${data.message}`);
    return;
  }

  saveConfig({
    token: data.token,
  });

  console.log("✓ Logged in successfully");
}
