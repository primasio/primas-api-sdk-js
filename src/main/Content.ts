import { Base, Callback, IContentParams } from './Base';

export default class Content extends Base<IContentParams> {
  constructor(request: any, protected options?: any) {
    super(request, options);
  }

  /**
   *
   * @param params {accountId required, subAccountId optional}
   * @param success
   */
  public content(params: IContentParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public raw(params: IContentParams, success: Callback) {
    this.createLists('raw')(params, success);
  }

  public create(params: any, callback: Callback) {
    this.operator(params, '/content/', callback);
  }

  public update(contentId: string, params: any, callback: Callback) {
    this.operator(params, '/content/' + contentId, callback, 'put');
  }

  protected getUrl(params: IContentParams) {
    const url = '/content/' + params.contentId;
    return url;
  }
}
