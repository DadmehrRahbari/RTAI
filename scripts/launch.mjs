#!/usr/bin/env node
// One script, zero manual steps: installs dependencies if they're missing,
// starts the dev server, and opens your default browser automatically
// (via Astro's own --open flag). Works the same on Windows, macOS, and
// Linux -- called by start.bat, start.sh, or `npm run launch` directly.

import { spawn, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
process.chdir(root);

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';

if (!existsSync(path.join(root, 'node_modules'))) {
  console.log('[launch] First run detected -- installing dependencies (npm install)...');
  const install = spawnSync(npmCmd, ['install'], { stdio: 'inherit', shell: true });
  if (install.status !== 0) {
    console.error('[launch] npm install failed -- see the error above. Fix that, then run this again.');
    process.exit(install.status ?? 1);
  }
}

console.log('[launch] Starting the dev server and opening your browser...');
console.log('[launch] Press Ctrl+C in this window to stop it.\n');

const dev = spawn(npmCmd, ['run', 'dev', '--', '--open'], { stdio: 'inherit', shell: true });
dev.on('exit', (code) => process.exit(code ?? 0));
