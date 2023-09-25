import * as secp from "@noble/secp256k1";
import {signMessage} from '../src/sign'
import {deriveNodeIdZbase, deriveNodeIdHex} from '../src/verify'
import { generateKeyPair } from "../src/utils";


test("sign and verify zbase", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, {
        signatureFormat:'zbase'
    })
    const derivedNodeId = deriveNodeIdZbase(signature, message)
    expect(derivedNodeId).toEqual(nodeId)
});

test("sign and verify hex", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, {
        signatureFormat: 'hex'
    })
    const derivedNodeId = deriveNodeIdHex(signature, message)
    expect(derivedNodeId).toEqual(nodeId)
});


test("sign and verify string and bytes privKey", async () => {
    const {privateKey} = generateKeyPair()

    const message = "hodl"
    const signatureBytes = await signMessage(message, privateKey.bytes, {
        signatureFormat: 'zbase'
    })
    const signatureString = await signMessage(message, privateKey.hex, {
        signatureFormat: 'zbase'
    })

    expect(signatureBytes).toEqual(signatureString)
});


test("sign and verify custom prefix success", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, {
        signatureFormat:'zbase',
        prefix: 'custom'
    })
    const derivedNodeId = deriveNodeIdZbase(signature, message, 'custom')
    expect(derivedNodeId).toEqual(nodeId)
});

test("sign and verify custom prefix fail", async () => {
    const privKey = secp.utils.randomPrivateKey()
    const pubKey = secp.getPublicKey(privKey, true)
    const nodeId = Buffer.from(pubKey).toString('hex')

    const message = "hodl"
    const signature = await signMessage(message, privKey, {
        signatureFormat:'zbase',
        prefix: 'custom1'
    })
    const derivedNodeId = deriveNodeIdZbase(signature, message, 'custom2')
    expect(derivedNodeId).not.toEqual(nodeId)
});


test("readme test", async () => {
    const {privateKey, publicKey} = generateKeyPair()

    const message = "helloWorld"
    const signature = await signMessage(message, privateKey.bytes, {
        signatureFormat:'zbase'
    })
    const derivedNodeId = deriveNodeIdZbase(signature, message)
    expect(derivedNodeId).toEqual(publicKey.der)

    console.log(signature)
    console.log(derivedNodeId)
});