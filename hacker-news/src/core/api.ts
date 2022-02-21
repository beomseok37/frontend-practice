import { NewsFeed, NewsDetail } from '../types';
export class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }
  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getData(id: string): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}
