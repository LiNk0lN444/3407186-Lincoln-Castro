/**
 * ============================================================
 * SISTEMA DE GESTIÓN DE INVENTARIO - WEEK 02
 

// 1. CONFIGURACIÓN DEL ESTADO GLOBAL
// ------------------------------------------------------------
let items = [];
const STORAGE_KEY = 'bodega_semana_02_data';

/**
 * Función principal de arranque: Carga datos y prepara la interfaz.
 */
const initApp = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    items = savedData ? JSON.parse(savedData) : [];
    
    // Registramos los eventos de los botones y filtros
    setupEventListeners();
    
    // Dibujamos la lista por primera vez
    applyFilters();
};

// 2. LÓGICA DE FILTRADO (EL "CEREBRO" DEL BUSCADOR)
// ------------------------------------------------------------
const applyFilters = () => {
    // Capturamos todos los valores de los filtros en el HTML
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const filterStatus = document.getElementById('filter-status')?.value || 'all';
    const filterCategory = document.getElementById('filter-category')?.value || 'all';
    const filterPriority = document.getElementById('filter-priority')?.value || 'all';

    // Filtramos el array principal basado en las 4 condiciones simultáneas
    const filteredResults = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;

        return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });

    renderItems(filteredResults);
};

// 3. RENDERIZADO DE LA INTERFAZ (LO QUE EL USUARIO VE)
// ------------------------------------------------------------
const renderItems = (itemsToDisplay) => {
    const container = document.getElementById('item-list');
    if (!container) return;

    // Limpiamos la lista actual
    container.innerHTML = '';

    // Si no hay resultados, mostramos el mensaje de "No hay elementos"
    const emptyMsg = document.getElementById('empty-state-msg');
    if (itemsToDisplay.length === 0) {
        if (emptyMsg) emptyMsg.style.display = 'block';
        updateStatistics(); // Actualizamos stats aunque esté vacío
        return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    // Generamos las tarjetas dinámicamente
    itemsToDisplay.forEach(item => {
        const isAct = item.status === 'active';
        
        // Definimos los colores basados estrictamente en el estado
        const statusColor = isAct ? '#4caf50' : '#ff5252'; // Verde si activo, Rojo si inactivo
        const actionBtnClass = isAct ? 'btn-deactivate' : 'btn-activate';
        const actionBtnLabel = isAct ? 'Desactivar' : 'Activar';

        const card = document.createElement('div');
        card.className = `item-card ${item.status}`;
        
        // Aplicamos el estilo directamente para asegurar que se vea como en tu foto
        card.style.cssText = `
            border-left: 8px solid ${statusColor};
            background: #f3f5ff;
            padding: 20px;
            margin-bottom: 15px;
            border-radius: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            opacity: ${isAct ? '1' : '0.8'};
        `;

        card.innerHTML = `
            <div class="item-info">
                <h3 style="margin:0; color:#333;">${item.name.toUpperCase()}</h3>
                <p style="margin:5px 0; color:#666;">${item.description || 'Sin descripción'}</p>
                <div style="font-size: 0.85rem; color: #888;">
                    <span>📁 ${item.category}</span> | <span>⚡ ${item.priority}</span>
                </div>
            </div>
            <div class="card-actions" style="display:flex; gap:10px;">
                <button onclick="toggleStatus('${item.id}')" 
                        style="background:${isAct ? '#7c83fd' : '#4caf50'}; color:white; border:none; padding:10px 15px; border-radius:8px; cursor:pointer; font-weight:bold;">
                    ${actionBtnLabel}
                </button>
                <button onclick="deleteItem('${item.id}')" 
                        style="background:#8e94f2; color:white; border:none; padding:10px 15px; border-radius:8px; cursor:pointer;">
                    Eliminar
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    updateStatistics();
};

// 4. ESTADÍSTICAS Y CONTADORES
// ------------------------------------------------------------
const updateStatistics = () => {
    // 1. Cálculos de los contadores principales
    const total = items.length;
    const active = items.filter(i => i.status === 'active').length;
    const inactive = items.filter(i => i.status === 'inactive').length;

    // 2. Inyectar números en los widgets de arriba (No borres esto)
    if (document.getElementById('stat-total')) document.getElementById('stat-total').textContent = total;
    if (document.getElementById('stat-active')) document.getElementById('stat-active').textContent = active;
    if (document.getElementById('stat-inactive')) document.getElementById('stat-inactive').textContent = inactive;

    // 3. TU NUEVO CÓDIGO (El resumen de categorías que querías)
    const detailed = document.getElementById('detailed-stats-content');

    if (detailed) {
        if (items.length > 0) {
            const counts = items.reduce((acc, curr) => {
                const catName = curr.category || 'Sin Categoría';
                acc[catName] = (acc[catName] || 0) + 1;
                return acc;
            }, {});
            
            detailed.innerHTML = Object.entries(counts)
                .map(([cat, count]) => `
                    <div class="stat-pill">
                        <b>📂 ${cat}</b>
                        <span>${count} ${count === 1 ? 'item' : 'items'}</span>
                    </div>
                `).join('');
        } else {
            detailed.innerHTML = '<p style="color:#888;">No hay datos para mostrar categorías.</p>';
        }
    }
}; // <-- Aquí cierra la función principal

// 5. ACCIONES (CREAR, ESTADO, ELIMINAR, LIMPIAR)
// ------------------------------------------------------------

// Cambiar estado de Activo a Inactivo
window.toggleStatus = (id) => {
    items = items.map(item => {
        if (item.id === id) {
            item.status = (item.status === 'active') ? 'inactive' : 'active';
        }
        return item;
    });
    saveAndRefresh();
};

// Eliminar un solo elemento
window.deleteItem = (id) => {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
        items = items.filter(item => item.id !== id);
        saveAndRefresh();
    }
};

// LIMPIAR TODOS LOS INACTIVOS (La función que fallaba)
const clearInactiveItems = () => {
    const inactiveCount = items.filter(i => i.status === 'inactive').length;
    
    if (inactiveCount === 0) {
        alert("No hay elementos inactivos para limpiar.");
        return;
    }

    if (confirm(`Se eliminarán ${inactiveCount} elementos inactivos. ¿Proceder?`)) {
        items = items.filter(item => item.status === 'active');
        saveAndRefresh();
    }
};

// Guardado común
const saveAndRefresh = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    applyFilters();
};

// 6. MANEJO DE EVENTOS
// ------------------------------------------------------------
const setupEventListeners = () => {
    // Formulario de creación
    const form = document.getElementById('item-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newItem = {
                id: crypto.randomUUID(),
                name: document.getElementById('item-name').value,
                description: document.getElementById('item-desc').value,
                category: document.getElementById('item-category').value,
                priority: document.getElementById('item-priority').value,
                status: 'active'
            };
            items.push(newItem);
            saveAndRefresh();
            e.target.reset();
        });
    }

    // Botón Limpiar Inactivos
    const clearBtn = document.getElementById('clear-inactive');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearInactiveItems);
    }

    // Filtros en tiempo real
    ['search-input', 'filter-status', 'filter-category', 'filter-priority'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', applyFilters);
        }
    });
};

// Arrancamos todo cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', initApp);