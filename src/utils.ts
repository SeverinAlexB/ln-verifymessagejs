import * as sjcl from "sjcl";
import * as secp from "@noble/secp256k1";

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

export function getMessageHash(message: string, prefix: string = defaultLightningSignPrefix) {
    const messageWithPrefix = prefix + message;
    const dsha256 = sjcl.hash.sha256.hash(
        sjcl.hash.sha256.hash(messageWithPrefix)
    );
    return sjcl.codec.hex.fromBits(dsha256);
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