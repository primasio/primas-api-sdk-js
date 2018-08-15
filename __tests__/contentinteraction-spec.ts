import * as fs from 'fs';
import Primas = require('../src');
import { createLogger } from '../src/utils/logger';
const logger = createLogger('content-interaction-test');
import { sign } from '../src/utils/util';
let p: any;
beforeAll(() => {
  const address: string = '0xa42433b1619993ba2e55db742b61ace9461336a0';
  const password: string = 'wheethereum';
  p = new Primas({
    address,
    passphrase: password,
    json: false,
  });
});

describe('content test', () => {
  const id: string =
    '841208135430c77add1669e2e126161d64d9c79f0b5a3ce120c0ca57256db00f';
  const dna: string =
    '935dc498e922b92e905c2f9dbe0927e3199e3b37223211855946ae6f00574288';

  test('create report', done => {
    const content = p.ContentInteraction.createReport('share_id', {
      src_id: '1',
      dest_id: '2',
      creator: { account_id: '3' },
      extra: {
        content: 'hello',
        report_type: 'lucy',
      },
    });
    content.send((err, res) => {
      if (err) {
        logger.error(err);
        return;
      }
      logger.debug(res);
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });

  test('create createComment', done => {
    const content = p.ContentInteraction.createComment('share_id', {
      src_id: '1',
      dest_id: '2',
      creator: { account_id: '3' },
      extra: {
        content: 'hello',
      },
    });
    content.send((err, res) => {
      if (err) {
        logger.error(err);
        return;
      }
      logger.debug(res);
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });
});
