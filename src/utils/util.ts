import {
  addHexPrefix,
  bufferToHex,
  ecrecover,
  ecsign,
  fromRpcSig,
  keccak256,
  pubToAddress,
  toRpcSig,
  unpad,
} from 'ethereumjs-util';
import * as fs from 'fs';
import keythereum = require('keythereum');

/**
 *
 * @param address
 * @param password
 * @param callback
 */
export function genPrivateKey(address: string, password: string): Buffer {
  const dir = process.cwd();
  try {
    const files = fs.readdirSync(dir);
    if (files.length === 0) {
      throw new Error('you must have at least one keystore file!');
    }
    const keyObject = keythereum.importFromFile(address, dir);
    return keythereum.recover(password, keyObject);
  } catch (e) {
    throw e;
  }
}

export function sign(serializedJsonString: string, privateKey?: Buffer) {
  const signed: Buffer = keccak256(serializedJsonString);
  const sig = ecsign(signed, privateKey);
  return unpad(toRpcSig(sig.v, sig.r, sig.s));
}

export function verify(
  serializedJsonString: string,
  signature: string,
  address: string
): boolean {
  const signed: Buffer = keccak256(serializedJsonString);
  const sig = fromRpcSig(addHexPrefix(signature));
  const pk = ecrecover(signed, sig.v, sig.r, sig.s);
  const add = pubToAddress(pk);
  return bufferToHex(add) === address;
}

function isObject(o: any) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

/**
 * Returns true if object is BN, otherwise false
 *
 * @method isBN
 * @param {Object} object
 * @return {Boolean}
 */
const isBN = (object: any) => {
  return object && object.constructor && object.constructor.name === 'BN';
};

/**
 * Returns true if object is BigNumber, otherwise false
 *
 * @method isBigNumber
 * @param {Object} object
 * @return {Boolean}
 */
const isBigNumber = (object: any) => {
  return (
    object && object.constructor && object.constructor.name === 'BigNumber'
  );
};

/**
 * sort object
 * @param obj the object you need to sort
 */
export function sort(obj: any) {
  const keyArr: string[] = Object.keys(obj);
  if (keyArr.length > 0) {
    const v: any = {};
    const sorted = keyArr.sort();
    sorted.forEach(e => {
      let o: any = obj[e];
      if (isObject(o)) {
        o = sort(o);
      }
      if (Array.isArray(o)) {
        o = o.map((ele: any) => {
          if (isObject(ele)) {
            return sort(ele);
          }
          return ele;
        });
      }
      v[e] = o;
    });
    return v;
  }
  return {};
}

export const toJSON = (obj: any) => {
  let ret = '{';
  function recur(o: any) {
    for (const k in o) {
      if (o.hasOwnProperty(k)) {
        ret += `"${k}":`;
        if (Array.isArray(o[k])) {
          ret += '[';
          o[k].forEach((e: any) => {
            recur(e);
          });
          ret = ret.replace(/,$/, '],');
        } else if (
          typeof o[k] === 'object' &&
          !isBN(o[k]) &&
          !isBigNumber(o[k])
        ) {
          ret += '{';
          recur(o[k]);
          ret = ret.replace(/,$/, '},');
        } else if (typeof o[k] === 'string') {
          ret += '"' + o[k].toString() + '",';
        } else {
          ret += o[k].toString() + ',';
        }
      }
    }
  }
  recur(obj);
  ret = ret.replace(/,$/, '}');
  return ret;
};
