import { sign, sort, toJSON } from '../utils/util';

type Callback = (err: Error | null, res?: any) => void;

interface IReportInfo {
  version: string;
  type: string;
  tag: string;
  src_id: string;
  dest_id?: string;
  avatar?: string;
  creator?: object;
  created: number;
  status: string;
  extra?: object;
  signature?: string;
}

interface IParams {
  shareId: string;
  likeId?: string;
  commentId?: string;
  qs?: object;
}

export default class ContentInteraction {
  private privateKey: Buffer;
  private request: any;

  constructor(options: any) {
    this.privateKey = options.privateKey;
    this.request = options.request;
  }

  public shares(params: IParams, success: Callback) {
    this.createLists('')(params, success);
  }

  public groupShares(params: IParams, success: Callback) {
    this.createLists('shares')(params, success);
  }

  public reports(params: IParams, success: Callback) {
    this.createLists('reports')(params, success);
  }

  public createReport(
    shareId: string,
    params: IReportInfo,
    callback: Callback
  ) {
    this.operator(params, `/shares/${shareId}/reports`, callback);
  }

  public likes(params: IParams, success: Callback) {
    this.createLists('likes')(params, success);
  }

  public createLike(shareId: string, params: IReportInfo, callback: Callback) {
    this.operator(params, `/shares/${shareId}/likes`, callback);
  }

  public cancelLike(params: IParams, success: Callback) {
    this.operator(
      params,
      `/shares/${params.shareId}/likes/${params.likeId}`,
      success,
      'delete'
    );
  }

  public comments(params: IParams, success: Callback) {
    this.createLists('comments')(params, success);
  }

  public replys(params: IParams, success: Callback) {
    this.request.get(
      this.getParams(`/comments/${params.commentId}/comments`, params),
      (err: any, res: any, body: any) => {
        if (err) {
          return success(err);
        }
        success(null, body);
      }
    );
  }

  public createComment(params: IParams, success: Callback) {
    this.operator(params, `/shares/${params.shareId}/comments`, success);
  }

  public updateComment(params: IParams, success: Callback) {
    this.operator(
      params,
      `/shares/${params.shareId}/comments/${params.commentId}`,
      success,
      'put'
    );
  }

  public cancelComment(params: IParams, success: Callback) {
    this.operator(
      params,
      `/shares/${params.shareId}/comments/${params.commentId}`,
      success,
      'delete'
    );
  }

  private operator(
    params: any,
    url: string,
    success: Callback,
    method?: string
  ) {
    const m = method || 'post';
    params.signature = sign(toJSON(sort(params)), this.privateKey);
    this.request[m](
      {
        url,
        body: params,
      },
      (err: any, res: any, body: any) => {
        if (err) {
          return success(err);
        }
        success(null, body);
      }
    );
  }

  private createLists(path: string) {
    return (params: IParams, success: Callback) => {
      let url = this.getUrl(params);
      url += '/' + path;
      this.request.get(
        this.getParams(url, params),
        (err: any, res: any, body: any) => {
          if (err) {
            return success(err);
          }
          success(null, body);
        }
      );
    };
  }

  private getParams(url: string, params: IParams) {
    const opt: any = {
      url,
    };
    if (params.qs) {
      params.qs = params.qs;
    }
    return opt;
  }

  private getUrl(params: IParams) {
    let url = '/shares/' + params.shareId;
    if (params.likeId) {
      url += '/likes/' + params.likeId;
    }
    if (params.commentId) {
      url += '/comments/' + params.commentId;
    }
    return url;
  }
}
