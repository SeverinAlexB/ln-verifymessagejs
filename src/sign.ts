import * as secp from "@noble/secp256k1";
import { zbase32 } from "../src/zbase";
import { getMessageHash } from "./helpers";

export async function signMessage(message: string, privateKey: Uint8Array, target: 'zbase' | 'hex' = 'zbase') {
    // const privKey = secp.utils.randomPrivateKey()

    // const pubKey = secp.getPublicKey(privateKey, true)
    // const nodeId = Buffer.from(pubKey).toString('hex')

    const hash = getMessageHash(message)
    const [signature, recovery] = await secp.sign(hash, privateKey, {
        recovered: true,
        der: false
    })
    const arr = new Uint8Array([recovery + 31, ...Array.from(signature)])

    let sigEncoded: string
    if (target === 'zbase') {
        sigEncoded = zbase32.encode(arr)
    } else if (target === 'hex') {
        sigEncoded = secp.utils.bytesToHex(arr)
    }
    return sigEncoded
}