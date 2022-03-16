import Observer from './Observer';

const data = {};
const title = document.getElementById('title');
const ul = document.getElementById('item-container');
const p = document.getElementById('item-count');
const fetchButton = document.getElementById('getData');

data.toDos = new Observer([]);
data.counts = new Observer({ alreadyDo: 0, toDo: 0 });
data.toDos.subscribe(makeHTML);
data.counts.subscribe(updateCount);

function makeHTML(toDos) {
  const li = [];
  const counts = { alreadyDo: 0, toDo: 0 };
  toDos.forEach((toDo) => {
    const newLi = document.createElement('li');
    const checkbox = document.createElement('input');

    newLi.innerText = `${toDo.userId}의 ${toDo.title}`;
    newLi.dataset.title = toDo.title;

    checkbox.type = 'checkbox';
    checkbox.checked = toDo.completed;
    counts.alreadyDo += toDo.completed ? 1 : 0;
    counts.toDo += toDo.completed ? 0 : 1;

    newLi.appendChild(checkbox);
    li.push(newLi);
  });

  data.counts.value = { ...counts };
  ul.append(...li);
}

function updateCount(counts) {
  p.innerText = `완료:[${counts.alreadyDo}] 미완료:[${counts.toDo}]`;
}

function fetchHandler() {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => res.json())
    .then((json) => {
      data.toDos.value = [...json];
    });
}

function itemClickHandler(e) {
  if (e.target.tagName === 'LI') {
    title.innerText = e.target.dataset.title;
  } else if (e.target.tagName === 'INPUT') {
    const { alreadyDo, toDo } = data.counts.value;
    if (e.target.checked) {
      data.counts.value = { alreadyDo: alreadyDo + 1, toDo: toDo - 1 };
    } else {
      data.counts.value = { alreadyDo: alreadyDo - 1, toDo: toDo + 1 };
    }
  }
}

fetchButton.addEventListener('click', fetchHandler);

ul.addEventListener('click', itemClickHandler);
