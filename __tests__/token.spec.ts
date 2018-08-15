import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';

const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe('token test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });
  // test('show account tokens', done => {
  //   p.Token.tokens(
  //     {
  //       accountId: conf.accountId,
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test('show account incentives', done => {
  //   p.Token.incentives(
  //     {
  //       accountId: conf.accountId,
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test('show account incentives statics', done => {
  //   p.Token.incentiveStats(
  //     {
  //       accountId: conf.accountId,
  //     },
  //     (err, res) => {
  //       log.info(res)
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  test('show account incentives withdrawal', done => {
    p.Token.incentiveWithdrawals(
      {
        accountId: conf.accountId,
      },
      (err, res) => {
        log.info(res)
        expect(err).toBeNull();
        done();
      }
    );
  });

  // test('withdraw incentives', done => {
  //   p.Token.createIncentiveWithdrawal({
  //     accountId: conf.accountId
  //   }).send({
  //     node_id: '1',
  //     amount:
  //   })
  // })
});
