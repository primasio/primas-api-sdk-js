import { Base, Callback } from './Base';

export default class Query extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public query(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  protected getUrl(params: any) {
    return '/query';
  }
}
