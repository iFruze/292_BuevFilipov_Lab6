import { fetchData } from '../api.js';

export async function renderPosts(container) {
  const posts = await fetchData('posts');

  const input = document.createElement('input');
  input.placeholder = 'Поиск по заголовку или содержимому';
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(value) ||
      post.body.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  container.appendChild(input);

  function renderList(list) {
    const ul = document.createElement('ul');
    ul.innerHTML = '';
    list.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${post.title}</strong><br>${post.body}`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  renderList(posts);
}
