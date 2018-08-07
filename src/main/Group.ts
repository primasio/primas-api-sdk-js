import defaultsDeep = require('lodash/defaultsDeep');
import {
  Base,
  Callback,
  IGroupParams,
  PRIMAS_API_STATUS,
  PRIMAS_API_TAG,
  PRIMAS_API_TYPE,
} from './Base';

export class Group extends Base<IGroupParams> {
  constructor(request: any, protected options?: any, json?: boolean) {
    super(request, options, json);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public group(params: IGroupParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public create(params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.CREATED,
        created: +new Date(),
      })
    );
    this._url = '/groups';
    return this;
  }

  public update(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.UPDATED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId;
    this._method = 'put';
    return this;
  }

  public dismiss(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.DELETED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId;
    this._method = 'delete';
    return this;
  }

  public members(params: IGroupParams, success: Callback) {
    this.createLists('members')(params, success);
  }

  public join(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.CREATED,
        created: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/members';
    return this;
  }

  public approveOrDecline(groupId: string, groupMemberId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.UPDATED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/members/' + groupMemberId;
    this._method = 'put';
    return this;
  }

  public quit(groupId: string, groupMemberId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.DELETED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/members/' + groupMemberId;
    this._method = 'delete';
    return this;
  }

  public whitelist(params: IGroupParams, success: Callback) {
    this.createLists('members/whitelist')(params, success);
  }

  public createWhitelist(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER_WHITELIST,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.CREATED,
        created: +new Date(),
        extra: { application_status: 'pending' },
      })
    );
    this._url = '/groups/' + groupId;
    return this;
  }

  public approveOrDeclineWhitelist(
    groupId: string,
    whitelistId: string,
    params: any
  ) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER_WHITELIST,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.UPDATED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/members/whitelist/' + whitelistId;
    this._method = 'put';
    return this;
  }

  public quitWhitelist(groupId: string, whitelistId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER_WHITELIST,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.DELETED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/members/whitelist/' + whitelistId;
    this._method = 'delete';
    return this;
  }

  public shares(params: IGroupParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public createShare(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_SHARE,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.CREATED,
        updated: +new Date(),
      })
    );
    this._url = '/groups/' + groupId + '/shares';
    return this;
  }

  public approveOrDeclineShare(shareId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_SHARE,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.UPDATED,
        updated: +new Date(),
      })
    );
    this._url = '/shares/' + shareId;
    this._method = 'put';
    return this;
  }

  public cancelShare(shareId: string, params: any, callback: Callback) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_SHARE,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.DELETED,
        updated: +new Date(),
      })
    );
    this._url = '/shares/' + shareId;
    this._method = 'delete';
    return this;
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

  protected buildParams(params: any) {
    return super.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP,
        type: PRIMAS_API_TYPE.OBJECT,
      })
    );
  }
}
