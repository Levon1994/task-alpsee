/** RequestStore is providing a simple
 * API for operating over a stack(type: Map).
 * The main reason for having this pattern is to manage
 * requesting process.
 */

class RequestStore {
  static stack = new Map();

  static has(hash) {
    return RequestStore.stack.has(hash);
  }

  static set(hash, request) {
    if (!RequestStore.has(hash)) {
      RequestStore.stack.set(hash, request);
    }
  }

  static get(hash) {
    if (RequestStore.has(hash)) {
      return RequestStore.stack.get(hash);
    }
  }

  static drop(hash) {
    if (RequestStore.has(hash)) {
      RequestStore.stack.delete(hash);
    }
  }
};

export default RequestStore;
