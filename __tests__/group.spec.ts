import BigNumber from 'bignumber.js';
import Primas = require('../src');
import { log } from '../src/utils/logger';
import config from './config';

const env: string =
  (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV) || 'development';
const conf = config[env];
describe('group test', () => {
  const p: any = new Primas({
    address: conf.address,
    passphrase: conf.passphrase,
    node: conf.node,
  });

  // test('show group metadata', done => {
  //   p.Group.group(
  //     {
  //       groupId:
  //         'cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b',
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("create group", done => {
  //   p.Group.create({
  //     title: "test group",
  //     creator: {
  //       account_id: conf.accountId
  //     },
  //     avatar: "4df34f9cde24b73663d8842131b6fbcf8518e7cbb5c83f0221d08581fd715c84",
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
  //       groupId: "cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("join", done => {
  //   p.Group.join("782c9e05945f3a81a0ce8fe0cc83e14edb89837b2cdeb7ff86c70e34cc4d89fc", {
  //     src_id: conf.accountId,
  //     dest_id: "782c9e05945f3a81a0ce8fe0cc83e14edb89837b2cdeb7ff86c70e34cc4d89fc",
  //     creator: {
  //       account_id: conf.accountId
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
  //   p.Group.approveOrDecline("cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b", "fc52045571d1bc356cbbb5d2e736bde67f0d4765edcefcdef88c507237b20e0a", {
  //     parent_dna: "2a47ca8de8229858c5d26cf92e8386a55cb818fbd771c0f92b19e8b221029d55",
  //     creator: {
  //       account_id: conf.accountId
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
  //   p.Group.quit("27f0f3af543d12b418bc1737f08b97980020cd4e2ca7b2b073d366e5ac3bfb83", "c4da3e0751bdb99e9f4537b7cfab5dcd27ec10dcc53ccea19cf52992bb8cd8e4", {
  //     parent_dna: "9df8d861eef82fe2c82cc14c2e579b00129afdf88b30485c047cadcf48f10f4b",
  //     creator: {
  //       account_id: conf.accountId
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
  //       groupId: "cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b",
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  // test("Add group member whitelist", done => {
  //   p.Group.createWhitelist("cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b", {
  //     src_id: 'd392e656a2759f0beb1fd2d56b2c710393e9c742b50001cd246a5dd12507d246',
  //     dest_id: "cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b",
  //     creator: {
  //       account_id: conf.accountId
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
  //   p.Group.approveOrDeclineWhitelist("cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b", "9c181784b9cbc8c006d7dde63322f6d841786362c2525b8d8d7b0bd684144211", {
  //     parent_dna: "95118230e36bb88c66b40eb8d2817ddaa03af69a2bc13e6852be852a99f9c72d",
  //     creator: {
  //       account_id: conf.accountId
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
  //   p.Group.quitWhitelist("cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b", "9c181784b9cbc8c006d7dde63322f6d841786362c2525b8d8d7b0bd684144211", {
  //     parent_dna: "95118230e36bb88c66b40eb8d2817ddaa03af69a2bc13e6852be852a99f9c72d",
  //     creator: {
  //       account_id: conf.accountId
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
  //       groupId: "cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b",
  //       qs: {
  //         application_status: "pending"
  //       }
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });

  test("Share to a group", done => {
    p.Group.createShare("a0d145221a31b3c9604dabad76332442450248e5f955c5d50e2db4c44473bb8d", {
      src_id: "2d671ada1394a6705d745f65f95df7bcc837a779aa9676df620f0ee49fba3ab4",
      dest_id: "a0d145221a31b3c9604dabad76332442450248e5f955c5d50e2db4c44473bb8d",
      hp: 10,
      creator: {
        account_id: conf.accountId
      },
      // extra: {
      //   share_id: 'e82f871fc127acd19c169f08d7135fe6dc7bff283edc488196dcca30259ce2a5'
      // }
    }).send((err, res) => {
      if (err) {
        log.error(err);
        return;
      }
      log.debug(res);
      done();
    })
  })

  // test("Approve or decline share application", done => {
  //   p.Group.approveOrDeclineShare("311c2236cd9035ba031038841dbf8d3f39913331c9bb1adc3636ed11644b3af4", {
  //     parent_dna: "5b0172c36ca7ca73edcc6d8cd24d7e00627d2fe459b34b81a217d503a96609ca",
  //     creator: {
  //       account_id: conf.accountId
  //     },
  //     extra: {
  //       application_status: "declined"
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
  //   p.Group.cancelShare("cd5f53ab831dcecafb32ef9ea748aa74afce6a96d681ddc34e4ec22b6305338b", {
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

  // test('Get group avatar raw image', done => {
  //   p.Group.avatarImg(
  //     {
  //       groupId:
  //         '0e558892155f550f4fc375512dd9f1eaf01dee6b2ab2e3644ddf9ddce9aed530',
  //     },
  //     (err, res) => {
  //       expect(err).toBeNull();
  //       done();
  //     }
  //   );
  // });
});
