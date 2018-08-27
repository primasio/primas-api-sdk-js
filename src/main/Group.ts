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
        created: this.now(),
      })
    );
    this._url = '/groups';
    return this;
  }

  public update(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.UPDATED,
        updated: this.now(),
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
        updated: this.now(),
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
        created: this.now(),
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
        updated: this.now(),
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
        updated: this.now(),
      })
    );
    this._url = '/groups/' + groupId + '/members/' + groupMemberId;
    this._method = 'delete';
    return this;
  }

  public whitelist(params: IGroupParams, success: Callback) {
    this.createLists('whitelist/members')(params, success);
  }

  public createWhitelist(groupId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER_WHITELIST,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
        extra: { application_status: 'pending' },
      })
    );
    this._url = '/groups/' + groupId + '/whitelist/members';
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
        updated: this.now(),
      })
    );
    this._url = '/groups/' + groupId + '/whitelist/members/' + whitelistId;
    this._method = 'put';
    return this;
  }

  public quitWhitelist(groupId: string, whitelistId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_MEMBER_WHITELIST,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.DELETED,
        updated: this.now(),
      })
    );
    this._url = '/groups/' + groupId + '/whitelist/members/' + whitelistId;
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
        created: this.now(),
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
        updated: this.now(),
      })
    );
    this._url = '/shares/' + shareId;
    this._method = 'put';
    return this;
  }

  public cancelShare(shareId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.GROUP_SHARE,
        type: PRIMAS_API_TYPE.RELATION,
        status: PRIMAS_API_STATUS.DELETED,
        updated: this.now(),
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
