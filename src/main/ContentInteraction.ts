import { Base, Callback, IContentInteractionParams, IReportInfo } from './Base';

export default class ContentInteraction extends Base<
  IContentInteractionParams
> {
  constructor(request: any, protected options?: any) {
    super(request, options);
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

  public createReport(
    shareId: string,
    params: IReportInfo,
    callback: Callback
  ) {
    this.operator(params, `/shares/${shareId}/reports`, callback);
  }

  public likes(params: IContentInteractionParams, success: Callback) {
    this.createLists('likes')(params, success);
  }

  public createLike(shareId: string, params: IReportInfo, callback: Callback) {
    this.operator(params, `/shares/${shareId}/likes`, callback);
  }

  public cancelLike(
    shareId: string,
    likeId: string,
    params: IContentInteractionParams,
    success: Callback
  ) {
    this.operator(
      params,
      `/shares/${shareId}/likes/${likeId}`,
      success,
      'delete'
    );
  }

  public comments(params: IContentInteractionParams, success: Callback) {
    this.createLists('comments')(params, success);
  }

  public replys(params: IContentInteractionParams, success: Callback) {
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

  public createComment(
    shareId: string,
    params: IContentInteractionParams,
    success: Callback
  ) {
    this.operator(params, `/shares/${shareId}/comments`, success);
  }

  public updateComment(
    shareId: string,
    commentId: string,
    params: IContentInteractionParams,
    success: Callback
  ) {
    this.operator(
      params,
      `/shares/${shareId}/comments/${commentId}`,
      success,
      'put'
    );
  }

  public cancelComment(
    shareId: string,
    commentId: string,
    params: IContentInteractionParams,
    success: Callback
  ) {
    this.operator(
      params,
      `/shares/${shareId}/comments/${commentId}`,
      success,
      'delete'
    );
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
}
