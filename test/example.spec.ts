import { deriveNodeId } from "../src";

test("deriveNodeId", () => {
    const nodeId = '02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8';
    const zBase = 'rbwzq7bjg1iw4xthgt463a1d88w5k4zmum9z3xtfbnhc7r3qoizrn8edgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'test';
    const extractedNodeId = deriveNodeId(zBase, message);
    expect(extractedNodeId).toEqual(nodeId);
});

test("deriveNodeId invalid zbase", () => {
    const zBase = 'r';
    const message = 'test';
    const extractedNodeId = deriveNodeId(zBase, message);
    expect(extractedNodeId).toEqual(undefined);
});

test("deriveNodeId invalid message", () => {
    const zBase = 'rbwzq7bjg1iw4xthgt463a1d88w5k4zmum9z3xtfbnhc7r3qoizrn8edgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'InvalidMessage';
    const extractedNodeId = deriveNodeId(zBase, message);
    // Even though an invali message is provided, a derived public key is still returned.
    // It is not possible to check if the message matched the signature without knowing the nodeId before.
    expect(extractedNodeId).toEqual('029b9b9745934fbd829f8a28477439b10c3fb565b58010ebdb77303243357bca88');
});
