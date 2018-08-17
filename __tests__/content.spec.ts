import fs = require('fs');
import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';
const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];
import { sign } from '../src/utils/util';

describe('content test', () => {
  const json: any = new Primas({
    node: conf.node,
    address: conf.address,
    passphrase: conf.passphrase,
  });

  const form: any = new Primas({
    node: conf.node,
    address: conf.address,
    passphrase: conf.passphrase,
    json: false,
  });

  test('show content', () => {
    json.Content.upgradeDTCPLinks(
      '<p>The original HTML content.</p><p><img src="http://e.c60block.com/images/bip201803252337.jpg" /><div></div><img src="http://e.c60block.com/images/bip201803252337.jpg" /><img src="http://e.c60block.com/images/bip2018032523372.jpg" /></p>',
      (err: any, res: any) => {
        if (err) {
          return log.error(err);
        }
        log.info(res);
      }
    );

    // json.Content.content(
    //   {
    //     contentId:
    //       'ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b',
    //   },
    //   (err, res) => {
    //     if (err) {
    //       log.error(err);
    //       return;
    //     }
    //     expect(res.result_code).toBe(0);
    //     expect(res.data.length).toBeGreaterThan(0);
    //     done();
    //   }
    // );
  });

  // test('show image raw', done => {
  //   json.Content.raw(
  //     {
  //       contentId:
  //         '55d0adc13c57f679d36947f793ff3f0497815a8b701a86f5d784bc4f6c90ac04',
  //     },
  //     (err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // describe('json', () => {
  //   test('create image content', done => {
  //     json.Content.create({
  //       tag: 'image',
  //       title: 'test',
  //       creator: {
  //         account_id: conf.accountId,
  //       },
  //       abstract: 'this is a test account',
  //       language: 'en',
  //       category: 'test',
  //       content: fs.readFileSync('/Users/wangmengtao/Documents/logo.png'),
  //       // content: Buffer.from([0, 1, 2])
  //     }).send((err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       // log.debug(res);
  //       // expect(res.data.id).not.toBeNull();
  //       // id = res.data.id;
  //       done();
  //     });
  //   });

  //   test('create html content', done => {
  //     json.Content.create({
  //       tag: 'article',
  //       title: 'test',
  //       creator: {
  //         account_id: conf.accountId,
  //       },
  //       abstract: 'this is a test account',
  //       language: 'en',
  //       category: 'test',
  //       content: `<div>牛逼</div>`,
  //       // content: Buffer.from([0, 1, 2])
  //     }).send((err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       // log.debug(res);
  //       // expect(res.data.id).not.toBeNull();
  //       // id = res.data.id;
  //       done();
  //     });
  //   });
  // });

  // describe('form', () => {
  //   test('create content', done => {
  //     form.Content.create({
  //       tag: 'image',
  //       title: 'test',
  //       creator: {
  //         account_id: conf.accountId,
  //       },
  //       abstract: 'this is a test account',
  //       language: 'en',
  //       category: 'test',
  //       content: fs.readFileSync('/Users/wangmengtao/Documents/logo.png'),
  //       // content: Buffer.from([0, 1, 2])
  //     }).send((err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       // log.debug(res);
  //       // expect(res.data.id).not.toBeNull();
  //       // id = res.data.id;
  //       done();
  //     });
  //   });

  //   test('create html content', done => {
  //     form.Content.create({
  //       tag: 'article',
  //       title: 'test',
  //       creator: {
  //         account_id: conf.accountId,
  //       },
  //       abstract: 'this is a test account',
  //       language: 'en',
  //       category: 'test',
  //       content: `<div>牛逼</div>`,
  //       // content: Buffer.from([0, 1, 2])
  //     }).send((err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       // log.debug(res);
  //       // expect(res.data.id).not.toBeNull();
  //       // id = res.data.id;
  //       done();
  //     });
  //   });

  //   test('update html content', done => {
  //     form.Content.update(
  //       'ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b',
  //       {
  //         tag: 'article',
  //         parent_dna:
  //           'a562f4d9a0480d63c456a24f7aae8f8c9f4d9a7017646e844d23585096dec15b',
  //         title: 'test',
  //         abstract: 'this is a test account',
  //         language: 'en',
  //         category: 'test',
  //         content: `<div>牛逼2</div>`,
  //         // content: Buffer.from([0, 1, 2])
  //       }
  //     ).send((err, res) => {
  //       if (err) {
  //         log.error(err);
  //         return;
  //       }
  //       log.debug(res);
  //       // expect(res.data.id).not.toBeNull();
  //       // id = res.data.id;
  //       done();
  //     });
  //   });
  // });
});
