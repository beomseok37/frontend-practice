const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = `https://hacker-news.firebaseio.com/v0/item/@id.json`;

const ajax = new XMLHttpRequest();

const getData = (url) => {
  ajax.open('GET', url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

const showNewsFeeds = () => {
  const newsFeeds = getData(NEWS_URL).slice(0, 10);
  const newsList = [];
  newsList.push('<ul>');

  newsFeeds.forEach((newsFeed) => {
    newsList.push(`
    <li>
    <a href='#${newsFeed.id}'>${newsFeed.title}(${newsFeed.comments_count})</a>
    </li>
    `);
  });
  newsList.push('</ul>');

  container.innerHTML = newsList.join('');
};

const showNewsDetail = () => {
  const id = location.hash.substr(1);
  const title = getData(CONTENT_URL.replace('@id', id)).title;
  container.innerHTML = `
  <h1>${title}</h1>
  
  <div><a href='#'>돌아가기</a></div>
  `;
};

const router = () => {
  const routePath = location.hash;
  if (routePath === '') {
    showNewsFeeds();
  } else {
    showNewsDetail();
  }
};

window.addEventListener('hashchange', router);

router();
