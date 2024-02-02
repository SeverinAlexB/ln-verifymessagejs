import * as secp from "@noble/secp256k1";
import * as shajs from "sha.js";


export const defaultLightningSignPrefix = 'Lightning Signed Message:'

export function bytesToBigInt(bytes: Uint8Array): bigint {
    var hex = [];
    bytes.forEach(function (i) {
        var h = i.toString(16);
        if (h.length % 2) {
            h = "0" + h;
        }
        hex.push(h);
    });
    return BigInt("0x" + hex.join(""));
}

export function hexToBytes(hex: string): Uint8Array {
    const array = new Uint8Array(
        hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
    );
    return array;
}

export function bytesToHex(bytes: Uint8Array): string {
    return secp.utils.bytesToHex(bytes)
}

export function stringToBytes(val: string): Uint8Array { 
    const result = []; 
    for (let i = 0; i < val.length; i++) { 
        result.push(val.charCodeAt(i)); 
    } 
    return new Uint8Array(result); 
} 

export function getMessageHash(message: string, prefix: string = defaultLightningSignPrefix) {
    const messageWithPrefix = prefix + message;
    const messageBytes = stringToBytes(messageWithPrefix);
    const hash = dsha526(messageBytes);
    return bytesToHex(hash)
}

export interface IKeyPair {
    publicKey: {
        /**
         * Raw byte representation
         */
        bytes: Uint8Array,
        /**
         * Compressed pubkey. DER hex representation.
         */
        hex: string
    },
    privateKey: {
        /**
         * Raw byte representation
         */
        bytes: Uint8Array,
        /**
         * Hex
         */
        hex: string
    }
}

export function generateKeyPair(): IKeyPair {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    return {
        privateKey: {
            hex: Buffer.from(privKey).toString('hex'),
            bytes: privKey
        },
        publicKey: {
            hex: secp.utils.bytesToHex(pubKey),
            bytes: pubKey
        }
    }
}

/**
 * Creates a double sha256
 * @param value 
 * @returns 
 */
export function dsha526(value: Uint8Array | Buffer) {
    const hash1: Buffer = shajs('sha256').update(value).digest();
    const hash2: Buffer = shajs('sha256').update(hash1).digest();
    return new Uint8Array(hash2);
}