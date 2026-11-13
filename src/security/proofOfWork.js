import { sha256 } from '@noble/hashes/sha2.js';

export function validateChallenge(challenge, now = Date.now()) {
  if (!challenge || !/^[a-f0-9]{32}$/.test(challenge.id) || !/^[a-f0-9]{64}$/.test(challenge.salt)
    || challenge.difficulty !== 18 || !Number.isSafeInteger(challenge.expires)
    || challenge.expires * 1000 <= now || challenge.expires * 1000 > now + 6 * 60_000) {
    throw new Error('การตรวจสอบหมดอายุ กรุณาลองใหม่');
  }
}

export function hasLeadingZeroBits(hash, difficulty) {
  let remaining = difficulty;
  for (const byte of hash) {
    const required = Math.min(remaining, 8);
    if ((byte >>> (8 - required)) !== 0) return false;
    remaining -= required;
    if (remaining === 0) return true;
  }
  return false;
}

// Run only in a worker: the bundled hash also works on the temporary HTTP/IP site.
export function solveProof(challenge) {
  validateChallenge(challenge);
  const encoder = new TextEncoder();
  for (let nonce = 0; nonce < 100_000_000; nonce++) {
    if (nonce % 4096 === 0 && Date.now() >= challenge.expires * 1000) throw new Error('การตรวจสอบหมดอายุ กรุณาลองใหม่');
    if (hasLeadingZeroBits(sha256(encoder.encode(`${challenge.salt}:${nonce}`)), challenge.difficulty)) return String(nonce);
  }
  throw new Error('ตรวจสอบไม่สำเร็จ กรุณาลองใหม่');
}
