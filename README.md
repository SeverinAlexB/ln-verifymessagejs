# ln-verifymessagejs

A simple library to derive Lightning Network node ids from signed messages. No need for running Lightning Network node. Everything is done in js.

## Install

```bash
npm i ln-verifymessagejs
```

## Usage

#### Derive node id from signature and message


```ts
import { deriveNodeId } from "ln-verifymessagejs";

const messageThatHasBeenSigned = "ln-verifymessagejs";
const zbaseSignature = "rynmoqhhadjsttaracxgo9nhkoioi6peib8k18dekrih4hxpp36zcbgc6ntyrggc11uhjcb9prcx5py6qo16bk89i458r4n51ghggnxc";

const derivedNodeId = deriveNodeId(zbaseSignature, messageThatHasBeenSigned);
console.log("Message has been signed by", derivedNodeId);
```

Be aware: `deriveNodeId` does not check if the message has been signed by the specific signature nor does it check
if the node exists.


#### Check if the signature and message has been signed by a specific node

```ts
const expectedNodeId = "02ac77f9f7397a64861b573c9e8b8652ce2e67a05150fd166831e9fc167670dfd8";
if (derivedNodeId !== expectedNodeId) {
    throw new Error("Signature does not match expected nodeId");
}

```


## Sign message

Node operators can sign message with [Thunderhub](https://thunderhub.io/) and [Ride the Lightning](https://github.com/Ride-The-Lightning/RTL).

If a user has access to a terminal messages can be signed directly with the cli.

**lnd**
```bash

lncli signmessage --msg MyMessageToSign
# {
#     "signature": "rynmoqhhadjsttaracxgo9nhkoioi6peib8k18dekrih4hxpp36zcbgc6ntyrggc11uhjcb9prcx5py6qo16bk89i458r4n51ghggnxc"
# }
```
**c-ightning**
```bash

lightning-cli signmessage MyMessageToSign
# {
#    "signature": "ddd47bc1398327e98775b27cc575fce1df2464c382549eacebc7233c1cbc4b430f8ee4d654719a1bc281f51b030ba9fa8bf95032c26abfe6e56bb282a9065332",
#    "recid": "01",
#    "zbase": "rdq7e66b8gb1x4c8qs383tmi9uo76jdraqbfj8ic7xd1gxyhztfwgdhqhumfehc4dxbed7e5ycf4u6wm9fedfoukz9uqk471okwocw31"
# }

# Use the zbase field
```

**eclair** (See [#1499](https://github.com/ACINQ/eclair/pull/1499))
```bash

eclair-cli signmessage --msg=$(echo -n 'MyMessageToSign' | base64)
# {
#   "nodeId": "02ca7361934233f6d4defd4d792fb2ce2cd0b50c7605e6c5cd16006bcd5be2bf70",
#   "message": "aGVsbG8gd29ybGQK",
#   "signature": "1f730dce842c31b692dc041c2d0f00423d2a2a67b0c63c1a905d500f09652a5b1a036763a1603333fa589ae92d1f7963428ff170e976d0966a113f4b9f9d0efc7f"
# }

# eclair signature is in hex. Convert hex to zbase:
echo -n "${eclair_signature}" | xxd -revert -plain | zbase32-encode
```
