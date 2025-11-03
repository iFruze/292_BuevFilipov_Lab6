import { renderUsers } from './components/users.js';


export function router() {
  const hash = location.hash;
  const app = document.getElementById('app');
  app.innerHTML = '';

  renderBreadcrumbs(hash, app);

  if (hash === '#users') renderUsers(app);
  else if (hash === '#users#todos') console.log('app');
  else if (hash === '#users#posts') console.log('app');
  else if (hash === '#users#posts#comments') console.log('app');
  else app.innerHTML = '<h2>Выберите раздел</h2>';
}
