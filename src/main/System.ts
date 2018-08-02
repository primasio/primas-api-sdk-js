import { Base, Callback } from './Base';

export default class System extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public system(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  protected getUrl(params: any) {
    return '/system';
  }
}
