import View from '../core/view';
import { NewsDetailApi } from '../core/api';
import { NewsComment, NewsStore, NewsDetail } from '../types';
import { CONTENT_URL } from '../config';

export default class NewsDetailView extends View {
  store: NewsStore;
  constructor(containerId: string, store: NewsStore) {
    const template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>{{__title__}}</h2>
        <div class="text-gray-400 h-20">
          {{__content__}}
        </div>

        {{__comments__}}

      </div>
    </div>
    `;

    super(containerId, template);
    this.store = store;
  }

  async render(): Promise<void> {
    const id = location.hash.substr(7);
    const api = new NewsDetailApi(CONTENT_URL.replace('@id', id));
    const data = await api.getData();
    const { title, content, comments } = data;

    this.setTemplateData('currentPage', String(this.store.currentPage));
    this.setTemplateData('title', title);
    this.setTemplateData('content', content);
    this.setTemplateData('comments', this.makeComment(comments));
    this.updateView();

    for (let i = 0; i < this.store.numberOfFeed; i++) {
      if (this.store.getFeed(i).id === Number(id)) {
        this.store.getFeed(i).read = true;
        break;
      }
    }
  }

  private makeComment(comments: NewsComment[], called = 0): string {
    for (let i = 0; i < comments.length; i++) {
      this.addHtml(`
          <div style="padding-left: ${called * 40}px;" class="mt-4">
            <div class="text-gray-400">
              <i class="fa fa-sort-up mr-2"></i>
              <strong>${comments[i].user}</strong> ${comments[i].time_ago}
            </div>
            <p class="text-gray-700">${comments[i].content}</p>
          </div>      
        `);

      if (comments[i].comments.length > 0) {
        this.addHtml(this.makeComment(comments[i].comments, called + 1));
      }
    }

    return this.getHtml();
  }
}
