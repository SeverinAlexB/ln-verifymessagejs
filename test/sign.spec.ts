import { deriveNodeId, deriveNodeIdZbase, getMessageHash, hexToBytes } from "../src";
import * as secp from "@noble/secp256k1";
import { zbase32 } from "../src/zbase";

const sleep = (ms: number) => new Promise((resolve, reject) => setTimeout(() => resolve(undefined), ms));

test("deriveNodeIdZbase", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId =Buffer.from(pubKey).toString('hex')

    console.log('Public key', Buffer.from(pubKey).toString('hex'))

    const message = 'test';
    const hash = getMessageHash(message)
    console.log('message', message)
    console.log('hash', hash)
    const [signature, recovery] = await secp.sign(hash, privKey, {
        recovered: true
    })
    console.log('signature', signature)
    console.log('recovery', recovery)
    const arr = new Uint8Array([recovery + 31, ...signature])

    const point = secp.Point.fromSignature(hash, signature, recovery);
    point.assertValidity();

    const extractedNodeIdManul = point.toHex(true);
    console.log('Manual extraction node id', extractedNodeIdManul)
    await sleep(100)

    const zBase = zbase32.encode(arr)
    console.log('signature', zBase)
    const extractedNodeId = deriveNodeIdZbase(zBase, message);

    console.log(extractedNodeId)
});

test("sig to zbas", async () => {
    const sig = 'ddd47bc1398327e98775b27cc575fce1df2464c382549eacebc7233c1cbc4b430f8ee4d654719a1bc281f51b030ba9fa8bf95032c26abfe6e56bb282a9065332'
    const zbase = zbase32.encode(hexToBytes(sig))
    const extractedNodeId = deriveNodeId('1f730dce842c31b692dc041c2d0f00423d2a2a67b0c63c1a905d500f09652a5b1a036763a1603333fa589ae92d1f7963428ff170e976d0966a113f4b9f9d0efc7f', 'MyMessageToSign');
    expect(extractedNodeId).toEqual('02ca7361934233f6d4defd4d792fb2ce2cd0b50c7605e6c5cd16006bcd5be2bf70')
});

