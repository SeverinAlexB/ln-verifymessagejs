import { dsha256, hexToBytes, stringToBytes } from "./utils";
import * as secp from "@noble/secp256k1";

/**
 * Generate a shared secret between the private key and the public key (nodeId).
 * @param privateKey Private key as bytes array or hex string.
 * @param nodePubkey Lightning Node ID aka. public key as string.
 * @param derivationName Name/password to derive a unique secret. Double sha256(baseSecret + derivationName).
 * @returns Uint8Array
 */
export function generateSharedSecret(privateKey: Uint8Array | string, nodePubkey: string, derivationName?: string) {
    if (typeof privateKey === 'string' || privateKey instanceof String) {
        privateKey = hexToBytes(privateKey as string)
    }

    const publicKey = hexToBytes(nodePubkey);
    let baseSecret = secp.getSharedSecret(privateKey, publicKey, true);
    if (!derivationName) {
        return baseSecret
    }

    let bytes = stringToBytes(derivationName)
    const mergedArray = new Uint8Array(baseSecret.length + bytes.length);
    mergedArray.set(baseSecret);
    mergedArray.set(bytes, baseSecret.length);

    return dsha256(mergedArray)
}
