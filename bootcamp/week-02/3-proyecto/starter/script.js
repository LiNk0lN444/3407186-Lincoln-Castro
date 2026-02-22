
let items = [];


const saveItems = () => {
  localStorage.setItem('items', JSON.stringify(items));
};


const loadItems = () => {
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
};


const updateStats = () => {
  const stats = items.reduce((acc, item) => {
    acc.total++;
    acc[item.status]++; 
    return acc;
  }, { total: 0, active: 0, inactive: 0 }); 

  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-active').textContent = stats.active;
  document.getElementById('stat-inactive').textContent = stats.inactive;

  const categoryStats = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

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

  
  const lastUpdateInfo = document.getElementById('last-update-info');
  if (lastUpdateInfo) {
    if (items.length > 0) {
      lastUpdateInfo.innerHTML = `📦 Última entrada registrada: <strong>${items.at(-1).name}</strong>`;
    } else {
      lastUpdateInfo.textContent = "Bodega vacía";
    }
  }
};


const updateEmptyState = () => {
  const emptyState = document.getElementById('empty-state');
  if (items.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
};

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


const deleteItem = (id) => {
  items = items.filter(item => item.id !== id);
  saveItems();
  applyFilters();
};


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


const clearInactive = () => {
  items = items.filter(item => item.status !== 'inactive');
  saveItems();
  applyFilters();
};

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


const init = () => {
  loadItems();
  attachEvents();
  applyFilters();
};

init();