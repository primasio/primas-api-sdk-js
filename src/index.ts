import * as request from 'request';
import { default as config, IConfig } from './config';
import Account from './main/Account';
import Token from './main/Token';
import { genPrivateKey } from './utils/util';

export default class Primas {
  public Account: Account;
  public Token: Token;
  constructor(conf: IConfig) {
    const myConf: IConfig = { ...config, ...conf };
    const baseRequest = request.defaults({
      baseUrl: myConf.baseUrl,
      json: true,
    });
    const privateKey = genPrivateKey(myConf.address, myConf.passphrase);
    const options = {
      request: baseRequest,
      privateKey,
      address: myConf.address,
    };
    this.Account = new Account(options);
    this.Token = new Token(options);
  }
}

import BigNumber = require('bignumber.js');
