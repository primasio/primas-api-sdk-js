import { Base, Callback } from './Base';

export class System extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public system(success: Callback) {
    this.createLists('')({}, success);
  }

  protected getUrl(params: any) {
    return '/system';
  }
}
