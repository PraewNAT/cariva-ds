#!/usr/bin/env tsx
/**
 * Probe local agent — used by make peer-probe and wizard.
 */
import "dotenv/config";
import { probeAgent, loadRunnerConfigFromEnv } from "./agent-runner/index.js";

const cfg = loadRunnerConfigFromEnv();
console.log(`Probing ${cfg.product} (${cfg.mode})...`);
const result = await probeAgent();
console.log(JSON.stringify(result, null, 2));
process.exit(result.ok ? 0 : 1);
