import {
  Base,
  Callback,
  IAccountCreateInfo,
  IAccountParams,
  IAccountUpdateInfo,
} from './Base';

export class Account extends Base<IAccountParams> {
  constructor(request: any, protected options?: any) {
    super(request, options);
  }

  public metadata(params: IAccountParams, success: Callback) {
    this.createLists('metadata')(params, success);
  }

  public create(params: IAccountCreateInfo, callback: Callback) {
    this.operator(params, '/accounts', callback);
  }

  public update(
    accountId: string,
    params: IAccountUpdateInfo,
    success: Callback
  ) {
    this.operator(params, '/accounts' + accountId, success, 'put');
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
}
