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

import { Base, Callback } from './Base';
import * as req from 'request';
import * as path from 'path';

export class Query extends Base<any> {
  constructor(request: any, protected options?: any, json?: boolean) {
    super(request, options, json);
    this.content = this.content.bind(this);
    this.reproductions = this.reproductions.bind(this);
  }

  public query(params: any, success: Callback) {
    this.createLists('')(params, success);
  }

  public content(accountId: string, params: any, success: Callback) {
    this.createLists('content')(params, (err, res) => {
      if (res.data.length === 0) {
        this.uploadImage(params.qs.url, accountId, success)
      } else {
        success(null, res.data)
      }
    });
  }

  public reproductions(params: any, success: Callback) {
    this.createLists('reproductions')(params, success);
  }

  protected getUrl(params: any) {
    return '/query';
  }

  private uploadImage (image: string, accountId: string, cb: Callback) {
    const rs = req({
      uri: image,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36'
      }
    });
    let buf = Buffer.alloc(0);
    rs.on('data', function(chunk){
      buf = Buffer.concat([buf, chunk])
    });
    rs.on('end', () => {
      this.$root.Content.create({
        tag: 'image',
        title: path.basename(image),
        creator: {
          account_id: accountId,
        },
        abstract: `external link images, the original image url is '${image}'`,
        language: 'en',
        category: 'image',
        content: buf,
      }).send((err, res) => {
        if (err) {
          return;
        }
        if (res.result_code === 0) {
          cb(null, res.data)
        } else {
          cb(res.result_msg)
        }
      });
    })

  }
}
