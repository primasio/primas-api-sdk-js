import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';
const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe('account test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });
  // test('show account address metadata', done => {
  //   p.Account.addressMetadata(conf.address, (err, res) => {
  //     expect(err).toBeNull();
  //     expect(res.data.id).toBe(conf.accountId);
  //     expect(res.data.title).toBe('node-test');
  //     done();
  //   });
  // });

  // test('show account metadata', done => {
  //   p.Account.metadata(
  //     {
  //       accountId: conf.accountId,
  //       // subAccountId: '1'
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       expect(res.data.id).toBe(conf.accountId);
  //       expect(res.data.title).toBe('node-test');
  //       done();
  //     }
  //   );
  // });

  // // todo
  // test('update account', done => {
  //   p.Account.update(conf.accountId, {
  //     parent_dna: conf.accountDna,
  //     name: 'node-test2',
  //     abstract: 'this is a test account update',
  //   }).send((err, res) => {
  //     if (err) {
  //       return;
  //     }
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('create account', done => {
  //   p.Account.create({
  //     name: 'node-test',
  //     abstract: 'this is a test account',
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     expect(res.result_code.isEqualTo(500)).toBe(true);
  //     expect(res.result_msg).toBe('user already exist ');
  //     done();
  //   });
  // });

  // test('create sub account', done => {
  //   p.Account.create({
  //     name: 'node-test-sub1',
  //     abstract: 'this is a test sub account',
  //     creator: {
  //       account_id: "d392e656a2759f0beb1fd2d56b2c710393e9c742b50001cd246a5dd12507d246",
  //       sub_account_id: "1"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     expect(res.result_code.isEqualTo(500)).toBe(true);
  //     expect(res.result_msg).toBe('user already exist ');
  //     done();
  //   });
  // });

  // test('account credits', done => {
  //   p.Account.credits(
  //     {
  //       accountId: conf.accountId,
  //     },
  //     (err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       expect(res.result_code.isEqualTo(0)).toBe(true);
  //       expect(res.data.user_account_id).toBe(conf.accountId);
  //       done();
  //     }
  //   );
  // });

  // test('account contents', done => {
  //   p.Account.contents(
  //     {
  //       accountId: conf.accountId,
  //       qs: {
  //         page: 0,
  //         page_size: 10,
  //       },
  //     },
  //     (err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       expect(res.result_code.isEqualTo(0)).toBe(true);
  //       done();
  //     }
  //   );
  // });

  // test('account groups', done => {
  //   p.Account.groups(
  //     {
  //       accountId: conf.accountId,
  //       qs: {
  //         page: 0,
  //         page_size: 10,
  //       },
  //     },
  //     (err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       expect(res.result_code.isEqualTo(0)).toBe(true);
  //       done();
  //     }
  //   );
  // });

  // test('account shares', done => {
  //   p.Account.shares(
  //     {
  //       accountId: conf.accountId,
  //       qs: {
  //         page: 0,
  //         page_size: 10,
  //       },
  //     },
  //     (err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       expect(res.result_code.isEqualTo(0)).toBe(true);
  //       done();
  //     }
  //   );
  // });
});
