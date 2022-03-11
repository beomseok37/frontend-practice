const title = document.getElementById('title');
const ul = document.getElementById('item-container');
const getData = document.getElementById('getData');

const fetchHandler = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((json) => {
      const li = [];
      json.forEach((item) => {
        li.push(`
          <li data-item-title='${item.title}'>
            ${item.userId}의 ${item.title}
            <input type='checkbox' ${item.completed ? 'checked' : ''}>
          </li>
        `);
      });
      ul.innerHTML = li.join();
    });
};

const itemClickHandler = (e) => {
  if (e.target.tagName === 'LI') {
    title.innerText = e.target.dataset.itemTitle;
  }
};

getData.addEventListener('click', fetchHandler);

ul.addEventListener('click', itemClickHandler);
