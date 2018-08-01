import { sign, sort, toJSON } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

interface IAccountCreateInfo {
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
  created: number;
  status: string;
  address?: string;
  extra?: {
    hash?: string;
  };
  signature?: string;
}

interface IAccountUpdateInfo {
  version: string;
  type: string;
  tag: string;
  parent_dna: string;
  status: string;
  updated: number;
  name?: string;
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

interface IParams {
  accountId: string;
  subAccountId?: string;
  groupId?: string;
  qs?: object;
}

export default class Account {
  private privateKey: Buffer;
  private request: any;
  private address: string;

  constructor(options: any) {
    this.privateKey = options.privateKey;
    this.request = options.request;
    this.address = options.address;
  }

  public metadata(params: IParams, success: Callback) {
    this.createLists('metadata')(params, success);
  }

  public create(params: IAccountCreateInfo, callback: Callback) {
    params.address = this.address;
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request.post(
      {
        url: '/accounts',
        body: params,
      },
      (err: any, res: any, body: any) => {
        if (err) {
          return callback(err);
        }
        callback(null, body);
      }
    );
  }

  public update(
    accountId: string,
    params: IAccountUpdateInfo,
    success: Callback
  ) {
    params.address = this.address;
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request.put(
      {
        url: '/accounts/' + accountId,
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

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public credits(params: IParams, success: Callback) {
    this.createLists('credits')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page, page_size} optional}
   * @param success
   */
  public contents(params: IParams, success: Callback) {
    this.createLists('content')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page, page_size} optional}
   * @param success
   */
  public groups(params: IParams, success: Callback) {
    this.createLists('groups')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page optional, page_size optional, application_status required} required}
   * @param success
   */
  public shares(params: IParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, groupId required, qs: {page optional, page_size optional, application_status required} required}
   * @param success
   */
  public sharesInGroup(params: IParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public likes(params: IParams, success: Callback) {
    this.createLists('likes')(params, success);
  }

  public comments(params: IParams, success: Callback) {
    this.createLists('comments')(params, success);
  }

  public groupApplications(params: IParams, success: Callback) {
    this.createLists('applications/groups')(params, success);
  }

  public shareApplications(params: IParams, success: Callback) {
    this.createLists('applications/shares')(params, success);
  }

  public reports(params: IParams, success: Callback) {
    this.createLists('reports')(params, success);
  }

  public notifications(params: IParams, success: Callback) {
    this.createLists('notifications')(params, success);
  }

  public avatar(params: IParams, success: Callback) {
    this.createLists('avatar')(params, success);
  }

  public avatarImg(params: IParams, success: Callback) {
    this.createLists('avatar/raw')(params, success);
  }

  private createLists(path: string) {
    return (params: IParams, success: Callback) => {
      let url = this.getUrl(params);
      url += '/' + path;
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

  private getParams(url: string, params: IParams) {
    const opt: any = {
      url,
    };
    if (params.qs) {
      opt.qs = params.qs;
    }
    return opt;
  }

  private getUrl(params: IParams) {
    let url = '/accounts/' + params.accountId;
    if (params.subAccountId) {
      url += '/sub/' + params.subAccountId;
    }
    if (params.groupId) {
      url += '/groups/' + params.groupId;
    }
    return url;
  }
}
