const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = `https://hacker-news.firebaseio.com/v0/item/@id.json`;

const ajax = new XMLHttpRequest();
ajax.open('GET', NEWS_URL, false);
ajax.send();

const newsFeeds = JSON.parse(ajax.response).slice(0, 10);

const ul = document.createElement('ul');
const content = document.createElement('div');

window.addEventListener('hashchange', () => {
  const id = location.hash.substr(1);
  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();
  const title = JSON.parse(ajax.response).title;
  content.innerHTML = title;
});

newsFeeds.forEach((newsFeed) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.innerHTML = newsFeed.title;
  a.href = `#${newsFeed.id}`;
  li.appendChild(a);
  ul.appendChild(li);
});

container.appendChild(ul);
container.appendChild(content);
