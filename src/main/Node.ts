import { sign, sort } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

export default class Node {
  private request: any;

  constructor(options: any) {
    this.request = options.request;
  }

  public nodes(params: any, success: Callback) {
    this.request.get(
      this.getParams('/nodes', params),
      (err: any, res: any, body: any) => {
        if (err) {
          return success(err);
        }
        success(null, body);
      }
    );
  }

  private getParams(url: string, params: any) {
    const opt: any = {
      url,
      qs: params,
    };
    return opt;
  }
}
