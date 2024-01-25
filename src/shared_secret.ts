import { hexToBytes } from "./utils";
import * as sjcl from "sjcl";
import * as secp from "@noble/secp256k1";

/**
 * Generate a shared secret between the private key and the public key (nodeId).
 * @param privateKey Private key as bytes array or hex string.
 * @param nodeId Lightning Node ID aka. public key as string.
 * @param derivation Name/password that the key should be
 * @returns Uint8Array
 */
export function generateSharedSecret(privateKey: Uint8Array | string, nodeId: string, derivation?: string) {
    if (typeof privateKey === 'string' || privateKey instanceof String) {
        privateKey = hexToBytes(privateKey as string)
    }

    const publicKey = hexToBytes(nodeId);
    const sharedSecret = secp.getSharedSecret(privateKey, publicKey, true);
    if (derivation){

    }
    return sharedSecret
}