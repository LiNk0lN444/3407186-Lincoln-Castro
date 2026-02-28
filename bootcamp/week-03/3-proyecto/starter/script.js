<<<<<<< HEAD
/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 * Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODAS las clases a tu dominio asignado por el instructor
 * 3. Usa características ES2023 de POO:
 *    - Clases con constructor
 *    - Campos privados (#)
 *    - Getters y setters
 *    - Herencia (extends, super)
 *    - Métodos estáticos
 *    - Static blocks
 * 4. Los comentarios deben estar en español
 * 5. La nomenclatura técnica (variables, funciones, clases) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes y observaciones
 *
 * ============================================
 */

// ============================================
// TODO 1: CLASE BASE - BaseItem
// ============================================
/**
 * Clase base abstracta para todos los elementos de tu dominio.
 * Implementa encapsulación con campos privados.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class CelestialBody { ... }
 *
 * Debes renombrar esta clase según tu dominio:
 * - Biblioteca → LibraryItem
 * - Farmacia → Medicine
 * - Gimnasio → Equipment
 * - etc.
 */
class BaseItem {
  // TODO: Declara los campos privados de tu clase base
  // Estos son los campos mínimos requeridos:
  // #id;
  // #name;
  // #active;
  // #location;
  // #dateCreated;
  //
  // EJEMPLO Planetario - campos adicionales específicos:
  // #magnitude;
  // #distance;

  /**
   * Constructor de la clase base
   * @param {string} name - Nombre del elemento
   * @param {string} location - Ubicación del elemento
   */
  constructor(name, location) {
    // TODO: Inicializa los campos privados
    // this.#id = crypto.randomUUID();
    // this.#name = name;
    // this.#location = location;
    // this.#active = true;
    // this.#dateCreated = new Date().toISOString();
  }

  // ============================================
  // GETTERS - Acceso controlado a propiedades
  // ============================================

  /**
   * Retorna el ID único del elemento
   */
  get id() {
    // TODO: Implementa el getter
    // return this.#id;
  }

  /**
   * Retorna el nombre del elemento
   */
  get name() {
    // TODO: Implementa el getter
  }

  /**
   * Retorna si el elemento está activo
   */
  get isActive() {
    // TODO: Implementa el getter
  }

  /**
   * Retorna la ubicación del elemento
   */
  get location() {
    // TODO: Implementa el getter
  }

  /**
   * Retorna la fecha de creación
   */
  get dateCreated() {
    // TODO: Implementa el getter
  }

  // ============================================
  // SETTERS - Modificación controlada con validación
  // ============================================

  /**
   * Establece la ubicación con validación
   * @param {string} value - Nueva ubicación
   */
  set location(value) {
    // TODO: Implementa el setter con validación
    // if (!value || value.trim() === '') {
    //   throw new Error('La ubicación no puede estar vacía');
    // }
    // this.#location = value.trim();
  }

  // ============================================
  // MÉTODOS DE INSTANCIA
  // ============================================

  /**
   * Activa el elemento
   * @returns {Object} Resultado de la operación
   */
  activate() {
    // TODO: Implementa la activación
    // if (this.#active) {
    //   return { success: false, message: 'El elemento ya está activo' };
    // }
    // this.#active = true;
    // return { success: true, message: 'Elemento activado correctamente' };
  }

  /**
   * Desactiva el elemento
   * @returns {Object} Resultado de la operación
   */
  deactivate() {
    // TODO: Implementa la desactivación
  }

  /**
   * Método abstracto - DEBE ser sobrescrito en clases hijas
   * @returns {Object} Información del elemento
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado en la clase hija');
  }

  /**
   * Retorna el tipo de elemento (nombre de la clase)
   * @returns {string} Nombre del constructor
   */
  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Tipos de Elementos
// ============================================
/**
 * Crea al menos 3 clases que extiendan tu clase base.
 * Cada clase debe tener:
 * - Campos privados adicionales específicos
 * - Constructor que llame a super()
 * - Getters para las nuevas propiedades
 * - Implementación de getInfo()
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Planet extends CelestialBody {
 *   #type;      // Rocoso, gaseoso, etc.
 *   #moons;     // Número de lunas
 *   #hasRings;  // Tiene anillos
 *
 *   constructor(name, location, type, moons, hasRings) {
 *     super(name, location);
 *     this.#type = type;
 *     this.#moons = moons;
 *     this.#hasRings = hasRings;
 *   }
 *
 *   get type() { return this.#type; }
 *   get moons() { return this.#moons; }
 *   get hasRings() { return this.#hasRings; }
 *
 *   getInfo() {
 *     return {
 *       id: this.id,
 *       name: this.name,
 *       location: this.location,
 *       type: this.#type,
 *       moons: this.#moons,
 *       hasRings: this.#hasRings,
 *       active: this.isActive
 *     };
 *   }
 * }
 */

// TODO: Implementa tu primera clase derivada (Tipo 1)
// class ItemType1 extends BaseItem {
//   #specificProp1;
//   #specificProp2;
//
//   constructor(name, location, prop1, prop2) {
//     super(name, location);
//     this.#specificProp1 = prop1;
//     this.#specificProp2 = prop2;
//   }
//
//   // Getters
//   get specificProp1() { return this.#specificProp1; }
//   get specificProp2() { return this.#specificProp2; }
//
//   // Implementación de getInfo
//   getInfo() {
//     return {
//       id: this.id,
//       name: this.name,
//       type: this.getType(),
//       prop1: this.#specificProp1,
//       prop2: this.#specificProp2,
//       active: this.isActive
//     };
//   }
// }

// TODO: Implementa tu segunda clase derivada (Tipo 2)
// class ItemType2 extends BaseItem { ... }

// TODO: Implementa tu tercera clase derivada (Tipo 3)
// class ItemType3 extends BaseItem { ... }

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================
/**
 * Clase base para todos los usuarios del sistema.
 *
 * EJEMPLO (Planetario - NO asignable):
 * Person → Visitor (visitante), Astronomer (astrónomo)
 */
class Person {
  // TODO: Declara campos privados
  // #id;
  // #name;
  // #email;
  // #registrationDate;

  constructor(name, email) {
    // TODO: Inicializa los campos
    // this.#id = crypto.randomUUID();
    // this.#name = name;
    // this.#email = email;
    // this.#registrationDate = new Date().toISOString();
  }

  // TODO: Implementa getters
  get id() {}
  get name() {}
  get email() {}
  get registrationDate() {}

  // TODO: Implementa setter con validación de email
  set email(value) {
    // Valida formato de email usando regex
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(value)) {
    //   throw new Error('Formato de email inválido');
    // }
    // this.#email = value;
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
    // return {
    //   id: this.#id,
    //   name: this.#name,
    //   email: this.#email,
    //   registrationDate: this.#registrationDate
    // };
  }
}

// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================
/**
 * Crea al menos 2 clases que extiendan Person con diferentes roles.
 *
 * EJEMPLO (Planetario - NO asignable):
 *
 * class Visitor extends Person {
 *   #ticketType;
 *   #visitCount;
 *
 *   constructor(name, email, ticketType) {
 *     super(name, email);
 *     this.#ticketType = ticketType;
 *     this.#visitCount = 0;
 *   }
 *
 *   recordVisit() {
 *     this.#visitCount++;
 *   }
 *
 *   get ticketType() { return this.#ticketType; }
 *   get visitCount() { return this.#visitCount; }
 * }
 *
 * class Astronomer extends Person {
 *   #specialty;
 *   #observations;
 *
 *   constructor(name, email, specialty) {
 *     super(name, email);
 *     this.#specialty = specialty;
 *     this.#observations = [];
 *   }
 *
 *   addObservation(observation) {
 *     this.#observations.push(observation);
 *   }
 * }
 */

// TODO: Implementa tu primer rol de usuario
// class UserRole1 extends Person { ... }

// TODO: Implementa tu segundo rol de usuario
// class UserRole2 extends Person { ... }

// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================
/**
 * Clase principal que gestiona todos los elementos y usuarios.
 * Utiliza static blocks para configuración inicial.
 *
 * EJEMPLO (Planetario - NO asignable):
 * class Observatory { ... }
 */
class MainSystem {
  // Campos privados para almacenar datos
  #items = [];
  #users = [];
  #transactions = [];

  // TODO: Implementa un static block para configuración
  static {
    // Este bloque se ejecuta cuando la clase se carga
    // this.VERSION = '1.0.0';
    // this.MAX_ITEMS = 1000;
    // this.SYSTEM_NAME = 'Mi Sistema'; // Cambia por tu dominio
    // console.log(`Sistema ${this.SYSTEM_NAME} v${this.VERSION} cargado`);
  }

  // TODO: Implementa métodos estáticos de utilidad
  /**
   * Valida si un ID tiene formato correcto
   * @param {string} id - ID a validar
   * @returns {boolean} Si es válido
   */
  static isValidId(id) {
    // return typeof id === 'string' && id.length > 0;
  }

  /**
   * Genera un ID único
   * @returns {string} ID único
   */
  static generateId() {
    // return crypto.randomUUID();
  }

  // ============================================
  // MÉTODOS CRUD PARA ITEMS
  // ============================================

  /**
   * Agrega un nuevo elemento al sistema
   * @param {BaseItem} item - Elemento a agregar
   * @returns {Object} Resultado de la operación
   */
  addItem(item) {
    // TODO: Implementa la adición con validación
    // if (!(item instanceof BaseItem)) {
    //   return { success: false, message: 'El item debe ser instancia de BaseItem' };
    // }
    // if (this.#items.length >= MainSystem.MAX_ITEMS) {
    //   return { success: false, message: 'Límite de items alcanzado' };
    // }
    // this.#items.push(item);
    // return { success: true, message: 'Item agregado correctamente', item };
  }

  /**
   * Elimina un elemento por su ID
   * @param {string} id - ID del elemento a eliminar
   * @returns {Object} Resultado de la operación
   */
  removeItem(id) {
    // TODO: Implementa la eliminación
    // const index = this.#items.findIndex(item => item.id === id);
    // if (index === -1) {
    //   return { success: false, message: 'Item no encontrado' };
    // }
    // const removed = this.#items.splice(index, 1)[0];
    // return { success: true, message: 'Item eliminado', item: removed };
  }

  /**
   * Busca un elemento por su ID
   * @param {string} id - ID del elemento
   * @returns {BaseItem|null} Elemento encontrado o null
   */
  findItem(id) {
    // TODO: Implementa la búsqueda
    // return this.#items.find(item => item.id === id) ?? null;
  }

  /**
   * Retorna todos los elementos
   * @returns {Array} Copia del array de elementos
   */
  getAllItems() {
    // Retorna copia para evitar mutación directa
    // return [...this.#items];
  }

  // ============================================
  // MÉTODOS DE BÚSQUEDA Y FILTRADO
  // ============================================

  /**
   * Busca elementos por nombre
   * @param {string} query - Texto a buscar
   * @returns {Array} Elementos que coinciden
   */
  searchByName(query) {
    // TODO: Implementa búsqueda case-insensitive
    // const searchTerm = query.toLowerCase();
    // return this.#items.filter(item =>
    //   item.name.toLowerCase().includes(searchTerm)
    // );
  }

  /**
   * Filtra elementos por tipo (clase)
   * @param {string} type - Nombre de la clase
   * @returns {Array} Elementos del tipo especificado
   */
  filterByType(type) {
    // TODO: Implementa el filtro por tipo
    // return this.#items.filter(item => item.getType() === type);
  }

  /**
   * Filtra elementos por estado activo
   * @param {boolean} active - Estado a filtrar
   * @returns {Array} Elementos con el estado especificado
   */
  filterByStatus(active) {
    // TODO: Implementa el filtro por estado
    // return this.#items.filter(item => item.isActive === active);
  }

  // ============================================
  // MÉTODOS DE ESTADÍSTICAS
  // ============================================

  /**
   * Calcula estadísticas del sistema
   * @returns {Object} Estadísticas
   */
  getStats() {
    // TODO: Implementa el cálculo de estadísticas usando reduce
    // const total = this.#items.length;
    // const active = this.#items.filter(item => item.isActive).length;
    // const inactive = total - active;
    //
    // // Contar por tipo usando reduce
    // const byType = this.#items.reduce((acc, item) => {
    //   const type = item.getType();
    //   acc[type] = (acc[type] ?? 0) + 1;
    //   return acc;
    // }, {});
    //
    // return {
    //   total,
    //   active,
    //   inactive,
    //   byType,
    //   users: this.#users.length
    // };
  }

  // ============================================
  // MÉTODOS PARA USUARIOS
  // ============================================

  /**
   * Registra un nuevo usuario
   * @param {Person} user - Usuario a registrar
   */
  addUser(user) {
    // TODO: Implementa el registro de usuario
    // if (!(user instanceof Person)) {
    //   return { success: false, message: 'Debe ser instancia de Person' };
    // }
    // this.#users.push(user);
    // return { success: true, message: 'Usuario registrado' };
  }

  /**
   * Busca un usuario por email
   * @param {string} email - Email del usuario
   * @returns {Person|null} Usuario encontrado o null
   */
  findUserByEmail(email) {
    // return this.#users.find(user => user.email === email) ?? null;
  }

  getAllUsers() {
    // return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// Crea la instancia principal del sistema
// const system = new MainSystem();

// TODO: Crea algunos elementos de prueba de diferentes tipos
// EJEMPLO (Planetario):
// const jupiter = new Planet('Júpiter', 'Sistema Solar', 'gaseoso', 95, true);
// const sol = new Star('Sol', 'Centro del Sistema', 'enana amarilla', 4600);
// system.addItem(jupiter);
// system.addItem(sol);

// ============================================
// TODO 7: REFERENCIAS AL DOM
// ============================================

// TODO: Obtén referencias a los elementos del DOM
// const itemForm = document.getElementById('item-form');
// const itemList = document.getElementById('item-list');
// const statsContainer = document.getElementById('stats');
// const filterType = document.getElementById('filter-type');
// const filterStatus = document.getElementById('filter-status');
// const searchInput = document.getElementById('search-input');

// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza un elemento individual
 * @param {BaseItem} item - Elemento a renderizar
 * @returns {string} HTML del elemento
 */
const renderItem = item => {
  // TODO: Implementa usando template literals
  // const info = item.getInfo();
  // return `
  //   <div class="item ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
  //     <div class="item-header">
  //       <h3>${item.name}</h3>
  //       <span class="badge">${item.getType()}</span>
  //     </div>
  //     <div class="item-details">
  //       <p>Ubicación: ${item.location}</p>
  //       <p>Estado: ${item.isActive ? 'Activo' : 'Inactivo'}</p>
  //     </div>
  //     <div class="item-actions">
  //       <button class="btn-toggle" data-id="${item.id}">
  //         ${item.isActive ? 'Desactivar' : 'Activar'}
  //       </button>
  //       <button class="btn-delete" data-id="${item.id}">Eliminar</button>
  //     </div>
  //   </div>
  // `;
};

/**
 * Renderiza la lista completa de elementos
 * @param {Array} items - Array de elementos
 */
const renderItems = (items = []) => {
  // TODO: Implementa el renderizado de la lista
  // if (items.length === 0) {
  //   itemList.innerHTML = '<p class="empty">No hay elementos</p>';
  //   return;
  // }
  // itemList.innerHTML = items.map(renderItem).join('');
};

/**
 * Renderiza las estadísticas
 * @param {Object} stats - Objeto de estadísticas
 */
const renderStats = stats => {
  // TODO: Implementa el renderizado de estadísticas
  // statsContainer.innerHTML = `
  //   <div class="stat">Total: ${stats.total}</div>
  //   <div class="stat">Activos: ${stats.active}</div>
  //   <div class="stat">Inactivos: ${stats.inactive}</div>
  // `;
};

// ============================================
// TODO 9: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario
 */
const handleFormSubmit = e => {
  // TODO: Implementa la creación de nuevos elementos
  // e.preventDefault();
  // Obtén valores del formulario
  // Crea instancia de la clase correcta según el tipo seleccionado
  // Agrega al sistema
  // Re-renderiza
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  // TODO: Implementa el filtrado
  // let filtered = system.getAllItems();
  // Aplica filtros según los valores de los selectores
  // renderItems(filtered);
};

/**
 * Maneja acciones en los elementos (toggle, delete)
 */
const handleItemAction = e => {
  // TODO: Implementa usando event delegation
  // const target = e.target;
  // const itemId = target.dataset.id;
  // if (!itemId) return;
  //
  // if (target.classList.contains('btn-toggle')) {
  //   const item = system.findItem(itemId);
  //   if (item.isActive) item.deactivate();
  //   else item.activate();
  // }
  //
  // if (target.classList.contains('btn-delete')) {
  //   if (confirm('¿Eliminar este elemento?')) {
  //     system.removeItem(itemId);
  //   }
  // }
  //
  // handleFilterChange();
  // renderStats(system.getStats());
};

// ============================================
// TODO 10: EVENT LISTENERS
// ============================================

// TODO: Adjunta los event listeners
// itemForm.addEventListener('submit', handleFormSubmit);
// filterType.addEventListener('change', handleFilterChange);
// filterStatus.addEventListener('change', handleFilterChange);
// searchInput.addEventListener('input', handleFilterChange);
// itemList.addEventListener('click', handleItemAction);

// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // TODO: Implementa la inicialización
  // renderItems(system.getAllItems());
  // renderStats(system.getStats());
  // console.log('✅ Sistema inicializado correctamente');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// CLASES Y HERENCIA:
// ✓ Clase base con campos privados
// ✓ Mínimo 3 clases derivadas con extends
// ✓ Uso correcto de super() en constructores
// ✓ Método getInfo() implementado en cada clase derivada
//
// ENCAPSULACIÓN:
// ✓ Todos los campos son privados (#)
// ✓ Getters para acceso a propiedades
// ✓ Setters con validación donde corresponda
//
// CARACTERÍSTICAS MODERNAS:
// ✓ Static block en clase principal
// ✓ Métodos estáticos de utilidad
// ✓ Uso de crypto.randomUUID() para IDs
//
// CÓDIGO:
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
// ✓ Nombres de clases adaptados a mi dominio
// ✓ Sin copiar implementación de otros compañeros
=======
// --- CLASES (Mantenemos tus clases exactamente igual) ---
class BaseEntity {
    #id;
    constructor(id = crypto.randomUUID()) {
        if (new.target === BaseEntity) throw new Error("Clase abstracta");
        this.#id = id;
    }
    get id() { return this.#id; }
}

class User extends BaseEntity {
    constructor(name, role, email, id) {
        super(id);
        this.name = name;
        this.role = role;
        this.email = email;
    }
}

class Tool extends BaseEntity {
    #name; #status;
    constructor(name, priority, id, status = "Disponible") {
        super(id);
        this.name = name;
        this.priority = priority;
        this.#status = status;
    }
    set name(val) {
        if (!val || val.length < 3) throw new Error("Nombre muy corto");
        this.#name = val;
    }
    get name() { return this.#name; }
    get status() { return this.#status; }
    toggleStatus() {
        this.#status = this.#status === "Disponible" ? "En Préstamo" : "Disponible";
    }
    getInfo() { return `${this.name} (${this.priority})`; }
}

class ElectricTool extends Tool {
    constructor(name, priority, voltage, id, status) {
        super(name, priority, id, status);
        this.voltage = voltage;
    }
}

class ManualTool extends Tool {
    constructor(name, priority, material, id, status) {
        super(name, priority, id, status);
        this.material = material;
    }
}

// --- SISTEMA (Añadimos logs y stats) ---
class WarehouseSystem {
    #items = [];
    #users = [];
    #logs = []; // Para Transacciones

    addUser(name, role, email) {
        const newUser = new User(name, role, email);
        this.#users.push(newUser);
        this.addLog("USUARIO", `Registrado: ${name} (${role})`);
        this.saveUsers();
        return newUser;
    }

    getUsers() { return this.#users; }

    saveUsers() {
        localStorage.setItem("bodega_users", JSON.stringify(this.#users));
    }

    loadUsers() {
        const data = JSON.parse(localStorage.getItem("bodega_users")) || [];
        this.#users = data.map(u => new User(u.name, u.role, u.email, u.id));
    }

    save() {
        const raw = this.#items.map(item => ({
            id: item.id, name: item.name, priority: item.priority,
            status: item.status, type: item instanceof ElectricTool ? 'electrica' : 'manual',
            extra: item instanceof ElectricTool ? item.voltage : item.material
        }));
        localStorage.setItem("bodega_data", JSON.stringify(raw));
        localStorage.setItem("bodega_logs", JSON.stringify(this.#logs)); // Guardar logs
    }

    load() {
        const data = JSON.parse(localStorage.getItem("bodega_data")) || [];
        this.#items = data.map(obj => {
            return obj.type === 'electrica' 
                ? new ElectricTool(obj.name, obj.priority, obj.extra, obj.id, obj.status)
                : new ManualTool(obj.name, obj.priority, obj.extra, obj.id, obj.status);
        });
        this.#logs = JSON.parse(localStorage.getItem("bodega_logs")) || [];
    }

    addItem(type, name, priority, extra) {
        const tool = type === 'electrica' 
            ? new ElectricTool(name, priority, extra)
            : new ManualTool(name, priority, extra);
        this.#items.push(tool);
        this.addLog("INGRESO", `Herramienta añadida: ${name}`);
        this.save();
    }

    // Funciones de Transacciones
    addLog(tipo, descripcion) {
        const log = {
            fecha: new Date().toLocaleString(),
            tipo: tipo,
            desc: descripcion
        };
        this.#logs.unshift(log); // Lo más nuevo arriba
        if (this.#logs.length > 20) this.#logs.pop(); // Límite de 20
    }

    getLogs() { return this.#logs; }

    // Funciones de Estadísticas
    getStats() {
        return {
            total: this.#items.length,
            prestados: this.#items.filter(i => i.status !== "Disponible").length,
            usuarios: this.#users.length,
            electricas: this.#items.filter(i => i instanceof ElectricTool).length
        };
    }

    getAllItems() { return this.#items; }
}

const system = new WarehouseSystem();

// --- INTERFAZ ---

// Renderizar Catálogo (Añadido para que funcione el inicio)
function renderCatalog(filterList = null) {
    const list = document.getElementById("item-list");
    if (!list) return;
    const items = filterList || system.getAllItems();
    list.innerHTML = items.map(item => `
        <div class="item-card" onclick="changeStatus('${item.id}')">
            <div><strong>${item.getInfo()}</strong><br><small>ID: ${item.id.substring(0,8)}</small></div>
            <span style="padding:5px; border-radius:4px; background:${item.status === 'Disponible' ? '#238636' : '#f85149'}">
                ${item.status}
            </span>
        </div>
    `).join("");
}

window.changeStatus = (id) => {
    const item = system.getAllItems().find(i => i.id === id);
    if (item) {
        item.toggleStatus();
        system.addLog("ESTADO", `Cambio en ${item.name}: ${item.status}`);
        system.save();
        renderCatalog();
    }
};

function renderUsers() {
    const list = document.getElementById("users-list");
    if (!list) return;
    const users = system.getUsers();
    list.innerHTML = `
        <form id="user-form" style="display:flex; gap:10px; margin-bottom:20px;">
            <input type="text" id="u-name" placeholder="Nombre" required>
            <input type="email" id="u-email" placeholder="Email" required>
            <select id="u-role">
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
            </select>
            <button type="submit" style="cursor:pointer">+ Registrar</button>
        </form>
        <div class="user-grid">
            ${users.map(u => `
                <div class="item-card">
                    <div><strong>${u.name}</strong><br><small>${u.email}</small></div>
                    <span class="status-badge" style="background:#388bfd; padding:5px; border-radius:4px;">${u.role}</span>
                </div>
            `).join("")}
        </div>
    `;

    document.getElementById("user-form").onsubmit = (e) => {
        e.preventDefault();
        system.addUser(
            document.getElementById("u-name").value,
            document.getElementById("u-role").value,
            document.getElementById("u-email").value
        );
        renderUsers();
    };
}

// NUEVA: Renderizar Transacciones
function renderTransactions() {
    const list = document.getElementById("transactions-list");
    if (!list) return;
    const logs = system.getLogs();
    list.innerHTML = logs.map(l => `
        <div style="padding:10px; border-bottom:1px solid #30363d; display:flex; justify-content:space-between;">
            <span><strong>[${l.tipo}]</strong> ${l.desc}</span>
            <small style="color:#8b949e">${l.fecha}</small>
        </div>
    `).join("") || "No hay movimientos registrados.";
}

// NUEVA: Renderizar Estadísticas
function renderStats() {
    const stats = system.getStats();
    const container = document.getElementById("stats-content");
    if (!container) return;
    container.innerHTML = `
        <div class="stat-grid">
            <div class="stat-card"><h3>${stats.total}</h3><p>Total Equipos</p></div>
            <div class="stat-card"><h3>${stats.prestados}</h3><p>En Préstamo</p></div>
            <div class="stat-card"><h3>${stats.usuarios}</h3><p>Personal</p></div>
            <div class="stat-card"><h3>${stats.electricas}</h3><p>Eléctricas</p></div>
        </div>
    `;
}

window.showSection = function(sectionId, event) {
    document.querySelectorAll('.panel-content').forEach(p => p.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    
    // Llamar a los renders según la pestaña
    if (sectionId === 'users') renderUsers();
    if (sectionId === 'transactions') renderTransactions();
    if (sectionId === 'stats') renderStats();
    if (sectionId === 'catalog') renderCatalog();

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    system.load();
    system.loadUsers();
    renderCatalog();

    // Evento para añadir herramientas
    document.getElementById("tool-form").onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("t-name").value;
        const type = document.getElementById("t-type").value;
        const prio = document.getElementById("t-priority").value;
        system.addItem(type, name, prio, type === "electrica" ? "220V" : "Acero");
        e.target.reset();
        renderCatalog();
    };
});
>>>>>>> 4209ef9 (Fix:Semana 3)
