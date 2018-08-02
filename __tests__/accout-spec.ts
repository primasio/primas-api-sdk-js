// import Primas from '../src';
// let p: Primas;
// beforeAll(() => {
//   const address: string = '0xa42433b1619993ba2e55db742b61ace9461336a0';
//   const password: string = 'wheethereum';
//   p = new Primas({
//     address,
//     passphrase: password,
//   });
// });

// describe('account test', () => {
//   let id: string =
//     '841208135430c77add1669e2e126161d64d9c79f0b5a3ce120c0ca57256db00f';
//   const dna: string =
//     '935dc498e922b92e905c2f9dbe0927e3199e3b37223211855946ae6f00574288';
//   // test('create account', done => {
//   //   p.Account.create(
//   //     {
//   //       version: '1.0',
//   //       type: 'object',
//   //       tag: 'account',
//   //       name: 'node-test',
//   //       abstract: 'this is a test account',
//   //       status: 'created',
//   //       created: +(new Date().getTime() / 1000).toFixed(0),
//   //     },
//   //     (err, res) => {
//   //       if (err) {
//   //         console.log(err);
//   //         return;
//   //       }
//   //       console.log(res);
//   //       expect(res.data.id).not.toBeNull();
//   //       id = res.data.id;
//   //       done();
//   //     }
//   //   );
//   // });

//   test('show account', done => {
//     p.Account.metadata(
//       {
//         accountId: id,
//       },
//       (err, res) => {
//         expect(err).toBeNull();
//         expect(res.data.id).toBe(id);
//         expect(res.data.title).toBe('node-test');
//         done();
//       }
//     );
//   });

//   test('update account', done => {
//     p.Account.update(
//       id,
//       {
//         version: '1.0',
//         type: 'object',
//         tag: 'account',
//         parent_dna: dna,
//         name: 'node-test2',
//         abstract: 'this is a test account update',
//         status: 'updated',
//         updated: +(new Date().getTime() / 1000).toFixed(0),
//       },
//       (err, res) => {
//         if (err) {
//           return;
//         }
//         expect(res.data.id).not.toBeNull();
//         id = res.data.id;
//         done();
//       }
//     );
//   });
// });
