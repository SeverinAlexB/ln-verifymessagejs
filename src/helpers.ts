import * as sjcl from "sjcl";


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

export function getMessageHash(message: string) {
    const messageWithPrefix = "Lightning Signed Message:" + message;
    const dsha256 = sjcl.hash.sha256.hash(
        sjcl.hash.sha256.hash(messageWithPrefix)
    );
    return sjcl.codec.hex.fromBits(dsha256);
}