
<<<<<<< HEAD
let items = [];


=======
//guardar productos de bodega, objetos con su estructura
let items = [];

//para guardar datos en el navegador y que no se pierdan al recargar la página
>>>>>>> 4209ef9 (Fix:Semana 3)
const saveItems = () => {
  localStorage.setItem('items', JSON.stringify(items));
};

<<<<<<< HEAD

=======
//simula una base de datos convirtiendo de JSON a objeto
>>>>>>> 4209ef9 (Fix:Semana 3)
const loadItems = () => {
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
};

<<<<<<< HEAD

=======
//contar el total de productos, estado activo e inactivo
>>>>>>> 4209ef9 (Fix:Semana 3)
const updateStats = () => {
  const stats = items.reduce((acc, item) => {
    acc.total++;
    acc[item.status]++; 
    return acc;
  }, { total: 0, active: 0, inactive: 0 }); 
<<<<<<< HEAD

=======
//actualizar el DOM con las estadísticas
>>>>>>> 4209ef9 (Fix:Semana 3)
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

<<<<<<< HEAD
=======
  // cuenta cuantos productos hay por categoria
>>>>>>> 4209ef9 (Fix:Semana 3)
  const categoryStats = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
<<<<<<< HEAD

=======
  
  //mostrar en pantalla cuantos productos hay por categoria
>>>>>>> 4209ef9 (Fix:Semana 3)
  const statsDetails = document.getElementById('stats-details');
  if (statsDetails) {
    statsDetails.innerHTML = Object.entries(categoryStats)
      .map(([category, count]) => `
        <div class="stat-card">
          <span class="stat-category-name">${category}</span>
          <span class="stat-category-count">${count} items</span>
        </div>
      `).join('');
  }

<<<<<<< HEAD
  
=======
  //mostrar cual fue el ultimo producto registrado
>>>>>>> 4209ef9 (Fix:Semana 3)
  const lastUpdateInfo = document.getElementById('last-update-info');
  if (lastUpdateInfo) {
    if (items.length > 0) {
      lastUpdateInfo.innerHTML = `📦 Última entrada registrada: <strong>${items.at(-1).name}</strong>`;
    } else {
      lastUpdateInfo.textContent = "Bodega vacía";
    }
  }
};

<<<<<<< HEAD

=======
//avisa si no hay productos registrados
>>>>>>> 4209ef9 (Fix:Semana 3)
const updateEmptyState = () => {
  const emptyState = document.getElementById('empty-state');
  if (items.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
};
<<<<<<< HEAD

=======
//se encarga de la editar la informacion de un producto
>>>>>>> 4209ef9 (Fix:Semana 3)
const editItem = (id) => {
  const item = items.find(i => i.id === id);
  if (!item) return;

  document.getElementById('item-id').value = item.id;
  document.getElementById('item-name').value = item.name;
  document.getElementById('item-description').value = item.description;
  document.getElementById('item-category').value = item.category;
  document.getElementById('item-priority').value = item.priority;

  document.getElementById('submit-btn').textContent = 'Actualizar';
  window.scrollTo(0, 0); 
};

<<<<<<< HEAD

=======
//se encarga de mostrar los productos que ingresamos a los usuarios
>>>>>>> 4209ef9 (Fix:Semana 3)
const renderItems = (itemsToRender) => {
  const itemList = document.getElementById('item-list');

  itemList.innerHTML = itemsToRender
    .map(item => `
      <div class="item ${item.status}">
        <div>
          <strong>${item.name}</strong>
          <p>${item.description || ''}</p>
          <small>${item.category} | ${item.priority}</small>
        </div>

        <div class="actions">
          <button onclick="editItem(${item.id})" class="btn-edit">
            Editar
          </button>
          
          <button onclick="toggleStatus(${item.id})">
            ${item.status === 'active' ? 'Desactivar' : 'Activar'}
          </button>
          
          <button onclick="deleteItem(${item.id})" class="btn-delete">
            Eliminar
          </button>
        </div>
      </div>
    `)
    .join('');

  updateStats();
  updateDetailedStats(); 
  updateEmptyState();
};
<<<<<<< HEAD
=======
//crea una lista con los objetos que se desean ver en momento usando el filter (buscador)
>>>>>>> 4209ef9 (Fix:Semana 3)
const applyFilters = () => {
  const statusFilter = document.getElementById('filter-status').value;
  const categoryFilter = document.getElementById('filter-category').value;
  const priorityFilter = document.getElementById('filter-priority').value;
  const searchText = document.getElementById('search-input').value.toLowerCase();

  const filtered = items
    .filter(item => statusFilter === 'all' || item.status === statusFilter)
    .filter(item => categoryFilter === 'all' || item.category === categoryFilter)
    .filter(item => priorityFilter === 'all' || item.priority === priorityFilter)
    .filter(item => 
      item.name.toLowerCase().includes(searchText) || 
      (item.description && item.description.toLowerCase().includes(searchText))
    );

  renderItems(filtered);
};

<<<<<<< HEAD

=======
//sirve para actualizar la pagina o crear
>>>>>>> 4209ef9 (Fix:Semana 3)
const handleFormSubmit = (e) => {
  e.preventDefault();

  const id = document.getElementById('item-id').value; 
  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;

  if (!name) return;

  if (id) {
    items = items.map(item => 
      item.id === parseInt(id) 
        ? { ...item, name, description, category, priority, updatedAt: new Date().toISOString() } 
        : item
    );
  } else {
    const newItem = {
      id: Date.now(),
      name,
      description,
      category,
      priority,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    items = [...items, newItem]; 
  }

  saveItems();
  applyFilters();
  e.target.reset();
  document.getElementById('item-id').value = ''; 
  document.getElementById('submit-btn').textContent = 'Crear'; 
};

<<<<<<< HEAD

=======
//para eliminar productos
>>>>>>> 4209ef9 (Fix:Semana 3)
const deleteItem = (id) => {
  items = items.filter(item => item.id !== id);
  saveItems();
  applyFilters();
};

<<<<<<< HEAD

=======
//el interruptor para cambiar el estado del producto entre activo e inactivo
>>>>>>> 4209ef9 (Fix:Semana 3)
const toggleStatus = (id) => {
  items = items.map(item => {
    if (item.id === id) {
      return {
        ...item,
        status: item.status === 'active' ? 'inactive' : 'active'
      };
    }
    return item;
  });

  saveItems();
  applyFilters();
};

<<<<<<< HEAD

=======
//borrar productos inactivos de la lista
>>>>>>> 4209ef9 (Fix:Semana 3)
const clearInactive = () => {
  items = items.filter(item => item.status !== 'inactive');
  saveItems();
  applyFilters();
};
<<<<<<< HEAD

=======
//se encarga de escuchar las acciones que se genera el usuario cuando interactua con la pagina
>>>>>>> 4209ef9 (Fix:Semana 3)
const attachEvents = () => {
  document
    .getElementById('item-form')
    .addEventListener('submit', handleFormSubmit);

  document
    .getElementById('clear-inactive')
    .addEventListener('click', clearInactive);

  document
    .getElementById('filter-status')
    .addEventListener('change', applyFilters);

  document
    .getElementById('filter-category')
    .addEventListener('change', applyFilters);

  document
    .getElementById('filter-priority') 
    .addEventListener('change', applyFilters);

  
  document
    .getElementById('search-input')
    .addEventListener('input', applyFilters);
};

<<<<<<< HEAD

=======
//se encarga de las conexiones dentro de la pagina, cargar los productos guardados, escuchar las acciones del usuario y mostrar los productos
>>>>>>> 4209ef9 (Fix:Semana 3)
const init = () => {
  loadItems();
  attachEvents();
  applyFilters();
};
<<<<<<< HEAD

init();
=======
// encargada de que TODO se ejecute al cargar la pagina
init(); 
>>>>>>> 4209ef9 (Fix:Semana 3)
