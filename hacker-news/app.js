const ajax = new XMLHttpRequest();
ajax.open(
  'GET',
  'https://hacker-news.firebaseio.com/v0/topstories.json',
  false
);
ajax.send();
const numbers = JSON.parse(ajax.response).slice(0, 10);

const ul = document.createElement('ul');
document.getElementById('root').appendChild(ul);

numbers.forEach((number) => {
  const li = document.createElement('li');
  ajax.open(
    'GET',
    `https://hacker-news.firebaseio.com/v0/item/${number}.json?print=pretty`,
    false
  );
  ajax.send();
  const item = JSON.parse(ajax.response);
  li.innerHTML = item.title;
  ul.appendChild(li);
});
