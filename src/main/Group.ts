import { Base, Callback, IGroupParams } from './Base';

export default class Group extends Base<IGroupParams> {
  constructor(request: any, protected options?: any) {
    super(request, options);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public group(params: IGroupParams, success: Callback) {
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

  public members(params: IGroupParams, success: Callback) {
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

  public whitelist(params: IGroupParams, success: Callback) {
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

  public shares(params: IGroupParams, success: Callback) {
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

  public avatar(params: IGroupParams, success: Callback) {
    this.createLists('avatar')(params, success);
  }

  public avatarImg(params: IGroupParams, success: Callback) {
    this.createLists('avatar/raw')(params, success);
  }

  protected getUrl(params: IGroupParams) {
    const url = '/groups/' + params.groupId;
    return url;
  }
}
