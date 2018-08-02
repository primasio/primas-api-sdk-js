import { Base, Callback } from './Base';

export default class TimeLine extends Base<any> {
  constructor(request: any) {
    super(request);
  }

  public timeline(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  protected getUrl(params: any) {
    const url = '/accounts/' + params.accountId + '/timeline';
    return url;
  }
}
