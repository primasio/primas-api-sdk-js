import { Base, Callback, IIncentive, ITokenParams } from './Base';

export class Token extends Base<ITokenParams> {
  constructor(request: any, protected options?: any) {
    super(request, options);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public tokens(params: ITokenParams, success: Callback) {
    let url = this.getUrl(params);
    url += '/tokens';
    this.request.get(url, (err: any, res: any, body: any) => {
      if (err) {
        return success(err);
      }
      success(null, body);
    });
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

  public createIncentiveWithdrawal(
    accountId: string,
    params: IIncentive,
    success: Callback
  ) {
    this.operator(
      params,
      '/accounts/' + accountId + '/tokens/incentives/withdrawal',
      success
    );
  }

  public preLock(params: ITokenParams, success: Callback) {
    this.createLists('tokens/pre_locks')(params, success);
  }

  public createPreLock(
    accountId: string,
    params: IIncentive,
    success: Callback
  ) {
    this.operator(
      params,
      '/accounts/' + accountId + 'tokens/pre_locks',
      success
    );
  }

  public unPreLock(accountId: string, params: IIncentive, success: Callback) {
    this.operator(
      params,
      '/accounts/' + accountId + 'tokens/pre_locks',
      success,
      'delete'
    );
  }

  public locks(params: ITokenParams, success: Callback) {
    this.createLists('tokens/locks')(params, success);
  }

  protected getUrl(params: ITokenParams) {
    const url = '/accounts/' + params.accountId;
    return url;
  }
}