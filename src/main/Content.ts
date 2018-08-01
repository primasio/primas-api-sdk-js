import { sign, sort, toJSON } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

interface IParams {
  contentId: string;
  qs?: object;
}

export default class Content {
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
  public content(params: IParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public raw(params: IParams, success: Callback) {
    this.createLists('raw')(params, success);
  }

  public create(params: any, callback: Callback) {
    this.operator(params, '/content/', callback, 'put');
  }

  public update(contentId: string, params: any, callback: Callback) {
    this.operator(params, '/content/' + contentId, callback, 'put');
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
    const url = '/content/' + params.contentId;
    return url;
  }
}
