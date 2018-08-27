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

<!-- TOC -->

- [Primas-nodejs-sdk](#primas-nodejs-sdk)
- [Install](#install)
- [Compatibility](#compatibility)
- [Prerequisite](#prerequisite)
- [Summary](#summary)
- [Basic Usage](#basic-usage)
- [Metadata Sign](#metadata-sign)
- [Create A Primas Instance](#create-a-primas-instance)
- [Operations](#operations)
    - [Account](#account)
        - [.metadata(params, callback)](#metadataparams-callback)
        - [.addressMetadata(address, callback)](#addressmetadataaddress-callback)
        - [.create(params)](#createparams)
        - [.update(accountId, params)](#updateaccountid-params)
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
        - [.addressMetadata(address, callback)](#addressmetadataaddress-callback-1)
        - [.joinedGroups(params, callback)](#joinedgroupsparams-callback)
    - [Token](#token)
        - [.tokens(params, callback)](#tokensparams-callback)
        - [.incentives(params, callback)](#incentivesparams-callback)
        - [.incentiveStats(params, callback)](#incentivestatsparams-callback)
        - [.incentiveWithdrawals(params, callback)](#incentivewithdrawalsparams-callback)
        - [.createIncentiveWithdrawal(accountId, params)](#createincentivewithdrawalaccountid-params)
        - [.preLock(params, callback)](#prelockparams-callback)
        - [.createPreLock(accountId, params)](#createprelockaccountid-params)
        - [.unPreLock(accountId, params)](#unprelockaccountid-params)
        - [.locks(params, callback)](#locksparams-callback)
    - [Content](#content)
        - [.content(params, callback)](#contentparams-callback)
        - [.raw(params, callback)](#rawparams-callback)
        - [.create(params)](#createparams-1)
        - [.update(contentId, params)](#updatecontentid-params)
        - [.upgradeDTCPLinks(htmlContent, callback)](#upgradedtcplinkshtmlcontent-callback)
    - [Content Interaction](#content-interaction)
        - [.shares(params, callback)](#sharesparams-callback-1)
        - [.groupShares(params, callback)](#groupsharesparams-callback)
        - [.reports(params, callback)](#reportsparams-callback-1)
        - [.createReport(shareId, params)](#createreportshareid-params)
        - [.likes(params, callback)](#likesparams-callback-1)
        - [.createLike(shareId, params)](#createlikeshareid-params)
        - [.cancelLike(shareId, likeId, params)](#cancellikeshareid-likeid-params)
        - [.comments(params, callback)](#commentsparams-callback-1)
        - [.replys(params, callback)](#replysparams-callback)
        - [.createComment(shareId, params)](#createcommentshareid-params)
        - [.updateComment(shareId, commentId, params)](#updatecommentshareid-commentid-params)
        - [.cancelComment(shareId, commentId, params)](#cancelcommentshareid-commentid-params)
    - [Group](#group)
        - [.group(params, callback)](#groupparams-callback)
        - [.create(params)](#createparams-2)
        - [.create(groupId, params)](#creategroupid-params)
        - [.dismiss(groupId, params)](#dismissgroupid-params)
        - [.members(params, callback)](#membersparams-callback)
        - [.join(groupId, params)](#joingroupid-params)
        - [.approveOrDecline(groupId, groupMemberId, params)](#approveordeclinegroupid-groupmemberid-params)
        - [.quit(groupId, groupMemberId, params)](#quitgroupid-groupmemberid-params)
        - [.whitelist(params, callback)](#whitelistparams-callback)
        - [.createWhitelist(groupId, params)](#createwhitelistgroupid-params)
        - [.approveOrDeclineWhitelist(groupId, whitelistId, params)](#approveordeclinewhitelistgroupid-whitelistid-params)
        - [.quitWhitelist(groupId, whitelistId, params)](#quitwhitelistgroupid-whitelistid-params)
        - [.shares(params, callback)](#sharesparams-callback-2)
        - [.createShare(groupId, params)](#createsharegroupid-params)
        - [.approveOrDeclineShare(shareId, params)](#approveordeclineshareshareid-params)
        - [.cancelShare(shareId, params)](#cancelshareshareid-params)
        - [.avatar(params, callback)](#avatarparams-callback-1)
        - [.avatarImg(params, callback)](#avatarimgparams-callback-1)
    - [Node](#node)
        - [.nodes(params, callback)](#nodesparams-callback)
    - [Query](#query)
        - [.query(params, callback)](#queryparams-callback)
    - [System](#system)
        - [.system(callback)](#systemcallback)
    - [Timeline](#timeline)
        - [.timeline(params, callback)](#timelineparams-callback)
- [Known Errors](#known-errors)

<!-- /TOC -->

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

  // for method without callback, you should explicitly call send after sign
  var account = client.Account.create(
      {
          name: "<account name>",
          creator: {
              account_id: "<root account id>", // The platform ID we received in the previous step.
              sub_account_id: "<user id on the platform>" // This id is used together to identify the user on Primas network.
          },
          extra: {
              hash: "<a hex string>" // In case of sensitive user data that needs proof-of-existence, the data hash can be stored here.
          }
      }
  );
  account.send(function(err, res) {
      if (err) {
          // handle error
          return;
      }
      
      // For sub accounts. No account id is returned at the moment.
      // The sub account is identified user root account id and user id on the platform.
      // console.log(res.id);
      
      console.log(res.dna);
  })
```

# Metadata Sign

if you place a folder named "keystore" in your project or you pass a keystore option in constructor, this sdk will use the build-in signer to sign metadata. for production usage, you should implement a [Primas Offline Signer](https://github.com/primasio/primas-offline-signer) instead of the build-in signer. for example:

```javascript
// here we pass the passphrase and use the build-in signer
var client = new Primas({
	address: "<Your address>",
	passphrase: "<Your password>", 
	node: "https://rigel-a.primas.network"
});

var account = client.Account.create(
	{
		name: "<account name>",
		// avatar: "", // Avatar should be a metadata ID which can only be uploaded after the account creation.
		address: "<account address>"
	});
// if your have keystore in your workspace, just send
account.send(function(err, res) {
    
	if (err) {
		// handle error
		return;
	}
	
	// The response contains the account id and metadata dna
})

// here we don't pass the passphrase because the signer you should implement on your self
var client = new Primas({
	address: "<Your address>",
	node: "https://rigel-a.primas.network"
});

var account = client.Account.create({
  name: "<account name>",
  // avatar: "", // Avatar should be a metadata ID which can only be uploaded after the account creation.
  address: "<account address>"
});

var dataJson = account.getRawMetadata(); 
// do sign now, this sign method is your own offline signer exposed
var signature = sign(dataJson); // this will return signature
// after sign
account.setSignature(signature);
// then send, like the above
account.send(...);
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

### .addressMetadata(address, callback)

Get main account metadata by address

parameters:

- address {string}

### .create(params)

Create account

parameters:

- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/account.md#2-create-account)

### .update(accountId, params)

Update account

parameters:

- accountId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/account.md#3-update-account-metadata)

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

### .addressMetadata(address, callback)

Get address metadata

parameters:

- address {string}

### .joinedGroups(params, callback)

parameters:

- params {object}
  - accountId {string}
  - [subAccountId] {string}
  - [qs] {object}
    - [page] {number} Page number. Starts from 0.
    - [page_size] {number} Page size. Default to 20.


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

### .createIncentiveWithdrawal(accountId, params)

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

### .createPreLock(accountId, params)

Pre-lock tokens

parameters:

- accountId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/token.md#7-pre-lock-tokens)

### .unPreLock(accountId, params)

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

## Content

### .content(params, callback)

Get content metadata

parameters:

- params {object}
  - contentId {string}

### .raw(params, callback)

Get raw content

parameters:

- params {object}
  - contentId {string}

### .create(params)

Post content

parameters:

- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content.md#3-post-content)

### .update(contentId, params)

Update content

parameters:

- contentId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content.md#request-1)

### .upgradeDTCPLinks(htmlContent, callback)

Upgrade DTCP links before posting

- htmlContent {string}

## Content Interaction

### .shares(params, callback)

Get share metadata

- params {object}
  - shareId {string}
  - qs {object}
    - account_id {string}

### .groupShares(params, callback)

Get the shares of a group share

- params {object}
  - shareId {string}
  - qs {object}
    - page {number}
    - page_size {number}
    - account_id {string}

### .reports(params, callback)

Get share reports

- params {object}
  - shareId {string}
  - qs {object}
    - page {number}
    - page_size {number}
    - report_status {"pending"|"approved"|"declined"}

### .createReport(shareId, params)

Report share

- shareId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#4-report-share)

### .likes(params, callback)

Get the likes of a group share

- params {object}
  - shareId {string}
  - qs {object}
    - page {number}
    - page_size {number}
    - account_id {string}

### .createLike(shareId, params)

Like a group share

- shareId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#6-like-a-group-share)

### .cancelLike(shareId, likeId, params)

Cancel the like of a group share

- shareId {string}
- likeId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#7-cancel-the-like-of-a-group-share)

### .comments(params, callback)

Get the comments of a group share

- params {object}
  - shareId {string}
  - qs {object}
    - page {number}
    - page_size {number}
    - account_id {string}

### .replys(params, callback)

Get replying comments of a comment

- params {object}
  - commentId {string}

### .createComment(shareId, params)

The way comment content is processed is the same as post content API.

- shareId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#10-comment-a-group-share)

### .updateComment(shareId, commentId, params)

Update the comment of a group share

- shareId {string}
- commentId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#11-update-the-comment-of-a-group-share)

### .cancelComment(shareId, commentId, params)

Delete the comment of a group share

- shareId {string}
- commentId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/content-interaction.md#12-delete-the-comment-of-a-group-share)

## Group

### .group(params, callback)

Get group metadata

- params {object}
  - groupId {string}
  - qs [object]
    - account_id {string}

### .create(params)

Create group

- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md)

### .create(groupId, params)

Update group

- groupId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#3-update-group)

### .dismiss(groupId, params)

Update group

- groupId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#3-update-group)

### .members(params, callback)

Get group members

- params {object}
  - groupId {string}
  - qs [object]
    - page {number}
    - page_size {number}
    - application_status {"pending"|"approved"|"declined"}

### .join(groupId, params)

Join group

- groupId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#6-join-group)

### .approveOrDecline(groupId, groupMemberId, params)

Approve or decline member application

- groupId {string}
- groupMemberId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#7-approve-or-decline-member-application)

### .quit(groupId, groupMemberId, params)

Quit group or kick member out

- groupId {string}
- groupMemberId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#8-quit-group-or-kick-member-out)

### .whitelist(params, callback)

Get group member whitelist

- params {object}
  - groupId {string}
  - qs [object]
    - page {number}
    - page_size {number}
    - application_status {"pending"|"approved"|"declined"}

### .createWhitelist(groupId, params)

Add group member whitelist

- groupId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#10-add-group-member-whitelist)

### .approveOrDeclineWhitelist(groupId, whitelistId, params)

Approve or decline group member whitelist

- groupId {string}
- whitelistId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#11-approve-or-decline-group-member-whitelist)


### .quitWhitelist(groupId, whitelistId, params)

Quit group member whitelist

- groupId {string}
- whitelistId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#12-quit-group-member-whitelist)

### .shares(params, callback)

Get group shares

- params {object}
  - groupId {string}
  - qs [object]
    - page {number}
    - page_size {number}
    - application_status {"pending"|"approved"|"declined"}

### .createShare(groupId, params)

Share to a group

- groupId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#14-share-to-a-group)

### .approveOrDeclineShare(shareId, params)

Approve or decline share application

- shareId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#15-approve-or-decline-share-application)

### .cancelShare(shareId, params)

Delete group share

- shareId {string}
- params {object} the object detail can be find in [this page](https://github.com/primasio/primas-api-doc/blob/master/group.md#16-delete-group-share)

### .avatar(params, callback)

Get group avatar metadata

- params {object}
  - groupId {string}

### .avatarImg(params, callback)

Get group avatar raw image

- params {object}
  - groupId {string}

## Node

### .nodes(params, callback)

Get node list

- params [object]
  - qs [object]
    - page [number]
    - page_size [number]

## Query

### .query(params, callback)

Query all

- params [object]
  - qs [object]
    - page [number]
    - page_size [number]
    - text [string]
    - type ["all"|"share"|"account"|"group"]
    - category [string]

## System

### .system(callback)

Get system parameters

## Timeline

### .timeline(params, callback)

- params {object}
  - accountId {string}


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
