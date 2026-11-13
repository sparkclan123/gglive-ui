import { validateChallenge } from './proofOfWork.js';

export async function solveRegistrationProof(api, signal, workerFactory = () => new Worker(new URL('../workers/registrationProof.worker.js', import.meta.url), { type: 'module' })) {
  const { data: challenge } = await api.get('/premier-league/auth/challenge', { signal });
  validateChallenge(challenge);
  if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
  return new Promise((resolve, reject) => {
    const worker = workerFactory();
    const finish = (error, value) => {
      clearTimeout(timeout);
      signal?.removeEventListener('abort', cancel);
      worker.terminate();
      if (error) reject(error); else resolve(value);
    };
    const cancel = () => finish(new DOMException('Cancelled', 'AbortError'));
    const timeout = setTimeout(() => finish(new Error('ตรวจสอบนานเกินไป กรุณาลองใหม่อีกครั้ง')), 45_000);
    signal?.addEventListener('abort', cancel, { once: true });
    worker.onerror = () => finish(new Error('ไม่สามารถตรวจสอบได้ กรุณาลองใหม่อีกครั้ง'));
    worker.onmessage = ({ data }) => {
      if (!data || data.error || !/^(0|[1-9][0-9]{0,8})$/.test(data.nonce)) return finish(new Error(data?.error || 'ผลการตรวจสอบไม่ถูกต้อง'));
      finish(null, { challenge_id: challenge.id, nonce: data.nonce });
    };
    worker.postMessage(challenge);
  });
}
