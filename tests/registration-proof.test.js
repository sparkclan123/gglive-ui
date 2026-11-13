import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { solveProof, validateChallenge, hasLeadingZeroBits } from '../src/security/proofOfWork.js';
import { solveRegistrationProof } from '../src/security/registrationProof.js';

const challenge = () => ({ id: 'a'.repeat(32), salt: 'b'.repeat(64), difficulty: 18, expires: Math.floor(Date.now() / 1000) + 300 });

test('worker computation satisfies the server SHA-256 protocol without Web Crypto', () => {
  const c = challenge(); const nonce = solveProof(c);
  const hash = createHash('sha256').update(`${c.salt}:${nonce}`).digest();
  assert.equal(hash[0], 0); assert.equal(hash[1], 0); assert.equal(hash[2] >>> 6, 0);
});
test('proof validation rejects expired and unbounded work', () => {
  for (const invalid of [null, { ...challenge(), difficulty: 30 }, { ...challenge(), expires: 1 }, { ...challenge(), salt: 'bad' }]) assert.throws(() => validateChallenge(invalid));
  assert.equal(hasLeadingZeroBits(Uint8Array.from([0, 0, 64]), 18), false);
});
test('proof transport terminates worker and returns one challenge result', async () => {
  let terminated = 0;
  const worker = { terminate: () => terminated++, postMessage() { queueMicrotask(() => this.onmessage({ data: { nonce: '42' } })); } };
  const proof = await solveRegistrationProof({ get: async () => ({ data: challenge() }) }, undefined, () => worker);
  assert.deepEqual(proof, { challenge_id: 'a'.repeat(32), nonce: '42' }); assert.equal(terminated, 1);
});
test('aborting navigation terminates pending worker work', async () => {
  const controller = new AbortController(); let terminated = 0;
  const worker = { terminate: () => terminated++, postMessage() { controller.abort(); } };
  await assert.rejects(solveRegistrationProof({ get: async () => ({ data: challenge() }) }, controller.signal, () => worker), { name: 'AbortError' });
  assert.equal(terminated, 1);
});
