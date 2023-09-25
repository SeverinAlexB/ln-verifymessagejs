export {deriveNodeId, deriveNodeIdZbase, deriveNodeIdHex, verifyMessage} from './verify';
export {signMessage} from './sign'
export * as utils from './utils'

/**
 * Algorithm according to https://twitter.com/rusty_twit/status/1182102005914800128
 * zbase32(SigRec(SHA256(SHA256("Lightning Signed Message:" + msg))))
 */
