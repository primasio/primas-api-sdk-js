type Callback = (err: Error | null, res?: any) => void;

export default class Query {
  private request: any;

  constructor(options: any) {
    this.request = options.request;
  }

  public query(params: any, success: Callback) {
    this.request.get(
      this.getParams('/query', params),
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
