import { deriveNodeIdZbase, deriveNodeIdHex, deriveNodeId } from "../src";

test("deriveNodeIdZbase default", () => {
    const nodeId = '02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8';
    const zBase = 'rbwzq7bjg1iw4xthgt463a1d88w5k4zmum9z3xtfbnhc7r3qoizrn8edgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'test';
    const extractedNodeId = deriveNodeIdZbase(zBase, message);
    expect(extractedNodeId).toEqual(nodeId);
});

test("deriveNodeIdHex default", () => {
    const nodeId = '02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8';
    const hex = '206977742934ab4d3e3c3475ece24339e9b56aeb9aff7cbe2508b8ce932e856e411d033522d3af6bf3cabb75ac03189998c4fe75152934ba296a8f5abba61d566f';
    const message = 'test';
    const extractedNodeId = deriveNodeIdHex(hex, message);
    expect(extractedNodeId).toEqual(nodeId);
});

test("deriveNodeIdZbase invalid", () => {
    const zBase = 'r';
    const message = 'test';
    const extractedNodeId = deriveNodeIdZbase(zBase, message);
    expect(extractedNodeId).toEqual(undefined);
});

test("deriveNodeIdZbase invalid message", () => {
    const zBase = 'rbwzq7bjg1iw4xthgt463a1d88w5k4zmum9z3xtfbnhc7r3qoizrn8edgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'InvalidMessage';
    const extractedNodeId = deriveNodeIdZbase(zBase, message);
    // Even though an invalid message is provided, a derived public key is still returned.
    // It is not possible to check if the message matched the signature without knowing the nodeId before.
    expect(extractedNodeId).toEqual('029b9b9745934fbd829f8a28477439b10c3fb565b58010ebdb77303243357bca88');
});


test("deriveNodeId hex or zbase", () => {
    const nodeId = '02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8';
    const hex = '206977742934ab4d3e3c3475ece24339e9b56aeb9aff7cbe2508b8ce932e856e411d033522d3af6bf3cabb75ac03189998c4fe75152934ba296a8f5abba61d566f';
    const zBase = 'rbwzq7bjg1iw4xthgt463a1d88w5k4zmum9z3xtfbnhc7r3qoizrn8edgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'test';
    const hexNodeId = deriveNodeId(hex, message);
    const zbaseNodeId = deriveNodeId(zBase, message);
    expect(nodeId).toEqual(hexNodeId);
    expect(hexNodeId).toEqual(zbaseNodeId);
});

test("deriveNodeId hex or zbase wrong length", () => {
    const nodeId = '02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8';
    const hex = '189998c4fe75152934ba296a8f5abba61d566f';
    const zBase = 'dgwtp8m5m6xfms7pcyccjuggr934tkkjwzewsid44zqub4iux';
    const message = 'test';
    const hexNodeId = deriveNodeId(hex, message);
    const zbaseNodeId = deriveNodeId(zBase, message);
    expect(hexNodeId).toEqual(undefined);
    expect(zbaseNodeId).toEqual(undefined);
});