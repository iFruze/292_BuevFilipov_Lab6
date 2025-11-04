import { fetchData } from '../api.js';

export async function renderTodos(container) {
  const todos = await fetchData('todos');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по названию задачи';
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Добавить TODO';
  addBtn.onclick = () => {
    const title = prompt('Название задачи');
    const userId = parseInt(prompt('ID пользователя'), 10);
    const newTodo = { id: Date.now(), title, userId, completed: false };
    todos.push(newTodo);
    renderList(todos);
  };

  container.appendChild(input);
  container.appendChild(addBtn);

  function renderList(list) {
    const ul = document.createElement('ul');
    ul.innerHTML = '';
    list.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = `${todo.title} [${todo.completed ? '✔' : '✘'}]`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  renderList(todos);
}
