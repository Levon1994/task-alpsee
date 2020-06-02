import { appKey } from 'configs';
import RequestStore from './requestStore';

const getToken = () => {
  const data = localStorage.getItem(`${appKey}-token`);
  return JSON.parse(data);
}

const makeUnique = (url, method) => `${url}-${method}`; // TODO:: can method allow all types?

class Fetch {

  static async get(url, signal) {
    return Fetch.request(url, 'GET', null, signal);
  }

  static async post(url, data, signal) {
    return Fetch.request(url, 'POST', data, signal);
  }

  static async put(url, data, signal) {
    return Fetch.request(url, 'PUT', data, signal);
  }

  static async request(url, method, data, signal) {

    const headers = {
      'Content-Type': 'application/json',
      'Authentication': getToken(),
    };

    const body = (method === 'POST' || method === 'PUT') ? JSON.stringify(data) : null;

    const response = await Fetch.cachableRequest(url, method, headers, body, signal);
    return await response.clone().json();
  }

  static async cachableRequest(url, method, headers, body, signal) {
    // hashing endpoint uniquely
    const hash = makeUnique(url, method);

    /** Existence in "RequestStore" will mean that same request is already has "pending" status,
     * so no need to request it twice.
     * Store request for further exploitation.
     */
    const request = RequestStore.has(hash)
      ? RequestStore.get(hash)
      : fetch(url, { method, headers, body, signal });

    RequestStore.set(hash, request);

    const response = await request;

    RequestStore.drop(hash);

    return response;
  }
}

export default Fetch;
