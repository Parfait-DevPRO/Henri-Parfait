const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const net = require('node:net');
const path = require('node:path');
const { after, before, test } = require('node:test');

const serverDirectory = path.join(__dirname, '..');
let backend;
let baseUrl;
let startupOutput = '';

async function findAvailablePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolve);
  });

  const { port } = probe.address();
  await new Promise((resolve, reject) => {
    probe.close((error) => error ? reject(error) : resolve());
  });
  return port;
}

before(async () => {
  const port = await findAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  backend = spawn(process.execPath, ['index.js'], {
    cwd: serverDirectory,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  backend.stdout.setEncoding('utf8').on('data', (data) => { startupOutput += data; });
  backend.stderr.setEncoding('utf8').on('data', (data) => { startupOutput += data; });

  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (backend.exitCode !== null) {
      throw new Error(`Backend exited before becoming ready:\n${startupOutput}`);
    }

    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`Backend did not become ready:\n${startupOutput}`);
});

after(async () => {
  if (backend && backend.exitCode === null) {
    backend.kill();
    await new Promise((resolve) => backend.once('exit', resolve));
  }
});

test('health endpoint reports the backend as ready', async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('unknown download projects return 404', async () => {
  const response = await fetch(`${baseUrl}/api/download/not-a-project`);
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Projet introuvable.' });
});
