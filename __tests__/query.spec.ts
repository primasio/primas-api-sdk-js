import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';
const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe('Query test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });

  test('Query all', done => {
    p.Query.query({}, (err, res) => {
      done();
    });
  });

  test('Find reproductions using URL', done => {
    p.Query.reproductions(
      {
        qs: {
          url: encodeURI('http://e.c60block.com/images/bip201803252337.jpg'),
        },
      },
      (err, res) => {
        done();
      }
    );
  });
});
