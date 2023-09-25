import * as secp from "@noble/secp256k1";
import {signMessage} from '../src/sign'
import {deriveNodeIdZbase, deriveNodeIdHex} from '../src/verify'
import { generateKeyPair } from "../src/utils";


test("sign and verify zbase", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, 'zbase')
    const derivedNodeId = deriveNodeIdZbase(signature, message)
    expect(derivedNodeId).toEqual(nodeId)
});

test("sign and verify hex", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, 'hex')
    const derivedNodeId = deriveNodeIdHex(signature, message)
    expect(derivedNodeId).toEqual(nodeId)
});


test("sign and verify string and bytes privKey", async () => {
    const {privateKey} = generateKeyPair()

    const message = "hodl"
    const signatureBytes = await signMessage(message, privateKey.bytes, 'zbase')
    const signatureString = await signMessage(message, privateKey.hex, 'zbase')

    expect(signatureBytes).toEqual(signatureString)
});
