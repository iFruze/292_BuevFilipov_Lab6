import { fetchData } from '../api.js';

export async function renderComments(container) {
  const comments = await fetchData('comments');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по имени или тексту комментария';
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = comments.filter(comment =>
      comment.name.toLowerCase().includes(value) ||
      comment.body.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  container.appendChild(input);

  function renderList(list) {
    const ul = document.createElement('ul');
    ul.innerHTML = '';
    list.forEach(comment => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${comment.name}</strong><br>${comment.body}`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  renderList(comments);
}
