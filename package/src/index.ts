#!/usr/bin/env node

import { Command } from "commander";

import { login } from "./commands/login.js";
import { httpTunnel } from "./commands/http.js";

const program = new Command();

program
  .name("mytunnel")
  .description("Expose local services to the internet")
  .version("0.1.0");

program.command("login").description("Login to MyTunnel").action(login);

program
  .command("http <port>")
  .description("Create an HTTP tunnel")
  .action((port) => {
    httpTunnel(Number(port));
  });

program.parse();
