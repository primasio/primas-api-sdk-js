import { sign, sort, toJSON } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

interface IParams {
  groupId: string;
  qs?: object;
}

export default class Group {
  private privateKey: Buffer;
  private request: any;

  constructor(options: any) {
    this.privateKey = options.privateKey;
    this.request = options.request;
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public group(params: IParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public create(params: any, callback: Callback) {
    this.operator(params, '/groups', callback);
  }

  public update(groupId: string, params: any, callback: Callback) {
    this.operator(params, '/groups/' + groupId, callback, 'put');
  }

  public dismiss(groupId: string, params: any, callback: Callback) {
    this.operator(params, '/groups/' + groupId, callback, 'delete');
  }

  public members(params: IParams, success: Callback) {
    this.createLists('members')(params, success);
  }

  public join(groupId: string, params: any, callback: Callback) {
    this.operator(params, '/groups/' + groupId + '/members', callback);
  }

  public approveOrDecline(
    groupId: string,
    groupMemberId: string,
    params: any,
    callback: Callback
  ) {
    this.operator(
      params,
      '/groups/' + groupId + '/members/' + groupMemberId,
      callback,
      'put'
    );
  }

  public quit(
    groupId: string,
    groupMemberId: string,
    params: any,
    callback: Callback
  ) {
    this.operator(
      params,
      '/groups/' + groupId + '/members/' + groupMemberId,
      callback,
      'delete'
    );
  }

  public whitelist(params: IParams, success: Callback) {
    this.createLists('members/whitelist')(params, success);
  }

  public createWhitelist(groupId: string, params: any, callback: Callback) {
    this.operator(params, '/groups/' + groupId, callback);
  }

  public approveOrDeclineWhitelist(
    groupId: string,
    whitelistId: string,
    params: any,
    callback: Callback
  ) {
    this.operator(
      params,
      '/groups/' + groupId + '/members/whitelist/' + whitelistId,
      callback,
      'put'
    );
  }

  public quitWhitelist(
    groupId: string,
    whitelistId: string,
    params: any,
    callback: Callback
  ) {
    this.operator(
      params,
      '/groups/' + groupId + '/members/whitelist/' + whitelistId,
      callback,
      'delete'
    );
  }

  public shares(params: IParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public createShare(groupId: string, params: any, callback: Callback) {
    this.operator(params, '/groups/' + groupId + '/shares', callback);
  }

  public approveOrDeclineShare(
    shareId: string,
    params: any,
    callback: Callback
  ) {
    this.operator(params, '/shares/' + shareId, callback, 'put');
  }

  public cancelShare(shareId: string, params: any, callback: Callback) {
    this.operator(params, '/shares/' + shareId, callback, 'delete');
  }

  public avatar(params: IParams, success: Callback) {
    this.createLists('avatar')(params, success);
  }

  public avatarImg(params: IParams, success: Callback) {
    this.createLists('avatar/raw')(params, success);
  }

  private operator(
    params: any,
    url: string,
    success: Callback,
    method?: string
  ) {
    const m = method || 'post';
    params.signature = sign(toJSON(sort(params)), this.privateKey);
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

  private createLists(path: string) {
    return (params: IParams, success: Callback) => {
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
    const url = '/groups/' + params.groupId;
    return url;
  }
}
