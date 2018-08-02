import * as request from 'request';
import config from './config';
import { Account } from './main/Account';
import { IConfig } from './main/Base';
import { Token } from './main/Token';
import { genPrivateKey } from './utils/util';

export = class Primas {
  public Account: Account;
  // public Token: Token;
  constructor(conf?: IConfig) {
    let options;
    let baseRequest = request.defaults({
      baseUrl: config.baseUrl,
      json: true,
    });
    if (conf) {
      const myConf: IConfig = { ...config, ...conf };
      baseRequest = request.defaults({
        baseUrl: myConf.baseUrl,
        json: true,
      });
      const privateKey = genPrivateKey(myConf.address, myConf.passphrase);
      options = {
        privateKey,
        address: myConf.address,
      };
    }

    this.Account = new Account(baseRequest, options);
    // this.Token = new Token(baseRequest, options);
  }
};
