import BigNumber from 'bignumber.js';
import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';

const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];
const ks = `{"version":3,"id":"e1a1909a-7a38-44aa-af04-61cd3a342008","address":"d75407ad8cabeeebfed78c4f3794208b3339fbf4","Crypto":{"ciphertext":"bcf8d3037432f731d3dbb0fde1b32be47faa202936c303ece7f53890a79f49d2","cipherparams":{"iv":"e28edaeff90032f24481c6117e593e01"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7d7c824367d7f6607128c721d6e1729abf706a3165384bbfc2aae80510ec0ce2","n":1024,"r":8,"p":1},"mac":"52f98caaa4959448ec612e4314146b6a2d5022d5394b77e31f5a79780079c22f"}}`;
const address =
  '32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3';
const groupId =
  '0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530';
const groupDna =
  '95c2887cfb181713fcdeffb3941bbbaa27242818ecf537f05a857c09976e4703';
describe('group test', () => {
  const p: any = new Primas({
    address,
    passphrase: 'Test123:::',
    node: conf.node,
    keystore: ks,
  });

  test('show group metadata', done => {
    p.Group.group(
      {
        groupId,
      },
      (err, res) => {
        expect(err).toBeNull();
        expect(res.data.id).toBe(groupId);
        done();
      }
    );
  });

  // test("create group", done => {
  //   p.Group.create({
  //     title: "test group",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //     avatar: "55d0adc13c57f679d36947f793ff3f0497815a8b701a86f5d784bc4f6c90ac04",
  //     abstract: "nice job",
  //     language: "en",
  //     category: "test,nice,job",
  //     extra: {
  //       allow_join: "all",
  //       allow_post: "all"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("update group", done => {
  //   p.Group.update("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     title: "test update group",
  //     parent_dna: "95c2887cfb181713fcdeffb3941bbbaa27242818ecf537f05a857c09976e4703",
  //     avatar: "55d0adc13c57f679d36947f793ff3f0497815a8b701a86f5d784bc4f6c90ac04",
  //     abstract: "nice job2",
  //     language: "en",
  //     category: "test,nice,job",
  //     extra: {
  //       allow_join: "all",
  //       allow_post: "all"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("delete group", done => {
  //   p.Group.dismiss("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     parent_dna: "95c2887cfb181713fcdeffb3941bbbaa27242818ecf537f05a857c09976e4703"
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('show group members', done => {
  //   p.Group.members(
  //     {
  //       groupId: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("join", done => {
  //   p.Group.join("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     src_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3",
  //     dest_id: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Approve or decline member application", done => {
  //   p.Group.approveOrDecline("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3", {
  //     parent_dna: "3a9f1cb8b950a85362513741db5af6587476f473b8c94f96c5f26b7aefa46645",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //     extra: {
  //       application_status: "approved"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Quit group or kick member out", done => {
  //   p.Group.quit("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3", {
  //     parent_dna: "3a9f1cb8b950a85362513741db5af6587476f473b8c94f96c5f26b7aefa46645",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get group member whitelist', done => {
  //   p.Group.whitelist(
  //     {
  //       groupId: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("Add group member whitelist", done => {
  //   p.Group.createWhitelist("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     src_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3",
  //     dest_id: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Approve or decline group member whitelist", done => {
  //   p.Group.approveOrDeclineWhitelist("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", "123", {
  //     parent_dna: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //     extra: {
  //       application_status: "approved"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Quit group member whitelist", done => {
  //   p.Group.quitWhitelist("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3", {
  //     parent_dna: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get group shares', done => {
  //   p.Group.shares(
  //     {
  //       groupId: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("Share to a group", done => {
  //   p.Group.createShare("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     src_id: "ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b",
  //     dest_id: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Approve or decline share application", done => {
  //   p.Group.approveOrDeclineShare("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     parent_dna: "ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     },
  //     extra: {
  //       application_status: "approved"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test("Delete group share", done => {
  //   p.Group.cancelShare("0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530", {
  //     parent_dna: "ba6f8c9214be28655b52a07e96164262bb90d52b070355702b88fa7e336f5a3b",
  //     creator: {
  //       account_id: "32fc4139f7d0347ca9ea70d30caad45a5d90fc23aaefacedf6bff2746e2073f3"
  //     }
  //   }).send((err, res) => {
  //     if (err) {
  //       log.error(err);
  //       return;
  //     }
  //     log.debug(res);
  //     done();
  //   })
  // })

  // test('Get group avatar metadata', done => {
  //   p.Group.avatar(
  //     {
  //       groupId: "0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  test('Get group avatar raw image', done => {
    p.Group.avatarImg(
      {
        groupId:
          '0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530',
      },
      (err, res) => {
        expect(err).toBeNull();
        done();
      }
    );
  });
});
