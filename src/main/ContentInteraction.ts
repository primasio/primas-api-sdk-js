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
  IContentInteractionParams,
  IReportInfo,
  PRIMAS_API_STATUS,
  PRIMAS_API_TAG,
  PRIMAS_API_TYPE,
} from './Base';

export class ContentInteraction extends Base<IContentInteractionParams> {
  constructor(request: any, protected options?: any, json?: boolean) {
    super(request, options, json);
  }

  public shares(params: IContentInteractionParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public groupShares(params: IContentInteractionParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public reports(params: IContentInteractionParams, success: Callback) {
    this.createLists('reports')(params, success);
  }

  public createReport(shareId: string, params: IReportInfo) {
    if (!params.extra) {
      throw new Error('extra content is required');
    }
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_REPORT,
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
        extra: { report_status: 'pending' },
      })
    );
    this._url = `/shares/${shareId}/reports`;
    return this;
  }

  public likes(params: IContentInteractionParams, success: Callback) {
    this.createLists('likes')(params, success);
  }

  public createLike(shareId: string, params: IReportInfo) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_LIKE,
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
      })
    );
    this._url = `/shares/${shareId}/likes`;
    return this;
  }

  public cancelLike(
    shareId: string,
    likeId: string,
    params: IContentInteractionParams
  ) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_LIKE,
        status: PRIMAS_API_STATUS.DELETED,
        updated: this.now(),
      })
    );
    this._url = `/shares/${shareId}/likes/${likeId}`;
    this._method = 'delete';
    return this;
  }

  public comments(params: IContentInteractionParams, success: Callback) {
    this.createLists('comments')(params, success);
  }

  public replys(params: IContentInteractionParams, success: Callback) {
    this.request.get(
      this.getParams(`/comments/${params.commentId}/reply`, params),
      (err: any, res: any, body: any) => {
        if (err) {
          return success(err);
        }
        success(null, body);
      }
    );
  }

  public createComment(shareId: string, params: any) {
    if (!params.extra) {
      throw new Error('extra content is required');
    }
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_COMMENT,
        status: PRIMAS_API_STATUS.CREATED,
        created: this.now(),
      })
    );
    this._url = `/shares/${shareId}/comments`;
    return this;
  }

  public updateComment(shareId: string, commentId: string, params: any) {
    if (!params.extra) {
      throw new Error('extra content is required');
    }
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_COMMENT,
        status: PRIMAS_API_STATUS.UPDATED,
        updated: this.now(),
      })
    );
    this._url = `/shares/${shareId}/comments/${commentId}`;
    this._method = 'put';
    return this;
  }

  public cancelComment(shareId: string, commentId: string, params: any) {
    this._metadata = this.buildParams(
      defaultsDeep({}, params, {
        tag: PRIMAS_API_TAG.SHARE_COMMENT,
        status: PRIMAS_API_STATUS.DELETED,
        updated: this.now(),
      })
    );
    this._url = `/shares/${shareId}/comments/${commentId}`;
    this._method = 'delete';
    return this;
  }

  protected getUrl(params: IContentInteractionParams) {
    let url = '/shares/' + params.shareId;
    if (params.likeId) {
      url += '/likes/' + params.likeId;
    }
    if (params.commentId) {
      url += '/comments/' + params.commentId;
    }
    return url;
  }

  protected buildParams(params: any) {
    if (params.extra) {
      params.extra.content_hash = unpad(
        bufferToHex(keccak256(params.extra.content))
      );
    }
    return super.buildParams(
      defaultsDeep({}, params, {
        type: PRIMAS_API_TYPE.RELATION,
      })
    );
  }
}
