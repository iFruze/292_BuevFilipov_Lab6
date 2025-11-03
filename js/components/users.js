import { fetchData } from '../api.js';

export async function renderUsers(container) {
  const users = await fetchData('users');
  const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const allUsers = [...users, ...localUsers];

  const input = document.createElement('input');
  input.placeholder = 'Поиск по имени или email';
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = allUsers.filter(u =>
      u.name.toLowerCase().includes(value) || u.email.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Добавить пользователя';
  addBtn.onclick = () => {
    const name = prompt('Имя пользователя');
    const email = prompt('Email');
    const newUser = { id: Date.now(), name, email };
    localUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(localUsers));
    renderUsers(container);
  };

  container.appendChild(input);
  container.appendChild(addBtn);

  function renderList(list) {
  container.innerHTML = ''; // 🧹 очищаем старую разметку

  const input = document.createElement('input');
  input.placeholder = 'Поиск по имени или email';
  input.addEventListener('input', () => {
    const value = input.value.toLowerCase();
    const filtered = list.filter(u =>
      u.name.toLowerCase().includes(value) || u.email.toLowerCase().includes(value)
    );
    renderList(filtered);
  });

  const addBtn = document.createElement('button');
  addBtn.textContent = 'Добавить пользователя';
  addBtn.onclick = () => {
    const name = prompt('Имя пользователя');
    const email = prompt('Email');
    const newUser = { id: Date.now(), name, email };
    const updated = [...list, newUser];
    localStorage.setItem('users', JSON.stringify(updated.filter(u => u.id >= 1000)));
    renderList(updated);
  };

  container.appendChild(input);
  container.appendChild(addBtn);

  const ul = document.createElement('ul');
  list.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    if (user.id >= 1000) {
      const del = document.createElement('button');
      del.textContent = 'Удалить';
      del.onclick = () => {
        const updated = list.filter(u => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updated.filter(u => u.id >= 1000)));
        renderList(updated);
      };
      li.appendChild(del);
    }
    ul.appendChild(li);
  });

  container.appendChild(ul);
}


  renderList(allUsers);
}
