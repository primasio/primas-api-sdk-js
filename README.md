# Primas-nodejs-sdk

Primas sdk for Node env

# Install

``` bash
  npm install primas-sdk-nodejs --save
```

# Compatibility

Node.js >= 8.0.0 required.

# Prerequisite

You should have keystore in your workspace. As an alternative, you can provide the keystore option in the constructor config.
All numbers are treated as big number, you should use [bignumber.js](http://mikemcl.github.io/bignumber.js/#toJSON) to deal with it.

# Summary

- [Basic Usage](#basic-usage)
- [Create A Primas Instance](#create-a-primas-instance)
- [Operations](#operations)
    - [Account](#account)
        - [.metadata(params, callback)](#metadataparams-callback)
        - [.create(query, callback)](#createquery-callback)
        - [.credits(params, callback)](#creditsparams-callback)
        - [.contents(params, callback)](#contentsparams-callback)
        - [.groups(params, callback)](#groupsparams-callback)
        - [.shares(params, callback)](#sharesparams-callback)
        - [.sharesInGroup(params, callback)](#sharesingroupparams-callback)
        - [.likes(params, callback)](#likesparams-callback)
        - [.comments(params, callback)](#commentsparams-callback)
        - [.groupApplications(params, callback)](#groupapplicationsparams-callback)
        - [.shareApplications(params, callback)](#shareapplicationsparams-callback)
        - [.reports(params, callback)](#reportsparams-callback)
        - [.notifications(params, callback)](#notificationsparams-callback)
        - [.avatar(params, callback)](#avatarparams-callback)
        - [.avatarImg(params, callback)](#avatarimgparams-callback)
    - [Token](#token)
        - [.tokens(params, callback)](#tokensparams-callback)
        - [.incentives(params, callback)](#incentivesparams-callback)
        - [.incentiveStats(params, callback)](#incentivestatsparams-callback)
        - [.incentiveWithdrawals(params, callback)](#incentivewithdrawalsparams-callback)
        - [.createIncentiveWithdrawal(accountId, params, callback)](#createincentivewithdrawalaccountid-params-callback)
        - [.preLock(params, callback)](#prelockparams-callback)
        - [.createPreLock(accountId, params, callback)](#createprelockaccountid-params-callback)
        - [.unPreLock(accountId, params, callback)](#unprelockaccountid-params-callback)
        - [.locks(params, callback)](#locksparams-callback)
- [Known Errors](#known-errors)

# Basic Usage

All operation use nodejs callback. All api is async function. 

for example: 

``` javascript
  var Primas = require('primas-sdk-nodejs');
  var client = new Primas({
    address: "<Your address>",
    passphrase: "<Your password>"
  })
  client.Account.metadata({accountId: '<account id>'}, function (err, res) {
    if (err) {
      // handle error
      return;
    }
    // handle res
  })
```

# Create A Primas Instance

use Primas constructor to create instance.

options:

- node [string] node url
- address {string} your address with '0x' prefix
- passphrase [string] your passphrase, if not provide, you shoud use signer on your own
- keystorePath [string] you can specify the dir of your keystore
- keystore [string] the keystore string or object
- json [boolean] use application/json or not

example:

```javascript
  var Primas = require('primas-sdk-nodejs');
  var client = new Primas({
    address: "<Your address>",
    passphrase: "<Your password>",
    keystore: "key store object or string" // if this option is not provide, sdk will find keystore in the workspace
  })
```

# Operations

all the callback parameter is a standard nodejs async callback function. It means the first param of the callback is an error object, and the second param is the response data. You should handle the error properly.

## Account

### .metadata(params, callback)

Get account metadata

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}

### .create(query, callback)

Create account

parameters:

- query {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/account.md#2-create-account)

### .credits(params, callback)

Get account credits list

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}

### .contents(params, callback)

Get account content list

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .groups(params, callback)

Get account groups list

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .shares(params, callback)

Get account shares

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [application_status] {string} Status filter. "pending", "approved" or "declined".

### .sharesInGroup(params, callback)

Get account shares in a single group

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [application_status] {string} Status filter. "pending", "approved" or "declined".

### .likes(params, callback)

Get account likes

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .comments(params, callback)

Get account comments

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .groupApplications(params, callback)

Get account group applications

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [application_status] {string} Status filter. "pending", "approved" or "declined".

### .shareApplications(params, callback)

Get account share applications

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [application_status] {string} Status filter. "pending", "approved" or "declined".

### .reports(params, callback)

Get account report list

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [application_status] {string} Status filter. "pending", "approved" or "declined".

### .notifications(params, callback)

Get account notifications

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [start_time] {number} List from this time. Unix timestamp.

### .avatar(params, callback)

Get account avatar metadata

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}

### .avatarImg(params, callback)

Get account avatar raw image

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}

## Token

### .tokens(params, callback)

Get account tokens data

parameters:

- params {object}
  - accountId {string}

### .incentives(params, callback)

Get incentives list

parameters:

- params {object}
  - accountId {string}
  - [qs] {object}
    - [start_date] {number} Query start date. Unix timestamp.
    - [end_date] {number} Query end date. Unix timestamp.
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .incentiveStats(params, callback)

Get incentives statistics list

parameters:

- params {object}
  - accountId {string}
  - [qs] {object}
    - [start_date] {number} Query start date. Unix timestamp.
    - [end_date] {number} Query end date. Unix timestamp.
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.

### .incentiveWithdrawals(params, callback)

Get incentives withdrawal list

parameters:

- params {object}
  - accountId {string}
  - [qs] {object}
    - [start_date] {number} Query start date. Unix timestamp.
    - [end_date] {number} Query end date. Unix timestamp.
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [status] {string} Status filter. "pending" or "done".

### .createIncentiveWithdrawal(accountId, params, callback)

Withdraw incentives

parameters:

- accountId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/token.md#5-withdraw-incentives)

### .preLock(params, callback)

Get token pre-lock list

parameters:

- params {object}
  - accountId {string}
  - [qs] {object}
    - [start_date] {number} Query start date. Unix timestamp.
    - [end_date] {number} Query end date. Unix timestamp.
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [type] {string} Type filter. "lock" or "unlock".

### .createPreLock(accountId, params, callback)

Pre-lock tokens

parameters:

- accountId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/token.md#7-pre-lock-tokens)

### .unPreLock(accountId, params, callback)

Unlock pre-locked tokens

parameters:

- accountId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/token.md#8-unlock-pre-locked-tokens)

### .locks(params, callback)

Get token lock list

parameters:

- params {object}
  - accountId {string}
  - [qs] {object}
    - [start_date] {number} Query start date. Unix timestamp.
    - [end_date] {number} Query end date. Unix timestamp.
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.
    - [type] {string} Type filter. "content", "group_create", "group_join" or "report".



# Known Errors


| result_code |result_msg|description|
|------------|----------|------------|
|0	  |success|	Success|
|400	|client error	|Client error|
|401  |	invalid data| Invalid post data|
|402	|parse input JSON format error	|Invalid JSON string|
|403	|client signature error	|Signature verification failed|
|404	|input parameter error	|Invalid parameter|
|405	|input parameter empty	|Empty parameter|
|406	|nonce less than lasted	|Nonce is used before|
|500	|server error	|Server error|
