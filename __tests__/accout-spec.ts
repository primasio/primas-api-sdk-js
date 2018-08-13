import Primas = require('../src');
let p: any;
beforeAll(() => {
  const address: string = '0xa42433b1619993ba2e55db742b61ace9461336a0';
  const password: string = 'wheethereum';
  p = new Primas({
    address,
    passphrase: password,
  });
});

describe('account test', () => {
  const id: string =
    'd392e656a2759f0beb1fd2d56b2c710393e9c742b50001cd246a5dd12507d246';
  const dna: string =
    '8b36db8da8417a6920d75758bc5936f485e52c34558977c19af239b1e46a4e31';

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

  // test('update account', done => {
  //   p.Account.update(id, {
  //     parent_dna: dna,
  //     name: 'node-test2',
  //     abstract: 'this is a test account update',
  //   }).send((err, res) => {
  //     if (err) {
  //       return;
  //     }
  //     console.log(res);
  //     // expect(res.data.id).not.toBeNull();
  //     // id = res.data.id;
  //     done();
  //   });
  // });

  test('create account', done => {
    p.Account.create({
      name: 'node-test',
      abstract: 'this is a test account',
    }).send((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(res);
      // expect(res.data.id).not.toBeNull();
      // id = res.data.id;
      done();
    });
  });
});
