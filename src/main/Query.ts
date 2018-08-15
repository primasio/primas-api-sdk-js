import { Base, Callback } from './Base';

export class Query extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public query(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  public content(params: any, success: Callback) {
    this.createLists('content')(params, success);
  }

  public reproductions(params: any, success: Callback) {
    this.createLists('reproductions')(params, success);
  }

  protected getUrl(params: any) {
    return '/query';
  }
}
