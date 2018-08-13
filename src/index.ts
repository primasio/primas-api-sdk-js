import defaultsDeep = require('lodash/defaultsDeep');
import * as request from 'request';
import { API_VERSION, config } from './config';
import * as Main from './main';
import { IConfig } from './main/Base';
import { genPrivateKey, pathResolve } from './utils/util';
if (process.env.NODE_ENV === 'development') {
  require('request-debug')(request);
}
class Primas {
  constructor(conf: {
    node?: string;
    address: string;
    passphrase?: string;
    keystorePath?: string;
    keystore?: string;
    json?: boolean;
  }) {
    let options;
    let baseRequest;
    const myConf: IConfig = defaultsDeep({}, conf, config);
    if (!myConf.address) {
      throw new Error('address is required');
    }
    baseRequest = request.defaults({
      baseUrl: pathResolve(myConf.node, API_VERSION),
      json: myConf.json,
    });
    if (myConf.passphrase) {
      const privateKey = genPrivateKey(
        myConf.address,
        myConf.passphrase,
        myConf.keystorePath,
        myConf.keystore
      );
      options = {
        privateKey,
        address: myConf.address,
      };
    }

    for (const k in Main) {
      if (Main.hasOwnProperty(k)) {
        (this as any)[k] = new (Main as any)[k](
          baseRequest,
          options,
          myConf.json
        );
      }
    }
  }
}

export = Primas;
