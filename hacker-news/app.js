const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = `https://hacker-news.firebaseio.com/v0/item/@id.json`;

const ajax = new XMLHttpRequest();
const getData = (url) => {
  ajax.open('GET', url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

const newsFeeds = getData(NEWS_URL).slice(0, 10);

const ul = document.createElement('ul');
const content = document.createElement('div');

window.addEventListener('hashchange', () => {
  const id = location.hash.substr(1);
  const title = getData(CONTENT_URL.replace('@id', id)).title;
  content.innerHTML = title;
});

newsFeeds.forEach((newsFeed) => {
  const div = document.createElement('div');
  div.innerHTML = `
    <li>
      <a href='#${newsFeed.id}'>${newsFeed.title}(${newsFeed.comments_count})</a>
    </li>
  `;
  ul.appendChild(div);
});

container.appendChild(ul);
container.appendChild(content);
