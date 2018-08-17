import { bufferToHex, keccak256, unpad } from 'ethereumjs-util';
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

  public upgradeDTCPLinks(html: string, success: Callback) {
    const re = /<img\s+src="([a-z0-9_:\/\.]*)"\s+\/>/gi;
    let found = re.exec(html);
    let total = 0;
    let complete = 0;

    const ret: any = {};
    while (found !== null) {
      total++;
      const tag = found[0];
      const url = found[1];
      // tslint:disable-next-line:radix
      const index = found.index;
      (this as any).$root.Query.content(
        {
          qs: {
            url: encodeURI(url),
          },
        },
        (err: any, res: any) => {
          complete++;
          if (err) {
            return success(err);
          }
          if (res.data) {
            ret[index] = {
              origin: tag,
              now: tag.replace(
                url + '"',
                `${url}" data-dtcp-id="${res.data.id}"`
              ),
            };
          }
          if (complete === total) {
            if (Object.keys(ret).length > 0) {
              success(err, parse(html, ret));
            } else {
              success(err, html);
            }
          }
        }
      );
      found = re.exec(html);
    }

    function parse(htm: string, obj: any) {
      const fragments: any[] = [];
      let lastIndex = 0;
      const keys = Object.keys(obj).sort((a, b) => {
        if (parseInt(a, 10) < parseInt(b, 10)) {
          return -1;
        } else if (parseInt(a, 10) === parseInt(b, 10)) {
          return 0;
        } else {
          return 1;
        }
      });
      keys.forEach(e => {
        fragments.push(htm.slice(lastIndex, parseInt(e, 10)));
        lastIndex = parseInt(e, 10) + obj[e].origin.length;
        fragments.push(obj[e].now);
      });
      fragments.push(htm.slice(lastIndex));
      return fragments.join('');
    }
  }

  protected getUrl(params: IContentParams) {
    const url = '/content/' + params.contentId;
    return url;
  }

  protected buildParams(params: any) {
    params.content_hash = unpad(bufferToHex(keccak256(params.content)));
    return super.buildParams(
      defaultsDeep({}, params, {
        type: PRIMAS_API_TYPE.OBJECT,
      })
    );
  }
}
