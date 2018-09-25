/*
 * Copyright 2018 Primas Lab Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    this.create = this.create.bind(this);
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

  public upgradeDTCPLinks(html: string, accountId: string, success: Callback) {
    this._analysisImg(html, accountId).then(data => {
      this._analysisLink(data).then(data => {
        success(null, data);
      });
    });
  }

  protected getUrl(params: IContentParams) {
    const url = '/content/' + params.contentId;
    return url;
  }

  protected buildParams(params: any) {
    params.content_hash = bufferToHex(keccak256(params.content)).slice(2);
    return super.buildParams(
      defaultsDeep({}, params, {
        type: PRIMAS_API_TYPE.OBJECT,
      })
    );
  }

  private _analysisImg(html, accountId: string) {
    return this._analysis(
      html,
      /<img\s+src="([a-zA-Z0-9_\-:\/\.%&@,\?]*)"\s+\/?>/gi,
      (params, cb) => { this.$root.Query.content(accountId, params, cb)}
    );
  }

  private _analysisLink(this: Content, html) {
    return this._analysis(
      html,
      /<a\s+href="([a-z0-9_:\/\.]*)"\s+\/?>/gi,
      (this as any).$root.Query.reproductions
    );
  }

  private _analysis(html, regex, fn) {
    let found = regex.exec(html);
    const ret: any = {};
    const imgPromises: any[] = [];
    while (found !== null) {
      const tag = found[0];
      const url = found[1];
      // tslint:disable-next-line:radix
      const index = found.index;
      const p = new Promise((resolve, reject) => {
        fn(
          {
            qs: {
              url: encodeURI(url),
            },
          },
          (err: any, res: any) => {
            if (err) {
              return reject(err)
            }
            ret[index] = {
              origin: tag,
              now: tag.replace(
                url + '"',
                `${this.request.base}/content/${res.id}/raw" data-dtcp-id="${res.id}"`
              ),
            };
            resolve();
          }
        );
      });
      imgPromises.push(p);

      found = regex.exec(html);
    }
    return Promise.all(imgPromises).then(() => {
      if (Object.keys(ret).length > 0) {
        return this._parse(html, ret);
      } else {
        return html;
      }
    }).catch(() => {
      return html;
    });
  }

  private _parse(htm: string, obj: any) {
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
