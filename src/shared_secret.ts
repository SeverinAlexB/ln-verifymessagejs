import { dsha526, hexToBytes, stringToBytes } from "./utils";
import * as secp from "@noble/secp256k1";

/**
 * Generate a shared secret between the private key and the public key (nodeId).
 * @param privateKey Private key as bytes array or hex string.
 * @param nodePubkey Lightning Node ID aka. public key as string.
 * @param derivationName Name/password to derive a unique secret. Double sha256(baseSecret + derivation).
 * @returns Uint8Array
 */
export function generateSharedSecret(privateKey: Uint8Array | string, nodePubkey: string, derivationName?: string) {
    if (typeof privateKey === 'string' || privateKey instanceof String) {
        privateKey = hexToBytes(privateKey as string)
    }

    const publicKey = hexToBytes(nodePubkey);
    let baseSecret = secp.getSharedSecret(privateKey, publicKey, true);

    let prehashed = baseSecret;
    if (derivationName){
        let bytes = stringToBytes(derivationName)
        const mergedArray = new Uint8Array(prehashed.length + bytes.length);
        mergedArray.set(prehashed);
        mergedArray.set(bytes, prehashed.length);
        prehashed = mergedArray;
    }

    return dsha526(prehashed)
}