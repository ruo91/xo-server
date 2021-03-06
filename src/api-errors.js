import assign from 'lodash.assign'
import {JsonRpcError} from 'json-rpc/errors'

// ===================================================================

// Export standard JSON-RPC errors.
export * from 'json-rpc/errors'

// -------------------------------------------------------------------

export class NotImplemented extends JsonRpcError {
  constructor () {
    super('not implemented', 0)
  }
}

// -------------------------------------------------------------------

export class NoSuchObject extends JsonRpcError {
  constructor () {
    super('no such object', 1)
  }
}

// -------------------------------------------------------------------

export class Unauthorized extends JsonRpcError {
  constructor () {
    super('not authenticated or not enough permissions', 2)
  }
}

// -------------------------------------------------------------------

export class InvalidCredential extends JsonRpcError {
  constructor () {
    super('invalid credential', 3)
  }
}

// -------------------------------------------------------------------

export class AlreadyAuthenticated extends JsonRpcError {
  constructor () {
    super('already authenticated', 4)
  }
}
