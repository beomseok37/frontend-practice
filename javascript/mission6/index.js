const title = document.getElementById('title');
const ul = document.getElementById('item-container');
const getData = document.getElementById('getData');

const fetchHandler = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((json) => {
      const li = [];
      json.forEach((item) => {
        const newLi = document.createElement('li');
        const checkbox = document.createElement('input');

        newLi.innerText = `${item.userId}의 ${item.title}`;
        newLi.dataset.title = item.title;
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        newLi.appendChild(checkbox);
        li.push(newLi);
      });
      ul.append(...li);
    });
};

const itemClickHandler = (e) => {
  if (e.target.tagName === 'LI') {
    title.innerText = e.target.dataset.itemTitle;
  }
};

getData.addEventListener('click', fetchHandler);

ul.addEventListener('click', itemClickHandler);
