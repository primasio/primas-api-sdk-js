import BigNumber from 'bignumber.js';
import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';

const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];

describe('content interaction test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });

  // test('Get share metadata', done => {
  //   p.ContentInteraction.shares({
  //     shareId: "123"
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get share metadata', done => {
  //   p.ContentInteraction.groupShares({
  //     shareId: "123"
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get share reports', done => {
  //   p.ContentInteraction.reports({
  //     shareId: conf.accountId
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Report share', done => {
  //   const content = p.ContentInteraction.createReport('share_id', {
  //     src_id: '1',
  //     dest_id: '2',
  //     creator: { account_id: '3' },
  //     extra: {
  //       content: 'hello',
  //       report_type: 'lucy',
  //     },
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('Get the likes of a group share', done => {
  //   p.ContentInteraction.likes({
  //     shareId: conf.accountId
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Like a group share', done => {
  //   const content = p.ContentInteraction.createLike(conf.accountId, {
  //     src_id: '1',
  //     dest_id: '2',
  //     creator: { account_id: '3' }
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('Cancel the like of a group share', done => {
  //   const content = p.ContentInteraction.cancelLike(conf.accountId, "1234", {
  //     parent_dna: "456"
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('Get the comments of a group share', done => {
  //   p.ContentInteraction.comments({
  //     shareId: conf.accountId
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get replying comments of a comment', done => {
  //   p.ContentInteraction.replys({
  //     commentId: conf.accountId
  //   }, (err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Comment a group share', done => {
  //   const content = p.ContentInteraction.createComment(conf.accountId, {
  //     src_id: '1',
  //     dest_id: '2',
  //     creator: { account_id: '3' },
  //     extra: {
  //       content: 'hello',
  //       report_type: 'lucy',
  //     }
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  // test('Update the comment of a group share', done => {
  //   const content = p.ContentInteraction.updateComment(conf.accountId, '123', {
  //     parent_dna: "24443",
  //     creator: { account_id: '3' },
  //     extra: {
  //       content: 'hello'
  //     }
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  test('Delete the comment of a group share', done => {
    const content = p.ContentInteraction.cancelComment(conf.accountId, '123', {
      parent_dna: "24443",
      creator: { account_id: '3' }
    });
    content.send((err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      log.debug(res);
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });
  // test('create createComment', done => {
  //   const content = p.ContentInteraction.createComment('share_id', {
  //     src_id: '1',
  //     dest_id: '2',
  //     creator: { account_id: '3' },
  //     extra: {
  //       content: 'hello',
  //     },
  //   });
  //   content.send((err, res) => {
  //     if (err) {
  //       logger.error(err);
  //       return;
  //     }
  //     logger.debug(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });
});
