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

  // test('show content', done => {
    // json.Content.upgradeDTCPLinks(
    //   '<p>The original HTML content.</p><p><img src="https://b-gold-cdn.xitu.io/v3/static/img/conf.78960f5.gif" /><div></div></p>',
    //   conf.accountId,
    //   (err: any, res: any) => {
    //     if (err) {
    //       return log.error(err);
    //     }
    //     console.log(res)
    //   }
    // );

    // json.Content.content(
    //   {
    //     contentId:
    //       '8b582f7335113eed21f52740d3bd0dbe5cc753b31bf4c136fb8dc6403ae0cd76',
    //   },
    //   (err, res) => {
    //     if (err) {
    //       log.error(err);
    //       return;
    //     }
    //     done();
    //   }
    // );
  // });

//   test('show image raw', done => {
//     json.Content.raw(
//       {
//         contentId:
//           '59dafa705a3b619f74dbc5220d6bba60a52de5b1c5175e48906ac20c4b11de07',
//       },
//       (err, res) => {
//         if (err) {
//           log.error(err);
//           return;
//         }
//         expect(err).toBeNull();
//         done();
//       }
//     );
// });

// describe('json', () => {
  // test('create image content', done => {
  //   json.Content.create({
  //     tag: 'image',
  //     title: 'test',
  //     creator: {
  //       account_id: conf.accountId,
  //     },
  //     abstract: 'this is a test account',
  //     language: 'en',
  //     category: 'test',
  //     content: fs.readFileSync('/Users/wangmengtao/Downloads/logoquan14782785967.png'),
  //     // content: Buffer.from([0, 1, 2])
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     // log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });
  // test('create html content', done => {
  //     json.Content.create({
  //       tag: 'article',
  //       title: '2018年最值得关注学习的25个JavaScript开源项目',
  //       creator: {
  //         account_id: conf.accountId,
  //       },
  //         abstract: '2018年最值得关注学习的25个JavaScript开源项目',
  //         language: 'zh',
  //         category: 'javascript',
  //         content: `<h1 data-v-13f76525="" class="article-title">2018年最值得关注学习的25个JavaScript开源项目</h1>`,
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
  describe('form', () => {
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
  //       // content: fs.readFileSync('/Users/wangmengtao/Documents/logo.png'),
  //       content: Buffer.from([0, 1, 2])
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
    // test('create html content', done => {
    //   form.Content.create({
    //     tag: 'article',
    //     title: '2018年最值得关注学习的25个JavaScript开源项目',
    //     creator: {
    //       account_id: conf.accountId,
    //     },
    //     abstract: '2018年最值得关注学习的25个JavaScript开源项目',
    //     language: 'zh',
    //     category: 'javascript',
    //     content: `<h1 data-v-13f76525="" class="article-title">2018年最值得关注学习的25个JavaScript开源项目</h1>`,
    //     // content: Buffer.from([0, 1, 2])
    //   }).send((err, res) => {
    //     if (err) {
    //       log.error(err);
    //       return;
    //     }
    //     // log.debug(res);
    //     // expect(res.data.id).not.toBeNull();
    //     // id = res.data.id;
    //     done();
    //   });
    // });
    test('update html content', done => {
      form.Content.update(
        'ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b',
        {
          tag: 'article',
          parent_dna:
            'a562f4d9a0480d63c456a24f7aae8f8c9f4d9a7017646e844d23585096dec15b',
          title: 'test',
          abstract: 'this is a test account',
          language: 'en',
          category: 'test',
          content: `<div>牛逼2</div>`,
          // content: Buffer.from([0, 1, 2])
        }
      ).send((err, res) => {
        if (err) {
          log.error(err);
          return;
        }
        // expect(res.data.id).not.toBeNull();
        // id = res.data.id;
        done();
      });
    });
  });
});
