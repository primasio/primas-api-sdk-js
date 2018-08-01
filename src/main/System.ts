type Callback = (err: Error | null, res?: any) => void;

export default class System {
  private request: any;

  constructor(options: any) {
    this.request = options.request;
  }

  public system(params: any, success: Callback) {
    this.request.get(
      this.getParams('/system', params),
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
