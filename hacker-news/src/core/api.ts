import { NewsFeed, NewsDetail } from '../types';
export class Api {
  ajax: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }
  protected getRequest<AjaxResponse>(
    callback: (data: AjaxResponse) => void
  ): void {
    this.ajax.open('GET', this.url);
    this.ajax.addEventListener('load', () => {
      callback(JSON.parse(this.ajax.response) as AjaxResponse);
    });
    this.ajax.send();
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getData(callback: (data: NewsFeed[]) => void): void {
    return this.getRequest<NewsFeed[]>(callback);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getData(callback: (data: NewsDetail) => void): void {
    return this.getRequest<NewsDetail>(callback);
  }
}
