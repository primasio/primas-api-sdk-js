import { Base, Callback } from './Base';

export class Node extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public nodes(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  protected getUrl(params: any) {
    return '/nodes';
  }
}
