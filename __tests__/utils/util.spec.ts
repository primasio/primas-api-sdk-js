import { genPrivateKey, sign, sort, verify } from '../../src/utils/util';

const str = `{"account_id":"0x111af16381A9908709DdaaA9185FB21f2811C3dd","amount":"1000","created_at":1527758683,"creator":{"account_id":"NO134134","account_name":"kevin","sub_account":{"id":"Sub01","name":"movi"}},"id":"bb48c151f509a1064e574dceb95e3b39eb6a1dbd9dfefa75386dc2250fdeac80","node_address":"0xd75407ad8cabeeebfed78c4f3794208b3339fbf4","node_fee":"4","subs":[{"id":"Sub01_1","name":"movi_1"},{"id":"Sub01_2","name":"movi_2"}],"tags":["wa","ab"],"tx_hash":"aa48c151f509a1064e574dceb95e3b39eb6a1dbd9dfefa75386dc2250fdeac80","user_address":"0x251af16381A9908709DdaaA9185FB21f2811C322"}`;
const address: string = '0xa42433b1619993ba2e55db742b61ace9461336a0';
const password: string = 'wheethereum';
const keystore =
  '{"address":"a42433b1619993ba2e55db742b61ace9461336a0","crypto":{"cipher":"aes-128-ctr","ciphertext":"28729632e5a23c6d25f1674f4ca6383cdacb22dee7d61432315c4a6bad1b3826","cipherparams":{"iv":"0e71ced6c3a4307e335e1b223c4039ce"},"mac":"d2bb3f0dc1a0c823fcafb251030f61659792fb50ef77a16d12369477e75d6cbf","kdf":"pbkdf2","kdfparams":{"c":262144,"dklen":32,"prf":"hmac-sha256","salt":"d1b420a1b1cf840a7af59b9bcd1e1bb61fc10651da4076641350326bab682886"}},"id":"e418a56a-7f0e-4e3a-966c-a1aec1cd920e","version":3}';
const obj = {
  id: 1,
  account: {
    id: 1,
    account: 'xxx',
  },
  tags: ['xx', 'bb'],
  subs: [
    {
      name: 'movi_1',
      id: 'Sub01_1',
    },
    {
      name: 'movi_2',
      id: 'Sub01_2',
    },
  ],
};
let sig: string;

test('sign on string will success', () => {
  const privateKey = genPrivateKey(address, password);
  sig = sign(str, privateKey);
});

test('verify shoud success', () => {
  expect(verify(str, sig, address)).toBe(true);
});

test('sort object shoud success', () => {
  expect(sort(obj)).toEqual({
    account: { account: 'xxx', id: 1 },
    id: 1,
    subs: [
      { id: 'Sub01_1', name: 'movi_1' },
      { id: 'Sub01_2', name: 'movi_2' },
    ],
    tags: ['xx', 'bb'],
  });
});
