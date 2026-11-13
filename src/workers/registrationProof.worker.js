import { solveProof } from '../security/proofOfWork.js';

self.onmessage = ({ data }) => {
  try { self.postMessage({ nonce: solveProof(data) }); }
  catch (error) { self.postMessage({ error: error.message }); }
};
