import { sign, sort, toJSON } from '../utils/util';

/**
 * basic types
 */

export type Callback = (err: Error | null, res?: any) => void;

export interface IConfig {
  baseUrl?: string;
  address: string;
  passphrase: string;
}

interface IAccount {
  version: string;
  type: string;
  tag: string;
  name: string;
  abstract?: string;
  avatar?: string;
  creator?: {
    account_id: string;
    sub_account_id: string;
  };
  status: string;
  address?: string;
  extra?: {
    hash?: string;
  };
  signature?: string;
}

export interface IAccountCreateInfo extends IAccount {
  created: number;
}

export interface IAccountUpdateInfo extends IAccount {
  parent_dna: string;
  updated: number;
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
  extra?: object;
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

/**
 * Base Class
 */
export abstract class Base<T extends IParams> {
  protected request: any;

  constructor(request: any, protected options?: any) {
    this.request = request;
  }

  protected operator(
    params: any,
    url: string,
    success: Callback,
    method?: string
  ) {
    const m = method || 'post';
    if (this.options) {
      params.address = this.options.address;
      params.signature = sign(toJSON(sort(params)), this.options.privateKey);
    }
    this.request[m](
      {
        url,
        body: params,
      },
      (err: any, res: any, body: any) => {
        if (err) {
          return success(err);
        }
        success(null, body);
      }
    );
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
}
