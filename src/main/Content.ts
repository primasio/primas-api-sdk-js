import { bufferToHex, sha256 } from 'ethereumjs-util';
import defaultsDeep = require('lodash/defaultsDeep');
import {
  Base,
  Callback,
  IContentParams,
  PRIMAS_API_STATUS,
  PRIMAS_API_TYPE,
} from './Base';

export class Content extends Base<IContentParams> {
  constructor(request: any, protected options?: any, json?: boolean) {
    super(request, options, json);
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

  public create(params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
      })
    );
    this._url = '/content';
    return this;
  }

  public update(contentId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        status: PRIMAS_API_STATUS.UPDATED,
        updated: this.now(),
      })
    );
    this._url = '/content/' + contentId;
    this._method = 'put';
    return this;
  }

  protected getUrl(params: IContentParams) {
    const url = '/content/' + params.contentId;
    return url;
  }

  protected buildParams(params: any) {
    if (this.json) {
      params.content = Buffer.from(params.content).toString('base64');
    }
    params.content_hash = bufferToHex(sha256(params.content));
    return super.buildParams(
      defaultsDeep({}, params, {
        type: PRIMAS_API_TYPE.OBJECT,
      })
    );
  }
}
