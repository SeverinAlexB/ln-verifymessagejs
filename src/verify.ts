import * as secp from "@noble/secp256k1";
import { zbase32 } from "./zbase";
import { bytesToBigInt, getMessageHash, hexToBytes } from "./helpers";

/**
 * Algorithm according to https://twitter.com/rusty_twit/status/1182102005914800128
 * zbase32(SigRec(SHA256(SHA256("Lightning Signed Message:" + msg))))
 */




function splitBytesToSignatureAndRecovery(bytes: Uint8Array): [Uint8Array, number] {
  const recoveryId = bytes[0] - 31; // Get first byte and remove the leading "0".
  const signature = bytes.slice(1, 65);
  return [signature, recoveryId];
}

function getSignature(signatureBytes: Uint8Array): secp.Signature {
  const r = bytesToBigInt(signatureBytes.slice(0, 32));
  const s = bytesToBigInt(signatureBytes.slice(32, 64));
  const signature = new secp.Signature(r, s);
  return signature;
}

export function deriveNodeIdBytes(bytes: Uint8Array, message: string) {
  try {
    const [signatureBytes, recoveryId] = splitBytesToSignatureAndRecovery(bytes);
    const signature = getSignature(signatureBytes);
    signature.assertValidity();

    const messageHash = getMessageHash(message);

    const point = secp.Point.fromSignature(messageHash, signature, recoveryId);
    point.assertValidity();

    const nodeId = point.toHex(true);
    return nodeId;
  } catch (e) {
    return undefined;
  }
}

export function deriveNodeIdZbase(zbase: string, message: string) {
  try {
    const bytes = zbase32.decode(zbase);
    return deriveNodeIdBytes(bytes, message);
  } catch (e) {
    return undefined;
  }
}

export function deriveNodeIdHex(hex: string, message: string) {
  try {
    const bytes = hexToBytes(hex);
    return deriveNodeIdBytes(bytes, message);
  } catch (e) {
    return undefined;
  }
}

export function deriveNodeId(hexOrZbase: string, message: string) {
  const isHex = hexOrZbase.length === 130;
  const isZbase = hexOrZbase.length === 104;

  if (isZbase) {
    return deriveNodeIdZbase(hexOrZbase, message);
  } else if (isHex) {
    return deriveNodeIdHex(hexOrZbase, message);
  } else {
    return undefined;
  }

}


