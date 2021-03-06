/*
 * Copyright 2018 Primas Lab Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BigNumber from 'bignumber.js';
import defaultsDeep = require('lodash/defaultsDeep');
import JSON from '../utils/JSONBigNumber';
import { sign, sort } from '../utils/util';
import { BN, toBuffer } from 'ethereumjs-util';

/**
 * basic types
 */

export const DTCP_VERSION = '1.0';
export enum PRIMAS_API_TYPE {
  OBJECT = 'object',
  RELATION = 'relation',
}
export enum PRIMAS_API_TAG {
  ACCOUNT = 'account',
  SHARE_REPORT = 'share_report',
  ARTICLE = 'article',
  IMAGE = 'image',
  SHARE_LIKE = 'share_like',
  SHARE_COMMENT = 'share_comment',
  GROUP = 'group',
  GROUP_MEMBER = 'group_member',
  GROUP_MEMBER_WHITELIST = 'group_member_whitelist',
  GROUP_SHARE = 'group_share',
}
export enum PRIMAS_API_STATUS {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}

export type Callback = (err: Error | null, res?: any) => void;

export interface IConfig {
  node: string;
  address: string;
  passphrase: string;
  keystorePath?: string;
  keystore?: string;
  json: boolean;
}

interface IAccount {
  version: string;
  type: 'object';
  tag: 'account';
  name: string;
  abstract?: string;
  avatar?: string;
  creator?: {
    account_id: string;
    sub_account_id: string;
  };
  address?: string;
  extra?: {
    hash?: string;
  };
  signature?: string;
}

export interface IAccountCreateInfo extends IAccount {
  created: number;
  status: 'created';
}

export interface IAccountUpdateInfo extends IAccount {
  parent_dna: string;
  updated: number;
  status: 'updated';
}

export interface IIncentive {
  node_id: string;
  created: number;
  amount: number;
  node_fee: number;
  signature?: string;
}

export interface IReportInfo {
  version: string;
  type: string;
  tag: string;
  src_id: string;
  dest_id?: string;
  avatar?: string;
  creator?: object;
  created: number;
  status: string;
  extra: object;
  signature?: string;
}

interface IParams {
  qs?: object;
}

export interface IAccountParams extends ITokenParams {
  subAccountId?: string;
  groupId?: string;
}

export interface ITokenParams extends IParams {
  accountId: string;
}

export interface IContentParams extends IParams {
  contentId: string;
}

export interface IContentInteractionParams extends IParams {
  shareId: string;
  likeId?: string;
  commentId?: string;
}

export interface IGroupParams extends IParams {
  groupId: string;
}

function toBase64(data: string | Buffer) {
  let buf: Buffer = data as Buffer;
  if (typeof data === 'string') {
    buf = Buffer.from(data);
  }
  return buf.toString('base64');
}

/**
 * Base Class
 */
export abstract class Base<T extends IParams> {
  public $root: any;
  protected _metadata: any = {};
  protected _url: string = '';
  protected _method: string = '';
  constructor(
    protected request: any,
    protected options?: any,
    protected json?: boolean
  ) {}

  public send(callback: Callback) {
    if (
      (this.json || this._metadata.tag === 'article') &&
      this._metadata.content
    ) {
      this._metadata.content = toBase64(this._metadata.content);
    }
    if (this.options && this.options.privateKey) {
      this._sign();
    }
    if (!this._metadata.signature) {
      throw new Error('you must sign before send');
    }
    if (this._metadata.nonce) {
      this._metadata = {
        transaction: JSON.stringify(this._metadata)
      }
    }
    this.operator(this._metadata, this._url, callback, this._method);
    this._method = '';
  }

  public getRawMetadata() {
    if (this._metadata.content) {
      const content = this._metadata.content;
      delete this._metadata.content;
      const ret = JSON.stringify(sort(this._metadata));
      this._metadata.content = content;
      return ret;
    }

    function padBuffer (buf, len) {
      const ret = Buffer.alloc(len);
      for (let i = 0; i < buf.length; i ++) {
        ret[len - buf.length + i] = buf[i];
      }
      return ret;
    }

    if (this._metadata.nonce) {
      const a = new BN('1000000000000000000').mul(
        new BN(this._metadata.amount)
      );
      this._metadata.amount = new BigNumber(a);
      return Buffer.concat([toBuffer(this._metadata.address), padBuffer(a.toBuffer(), 32), toBuffer(this._metadata.nonce)])
    }

    return JSON.stringify(sort(this._metadata));
  }

  public setSignature(signature: string) {
    this._metadata.signature = signature;
  }

  protected operator(
    params: any,
    url: string,
    success: Callback,
    method?: string
  ) {
    const m = method || 'post';
    const data: any = { url };

    function serialize(p: any) {
      const f: any = {};
      for (const key in p) {
        if (p.hasOwnProperty(key)) {
          f[key] =
            typeof p[key] === 'object' && !Buffer.isBuffer(p[key])
              ? JSON.stringify(p[key])
              : p[key];
        }
      }
      return f;
    }
    if (this.json) {
      data.body = JSON.stringify(params);
    } else if (params.tag === PRIMAS_API_TAG.IMAGE) {
      data.formData = serialize(params);
    } else {
      data.form = serialize(params);
    }
    this.request[m](data, (err: any, res: any, body: any) => {
      if (err) {
        return success(err);
      }
      if (/application\/json/.test(res.headers['content-type'])) {
        body = JSON.parse(body);
        if (body.result_code) {
          body.result_code = body.result_code.toNumber();
        }
      }
      success(null, body);
    });
  }

  protected buildParams(params: any) {
    if (params.creator && params.creator.sub_account_id) {
      if (!params.creator.account_id) {
        throw new Error('missing root account when you create sub account!');
      }
    }
    return defaultsDeep({}, params, {
      version: DTCP_VERSION,
    });
  }

  protected createLists(path: string) {
    return (params: T, success: Callback) => {
      let url = this.getUrl(params);
      if (path) {
        url += '/' + path;
      }
      this.request.get(
        this.getParams(url, params),
        (err: any, res: any, body: any) => {
          if (err) {
            return success(err);
          }
          if (/application\/json/.test(res.headers['content-type'])) {
            body = JSON.parse(body);
            if (body.result_code) {
              body.result_code = body.result_code.toNumber();
            }
          }
          success(null, body);
        }
      );
    };
  }

  protected getParams(url: string, params: T) {
    const opt: any = {
      url,
    };
    if (params.qs) {
      opt.qs = params.qs;
    }
    return opt;
  }

  protected abstract getUrl(params: T): string;

  protected now(): number {
    return Math.floor(+new Date() / 1000);
  }

  private _sign() {
    this.setSignature(sign(this.getRawMetadata(), this.options.privateKey));
  }
}
