# ln-verifymessage-js

A simple library to derive Lightning Network node public keys from signed messages.

### Usage

Derive nodeId from a message and the according signature.

```ts
import { deriveNodeId } from "ln-verify-message";

const messageThatHasBeenSigned = "ln-verifymessage-js";
const zbaseSignature = "rynmoqhhadjsttaracxgo9nhkoioi6peib8k18dekrih4hxpp36zcbgc6ntyrggc11uhjcb9prcx5py6qo16bk89i458r4n51ghggnxc";

const derivedNodeId = deriveNodeId(zbaseSignature, messageThatHasBeenSigned);
console.log("Message has been signed by", derivedNodeId);
```


Check if the signature and message has been signed by a specific node.

```ts
const expectedNodeId = "02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8";
if (derivedNodeId !== expectedNodeId) {
    throw new Error("Signature does not match expected nodeId");
}

```