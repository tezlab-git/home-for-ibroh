#!/usr/bin/env node
// server-run.mjs
// Lightweight launcher that tries to run the real production server entry produced by the build.
// Searches common output locations used by tooling (Nitro -> .output/server/index.mjs, older -> dist/server/server.js)

import fs from 'fs';
import { spawn } from 'child_process';

const candidates = [
  '.output/server/index.mjs',
  '.output/server/index.js',
  'dist/server/server.js',
  'dist/server/index.js',
  'dist/server/server.mjs',
  'index.js',
];

function findEntry() {
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const entry = findEntry();
if (!entry) {
  console.error('No server entry found. Tried:', candidates.join(', '));
  console.error('Did you run `npm run build`?');
  process.exit(1);
}

// Spawn node on the found entry and forward stdio
const child = spawn(process.execPath, [entry], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));
child.on('error', (err) => {
  console.error('Failed to start server entry:', err);
  process.exit(1);
});
