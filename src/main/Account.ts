import defaultsDeep = require('lodash/defaultsDeep');
import {
  Base,
  Callback,
  IAccountCreateInfo,
  IAccountParams,
  IAccountUpdateInfo,
  PRIMAS_API_STATUS,
  PRIMAS_API_TAG,
  PRIMAS_API_TYPE,
} from './Base';

export class Account extends Base<IAccountParams> {
  constructor(request: any, options?: any, json?: boolean) {
    super(request, options, json);
  }

  public metadata(params: IAccountParams, success: Callback) {
    this.createLists('metadata')(params, success);
  }

  public create(params: IAccountCreateInfo) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
      })
    );
    this._url = '/accounts';
    return this;
  }

  public update(accountId: string, params: IAccountUpdateInfo) {
    if (params.creator && params.creator.sub_account_id) {
      if (!params.creator.account_id) {
        throw new Error('missing root account when you create sub account!');
      }
    }
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.UPDATED,
        updated: this.now(),
      })
    );
    this._url = '/accounts/' + accountId;
    this._method = 'put';
    return this;
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public credits(params: IAccountParams, success: Callback) {
    this.createLists('credits')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page, page_size} optional}
   * @param success
   */
  public contents(params: IAccountParams, success: Callback) {
    this.createLists('content')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page, page_size} optional}
   * @param success
   */
  public groups(params: IAccountParams, success: Callback) {
    this.createLists('groups')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, qs: {page optional, page_size optional, application_status required} required}
   * @param success
   */
  public shares(params: IAccountParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional, groupId required, qs: {page optional, page_size optional, application_status required} required}
   * @param success
   */
  public sharesInGroup(params: IAccountParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public likes(params: IAccountParams, success: Callback) {
    this.createLists('likes')(params, success);
  }

  public comments(params: IAccountParams, success: Callback) {
    this.createLists('comments')(params, success);
  }

  public groupApplications(params: IAccountParams, success: Callback) {
    this.createLists('applications/groups')(params, success);
  }

  public shareApplications(params: IAccountParams, success: Callback) {
    this.createLists('applications/shares')(params, success);
  }

  public reports(params: IAccountParams, success: Callback) {
    this.createLists('reports')(params, success);
  }

  public notifications(params: IAccountParams, success: Callback) {
    this.createLists('notifications')(params, success);
  }

  public avatar(params: IAccountParams, success: Callback) {
    this.createLists('avatar')(params, success);
  }

  public avatarImg(params: IAccountParams, success: Callback) {
    this.createLists('avatar/raw')(params, success);
  }

  protected getUrl(params: IAccountParams) {
    let url = '/accounts/' + params.accountId;
    if (params.subAccountId) {
      url += '/sub/' + params.subAccountId;
    }
    if (params.groupId) {
      url += '/groups/' + params.groupId;
    }
    return url;
  }

  protected buildParams(params: IAccountCreateInfo) {
    return super.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.ACCOUNT,
        type: PRIMAS_API_TYPE.OBJECT,
        address: this.options.address,
      })
    );
  }
}
