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
    this.operator(
      params,
      '/accounts/' + accountId + 'tokens/pre_locks',
      success
    );
  }

  public unPreLock(accountId: string, params: IIncentive) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        created: this.now(),
      })
    );
    this._url = '/accounts/' + accountId + 'tokens/pre_locks';
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
}
