const container = document.getElementById('root');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = `https://hacker-news.firebaseio.com/v0/item/@id.json`;
const store = {
  currentPage: 1,
};

const ajax = new XMLHttpRequest();

const getData = (url) => {
  ajax.open('GET', url, false);
  ajax.send();
  return JSON.parse(ajax.response);
};
const datas = getData(NEWS_URL);

const showNewsFeeds = () => {
  const newsFeeds = datas.slice(
    (store.currentPage - 1) * 10,
    store.currentPage * 10
  );
  const newsList = [];

  newsList.push('<ul>');
  newsFeeds.forEach((newsFeed) => {
    newsList.push(`
    <li>
      <a href='#/show/${newsFeed.id}'>${newsFeed.title}(${newsFeed.comments_count})</a>
    </li>
    `);
  });
  newsList.push('</ul>');

  newsList.push(`
    <div>
      <a href='#/page/${
        store.currentPage === 1 ? 1 : store.currentPage - 1
      }'>이전 페이지</a>
      <a href='#/page/${
        store.currentPage === Number(datas.length / 10)
          ? Number(datas.length / 10)
          : store.currentPage + 1
      }'>다음 페이지</a>
    </div>
  `);

  container.innerHTML = newsList.join('');
};

const showNewsDetail = () => {
  const id = location.hash.substr(7);
  const title = getData(CONTENT_URL.replace('@id', id)).title;

  container.innerHTML = `
  <h1>${title}</h1>

  <div><a href='#/page/${store.currentPage}'>돌아가기</a></div>
  `;
};

const router = () => {
  const routePath = location.hash;

  if (routePath === '') {
    showNewsFeeds();
  } else if (routePath.includes('page')) {
    store.currentPage = Number(location.hash.substr(7));
    showNewsFeeds();
  } else {
    showNewsDetail();
  }
};

window.addEventListener('hashchange', router);

router();
