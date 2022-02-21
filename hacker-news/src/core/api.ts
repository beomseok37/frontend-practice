import { NewsFeed, NewsDetail } from '../types';
export class Api {
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }
  protected getRequestWithXHR<AjaxResponse>(
    callback: (data: AjaxResponse) => void
  ): void {
    this.xhr.open('GET', this.url);
    this.xhr.addEventListener('load', () => {
      callback(JSON.parse(this.xhr.response) as AjaxResponse);
    });
    this.xhr.send();
  }
  protected getRequestWithPromise<AjaxResponse>(
    callback: (data: AjaxResponse) => void
  ) {
    fetch(this.url)
      .then((response) => response.json())
      .then(callback)
      .catch(() => console.log('데이터를 불러오지 못햇습니다.'));
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getDataWithXHR(callback: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(callback);
  }
  getDataWithPromise(callback: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(callback);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }
  getDataWithXHR(callback: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(callback);
  }
  getDataWithPromise(callback: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(callback);
  }
}
