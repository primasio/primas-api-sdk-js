import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';
const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe("Timeline test", () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });

  test('Get system parameters', done => {
    p.Timeline.timeline(
      {
        accountId: conf.accountId
      },
      (err, res) => {
        done();
      }
    );
  });
})
