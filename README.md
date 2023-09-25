# ln-verifymessagejs

[![NPM version](https://img.shields.io/npm/v/ln-verifymessagejscolor=%23FFAE00&style=flat-square)](https://www.npmjs.com/package/ln-verifymessagejs)

A simple library to recover Lightning Network node ids from signed messages. No need to run a Lightning Network node. Everything is done in js. Also supports signing.

### Tested implementations:
- lnd
- core-lightning
- eclair
- LDK (react-native)

Basically, all implementations that follow the [specinatweet](https://web.archive.org/web/20191010011846/https://twitter.com/rusty_twit/status/1182102005914800128) and output zbase or hex are supported.

## Install

```bash
npm i ln-verifymessagejs
```

## Usage

### Verify message

Check if a signature and message has been signed by a specific node.

```ts
import { verifyMessage } from "ln-verifymessagejs";

const messageThatHasBeenSigned = "helloWorld"
const zbaseSignature = "ry13r8phfdyt3yukuft4m8s5tq4kgbfmpnn9a54akrar7waxjooi1h1nsp8uzsf5t6fcctupzhhte1y388d19jwobz5bwh5rybs5wrb7"
const expectedNodeId = "02fbbee488a01cc8a9b429b6c4567e0ce7a43a2778d60729d5c4c67dcb9a34a898"

const isValid = verifyMessage(zbaseSignature, messageThatHasBeenSigned, expectedNodeId);
```

- `signature: string` Signature to verify.
- `message: string` Plain text message that has been signed.
- `nodePubkey: string` Node id of the node that signed the message.
- `options` Optional arguments.
    - `options.prefix: string` Message prefix. Default is `Lightning Signed Message:`.


### Sign message

Sign a message with a private key.

```ts
import { signMessage, utils } from "ln-verifymessagejs";

const {privateKey, publicKey} = utils.generateKeyPair(); // Generate a keypair or use your own private key.

const messageToSign = "helloWorld"
const signature = await signMessage(messageToSign, privateKey.hex);
```

- `message: string` Plain text message to sign.
- `privateKey: Uint8Array | string` Private key either as bytes array or hex string.
- `options` Optional arguments.
    - `options.signatureFormat: "hex" | "zbase"` Output encoding. Default is `zbase`.
    - `options.prefix: string` Message prefix. Default is `Lightning Signed Message:`.


## Sign with a Lightning Network node

Node operators can sign messages with [Thunderhub or Ride the Lightning](https://lightningnetwork.plus/questions/46).
If a user has access to a terminal messages can be signed directly with the cli.

**lnd** [signmessage](https://lightning.engineering/api-docs/api/lnd/lightning/sign-message/index.html)
```bash

lncli signmessage --msg MyMessageToSign
# {
#     "signature": "rynmoqhhadjsttaracxgo9nhkoioi6peib8k18dekrih4hxpp36zcbgc6ntyrggc11uhjcb9prcx5py6qo16bk89i458r4n51ghggnxc"
# }
```


**core-ightning** [signmessage](https://docs.corelightning.org/reference/lightning-signmessage)
```bash
lightning-cli signmessage MyMessageToSign
# {
#    "signature": "ddd47bc1398327e98775b27cc575fce1df2464c382549eacebc7233c1cbc4b430f8ee4d654719a1bc281f51b030ba9fa8bf95032c26abfe6e56bb282a9065332",
#    "recid": "01",
#    "zbase": "rdq7e66b8gb1x4c8qs383tmi9uo76jdraqbfj8ic7xd1gxyhztfwgdhqhumfehc4dxbed7e5ycf4u6wm9fedfoukz9uqk471okwocw31"
# }

# Use the zbase field
```


**eclair** [signmessage](https://github.com/ACINQ/eclair/pull/1499)
```bash

eclair-cli signmessage --msg=$(echo -n 'MyMessageToSign' | base64)
# {
#   "nodeId": "02ca7361934233f6d4defd4d792fb2ce2cd0b50c7605e6c5cd16006bcd5be2bf70",
#   "message": "aGVsbG8gd29ybGQK",
#   "signature": "1f730dce842c31b692dc041c2d0f00423d2a2a67b0c63c1a905d500f09652a5b1a036763a1603333fa589ae92d1f7963428ff170e976d0966a113f4b9f9d0efc7f"
# }

# Use the signature field. It's hex
```

