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
import { Base, Callback, IIncentive, ITokenParams } from './Base';

export class Token extends Base<ITokenParams> {
  constructor(request: any, protected options?: any, json?: boolean) {
    super(request, options, json);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public tokens(params: ITokenParams, success: Callback) {
    this.createLists('tokens')(params, success);
  }

  public incentives(params: ITokenParams, success: Callback) {
    this.createLists('tokens/incentives')(params, success);
  }

  public incentiveStats(params: ITokenParams, success: Callback) {
    this.createLists('tokens/incentives/stats')(params, success);
  }

  public incentiveWithdrawals(params: ITokenParams, success: Callback) {
    this.createLists('tokens/incentives/withdrawal')(params, success);
  }

  public createIncentiveWithdrawal(accountId: string, params: IIncentive) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        created: this.now(),
      })
    );
    this._url = '/accounts/' + accountId + '/tokens/incentives/withdrawal';
    return this;
  }

  public preLock(params: ITokenParams, success: Callback) {
    this.createLists('tokens/pre_locks')(params, success);
  }

  public createPreLock(accountId: string, params: any, success: Callback) {
    this._metadata = defaultsDeep({}, params, {
                        nonce: this.uuid(),
                      })
    this._url = '/accounts/' + accountId + '/tokens/pre_locks';
    return this;
  }

  public unPreLock(accountId: string, params: IIncentive) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        created: this.now(),
      })
    );
    this._url = '/accounts/' + accountId + '/tokens/pre_locks';
    this._method = 'delete';
    return this;
  }

  public locks(params: ITokenParams, success: Callback) {
    this.createLists('tokens/locks')(params, success);
  }

  protected getUrl(params: ITokenParams) {
    const url = '/accounts/' + params.accountId;
    return url;
  }

  private uuid() {
    let d = Date.now();
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }
}
