import * as secp from "@noble/secp256k1";
import {utils} from '../src'
import { hexToBytes } from "../src/utils";


test("Match key string with bytes", async () => {
    const {publicKey, privateKey} = utils.generateKeyPair()

    const rawPub = secp.Point.fromHex(publicKey.der).toRawBytes(true)
    expect(rawPub).toEqual(publicKey.bytes)

    const rawPriv = hexToBytes(privateKey.hex)
    expect(rawPriv).toEqual(privateKey.bytes)
});





