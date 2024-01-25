import * as secp from "@noble/secp256k1";
import {utils} from '../src'
import { bytesToHex, dsha526, hexToBytes } from "../src/utils";
import * as sjcl from "sjcl";


test("Match key string with bytes", async () => {
    const {publicKey, privateKey} = utils.generateKeyPair()

    const rawPub = secp.Point.fromHex(publicKey.hex).toRawBytes(true)
    expect(rawPub).toEqual(publicKey.bytes)

    const rawPriv = hexToBytes(privateKey.hex)
    expect(rawPriv).toEqual(privateKey.bytes)
});


test("dsha256", async () => {
    const input = new Uint8Array([
        250, 54, 42, 69, 214, 70, 77, 20,
        135, 187, 147, 247, 39, 15, 200, 85,
        169, 168, 221, 176, 136, 131, 104, 187,
        23, 78, 134, 227, 48, 33, 122, 213
    ]);
    const hash = dsha526(input)
    expect(hash).toEqual(new Uint8Array([179, 34, 87, 183, 183, 156, 156, 56, 23, 65, 122, 250, 131, 252, 176, 48, 203, 212, 161, 7, 140, 69, 140, 99, 185, 22, 74, 197, 114, 194, 250, 132]));
});


