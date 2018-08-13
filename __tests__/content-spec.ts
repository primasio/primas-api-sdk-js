import * as fs from 'fs';
import Primas = require('../src');
import { sign } from '../src/utils/util';
let p: any;
beforeAll(() => {
  const address: string = '0xa42433b1619993ba2e55db742b61ace9461336a0';
  const password: string = 'wheethereum';
  p = new Primas({
    address,
    node: 'http://localhost:9002/api',
    passphrase: password,
    json: false,
  });
});

describe('content test', () => {
  const id: string =
    '841208135430c77add1669e2e126161d64d9c79f0b5a3ce120c0ca57256db00f';
  const dna: string =
    '935dc498e922b92e905c2f9dbe0927e3199e3b37223211855946ae6f00574288';

  // test('show account', done => {
  //   p.Account.metadata(
  //     {
  //       accountId: id,
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       expect(res.data.id).toBe(id);
  //       expect(res.data.title).toBe('node-test');
  //       done();
  //     }
  //   );
  // });
  test('update content', done => {
    p.Content.create({
      tag: "image",
      title: "test",
      creator: {
        account_id: id,
        test: {
          hellp: 11
        }
      },
      abstract: 'this is a test account',
      language: "en",
      category: ["test", {id: 1}],
      content: fs.readFileSync("/Users/wangmengtao/Documents/logo.png"),
      license: "none"
    }).send((err, res) => {
      if (err) {
        return;
      }
      console.log(res);
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });

  // test('create content', done => {
  //   p.Content.create({
  //     tag: "article",
  //     title: "test",
  //     creator: {
  //       account_id: id
  //     },
  //     abstract: 'this is a test account',
  //     language: "en",
  //     category: ["test"],
  //     content: "hello world",
  //     license: "none"
  //   }).send((err, res) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('sign outside', done => {
  //   const content = p.Content.create({
  //     tag: 'article',
  //     title: 'test',
  //     creator: {
  //       account_id: id,
  //     },
  //     abstract: 'this is a test account',
  //     language: 'en',
  //     category: ['test'],
  //     content: 'hello world',
  //     license: 'none',
  //   });
  //   content.sign(sign(content.beforeSign()));
  // });
});
