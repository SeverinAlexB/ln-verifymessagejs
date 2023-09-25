import * as secp from "@noble/secp256k1";
import { zbase32 } from "./zbase";
import { defaultLightningSignPrefix, getMessageHash, hexToBytes } from "./utils";

export interface ISignOptions {
    /**
     * Signature format
     */
    signatureFormat: 'hex' | 'zbase',
    /**
     * Prefix of the signed message.
     */
    prefix: string
}

export const defaultSignOptions: ISignOptions = {
    signatureFormat: 'zbase',
    prefix: defaultLightningSignPrefix
}

/**
 * Sign a message with the given private key.
 * @param message Plain message
 * @param privateKey Private key as bytes or hex string.
 * @param options 
 * @returns 
 */
export async function signMessage(message: string, privateKey: Uint8Array | string, options: Partial<ISignOptions> = {}): Promise<string> {
    const opts = Object.assign({}, defaultSignOptions, options)
    if (typeof privateKey === 'string' || privateKey instanceof String) {
        privateKey = hexToBytes(privateKey as string)
    }

    const hash = getMessageHash(message, opts.prefix)
    const [signature, recovery] = await secp.sign(hash, privateKey, {
        recovered: true,
        der: false
    })
    const arr = new Uint8Array([recovery + 31, ...Array.from(signature)])

    if (opts.signatureFormat === 'zbase') {
        return zbase32.encode(arr)
    } else if (opts.signatureFormat === 'hex') {
        return secp.utils.bytesToHex(arr)
    }
}