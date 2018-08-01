import { sign, sort, toJSON } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

interface IIncentive {
  node_id: string;
  created: number;
  amount: number;
  node_fee: number;
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
  extra?: {
    hash?: string;
  };
  signature?: string;
}

interface IParams {
  accountId: string;
  qs?: object;
}

export default class Token {
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
  public tokens(params: IParams, success: Callback) {
    let url = this.getUrl(params);
    url += '/tokens';
    this.request.get(url, (err: any, res: any, body: any) => {
      if (err) {
        return success(err);
      }
      success(null, body);
    });
  }

  public incentives(params: IParams, success: Callback) {
    this.createLists('tokens/incentives')(params, success);
  }

  public incentiveStats(params: IParams, success: Callback) {
    this.createLists('tokens/incentives/stats')(params, success);
  }

  public incentiveWithdrawals(params: IParams, success: Callback) {
    this.createLists('tokens/incentives/withdrawal')(params, success);
  }

  public createIncentiveWithdrawal(
    accountId: string,
    params: IIncentive,
    success: Callback
  ) {
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request.post(
      {
        url: '/accounts/' + accountId + '/tokens/incentives/withdrawal',
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

  public preLock(params: IParams, success: Callback) {
    this.createLists('tokens/pre_locks')(params, success);
  }

  public createPreLock(
    accountId: string,
    params: IIncentive,
    success: Callback
  ) {
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request.post(
      {
        url: '/accounts/' + accountId + 'tokens/pre_locks',
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

  public unPreLock(accountId: string, params: IIncentive, success: Callback) {
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request.delete(
      {
        url: '/accounts/' + accountId + 'tokens/pre_locks',
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

  public locks(params: IParams, success: Callback) {
    this.createLists('tokens/locks')(params, success);
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
    const url = '/accounts/' + params.accountId;
    return url;
  }
}
