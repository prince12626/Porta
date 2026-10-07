#!/usr/bin/env node
import { Command } from "commander";

import { login } from "./commands/login.js";
import { httpTunnel } from "./commands/http.js";

const program = new Command();

program
  .name("porta")
  .description("Expose local services to the internet")
  .version("1.0.10", "-V, --version");

program.command("login").description("Login to Porta").action(login);

program
  .command("http <port>")
  .description("Create an HTTP tunnel")
  .action((port) => {
    httpTunnel(Number(port));
  });

program.parse();
