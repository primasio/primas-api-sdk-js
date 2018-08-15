import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';
const env: string = (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe('account test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });
  test('show account metadata', done => {
    p.Account.metadata(
      {
        accountId: conf.accountId,
      },
      (err, res) => {
        expect(err).toBeNull();
        expect(res.data.id).toBe(conf.accountId);
        expect(res.data.title).toBe('node-test');
        done();
      }
    );
  });

  // todo
  test('update account', done => {
    p.Account.update(conf.accountId, {
      parent_dna: conf.accountDna,
      name: 'node-test2',
      abstract: 'this is a test account update',
    }).send((err, res) => {
      if (err) {
        return;
      }
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });

  test('create account', done => {
    p.Account.create({
      name: 'node-test',
      abstract: 'this is a test account',
    }).send((err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      expect(res.result_code).toBe(500);
      expect(res.result_msg).toBe('user already exist ');
      done();
    });
  });

  test('account credits', done => {
    p.Account.credits({
      accountId: conf.accountId,
    }, (err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      expect(res.result_code).toBe(0);
      expect(res.data.user_account_id).toBe(conf.accountId);
      done();
    });
  });

  test('account contents', done => {
    p.Account.contents({
      accountId: conf.accountId,
      qs: {
        page: 0,
        page_size: 10
      }
    }, (err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      expect(res.result_code).toBe(0);
      expect(res.data.user_account_id).toBe(conf.accountId);
      done();
    });
  });

  test('account groups', done => {
    p.Account.groups({
      accountId: conf.accountId,
      qs: {
        page: 0,
        page_size: 10
      }
    }, (err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      expect(res.result_code).toBe(0);
      done();
    });
  });

  test('account shares', done => {
    p.Account.shares({
      accountId: conf.accountId,
      qs: {
        page: 0,
        page_size: 10
      }
    }, (err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      log.debug(res);
      expect(res.result_code).toBe(0);
      done();
    });
  });

});
