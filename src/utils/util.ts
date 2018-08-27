/*
 * Copyright 2018 Primas Lab Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
export function genPrivateKey(
  address: string,
  password: string,
  keystorePath?: string,
  keystore?: string
): Buffer {
  let dir;
  if (keystore) {
    if (typeof keystore === 'string') {
      keystore = JSON.parse(keystore);
    }
    return keythereum.recover(password, keystore);
  }
  dir = keystorePath ? keystorePath : process.cwd();
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

// BigNumber.config({ EXPONENTIAL_AT: [-1e9, 1e9] });
// export const toJSON = (obj: any) => {
//   let ret = '{';
//   function recur(o: any) {
//     for (const k in o) {
//       if (o.hasOwnProperty(k)) {
//         ret += `"${k}":`;
//         if (Array.isArray(o[k])) {
//           ret += '[';
//           o[k].forEach((e: any) => {
//             recur(e);
//           });
//           ret = ret.replace(/,$/, '],');
//         } else if (
//           typeof o[k] === 'object' &&
//           !isBN(o[k]) &&
//           !isBigNumber(o[k])
//         ) {
//           ret += '{';
//           recur(o[k]);
//           ret = ret.replace(/,$/, '},');
//         } else if (typeof o[k] === 'string') {
//           ret += '"' + o[k].toString() + '",';
//         } else {
//           ret += o[k].toString() + ',';
//         }
//       }
//     }
//   }
//   recur(obj);
//   ret = ret.replace(/,$/, '}');
//   return ret;
// };

export function pathResolve(...args: string[]) {
  let prefix = '';
  let base = '';
  const p1 = args[0].match(/(.*:\/\/)(.*)/);
  if (p1) {
    prefix = p1[1];
    base = p1[2];
  }
  args[0] = base;
  let all = args.join('/');
  all = all.replace(/\/\//, '/');
  while (/\/\w*\/\.\./.test(all)) {
    all = all.replace(/\/\w*\/\.\./, '');
  }
  all = all.replace(/\/\./g, '');
  return prefix + all;
}
