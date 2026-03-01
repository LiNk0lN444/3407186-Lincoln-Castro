// ============================================
// PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
// Dominio: Gestión de Bodega de Herramientas
// ============================================

// --- 1. CLASES BASE (POO con Campos Privados) ---
class BaseEntity {
    #id;
    constructor(id = crypto.randomUUID()) {
        if (new.target === BaseEntity) throw new Error("No se puede instanciar una clase abstracta");
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
    #name; 
    #status;
    constructor(name, priority, id, status = "Disponible") {
        super(id);
        this.name = name;
        this.priority = priority;
        this.#status = status;
    }

    set name(val) {
        if (!val || val.length < 3) throw new Error("El nombre es demasiado corto");
        this.#name = val;
    }

    get name() { return this.#name; }
    get status() { return this.#status; }

    toggleStatus() {
        this.#status = this.#status === "Disponible" ? "En Préstamo" : "Disponible";
    }

    getInfo() {
        return `${this.name} (${this.priority})`;
    }
}

// --- 2. CLASES DERIVADAS (Herencia) ---
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

// --- 3. SISTEMA PRINCIPAL ---
class WarehouseSystem {
    #items = [];
    #users = [];
    #logs = [];

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

    addItem(type, name, priority, extra) {
        const tool = type === 'electrica' 
            ? new ElectricTool(name, priority, extra)
            : new ManualTool(name, priority, extra);
        this.#items.push(tool);
        this.addLog("INGRESO", `Herramienta añadida: ${name}`);
        this.save();
    }

    getAllItems() { return this.#items; }

    save() {
        const raw = this.#items.map(item => ({
            id: item.id,
            name: item.name,
            priority: item.priority,
            status: item.status,
            type: item instanceof ElectricTool ? 'electrica' : 'manual',
            extra: item instanceof ElectricTool ? item.voltage : item.material
        }));
        localStorage.setItem("bodega_data", JSON.stringify(raw));
        localStorage.setItem("bodega_logs", JSON.stringify(this.#logs));
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

    addLog(tipo, descripcion) {
        const log = {
            fecha: new Date().toLocaleString(),
            tipo: tipo,
            desc: descripcion
        };
        this.#logs.unshift(log);
        if (this.#logs.length > 20) this.#logs.pop();
    }

    getLogs() { return this.#logs; }

    getStats() {
        return {
            total: this.#items.length,
            prestados: this.#items.filter(i => i.status !== "Disponible").length,
            usuarios: this.#users.length,
            electricas: this.#items.filter(i => i instanceof ElectricTool).length
        };
    }
}

const system = new WarehouseSystem();

// --- 4. INTERFAZ DE USUARIO (DOM) ---

// --- NUEVA FUNCIÓN: FILTRADO ---
function applyFilters() {
    const searchVal = document.getElementById("search-input")?.value.toLowerCase() || "";
    const typeVal = document.getElementById("filter-type")?.value || "all";
    const statusVal = document.getElementById("filter-status")?.value || "all";

    const allItems = system.getAllItems();
    
    const filtered = allItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchVal);
        
        // Comprobar tipo usando instanceof
        const isElectric = item instanceof ElectricTool;
        const matchesType = typeVal === "all" || 
                           (typeVal === "electrica" && isElectric) || 
                           (typeVal === "manual" && !isElectric);
        
        const matchesStatus = statusVal === "all" || item.status === statusVal;

        return matchesSearch && matchesType && matchesStatus;
    });

    renderCatalog(filtered);
}

function renderCatalog(filterList = null) {
    const list = document.getElementById("item-list");
    if (!list) return;
    const items = filterList || system.getAllItems();
    list.innerHTML = items.map(item => `
        <div class="item-card" onclick="changeStatus('${item.id}')">
            <div><strong>${item.getInfo()}</strong><br><small>ID: ${item.id.substring(0,8)}</small></div>
            <span style="padding:5px; border-radius:4px; color: white; background:${item.status === 'Disponible' ? '#238636' : '#f85149'}">
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
                    <span class="status-badge" style="background:#388bfd; color: white; padding:5px; border-radius:4px;">${u.role}</span>
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

function renderStats() {
    const stats = system.getStats();
    const container = document.getElementById("stats-content");
    if (!container) return;
    container.innerHTML = `
        <div class="stat-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <div class="stat-card" style="padding: 15px; background: #21262d; border-radius: 6px; text-align: center;">
                <h3>${stats.total}</h3><p>Total Equipos</p>
            </div>
            <div class="stat-card" style="padding: 15px; background: #21262d; border-radius: 6px; text-align: center;">
                <h3>${stats.prestados}</h3><p>En Préstamo</p>
            </div>
            <div class="stat-card" style="padding: 15px; background: #21262d; border-radius: 6px; text-align: center;">
                <h3>${stats.usuarios}</h3><p>Personal</p>
            </div>
            <div class="stat-card" style="padding: 15px; background: #21262d; border-radius: 6px; text-align: center;">
                <h3>${stats.electricas}</h3><p>Eléctricas</p>
            </div>
        </div>
    `;
}

window.showSection = function(sectionId, event) {
    document.querySelectorAll('.panel-content').forEach(p => p.style.display = 'none');
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';
    
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

    // --- ESCUCHAR FILTROS ---
    document.getElementById("search-input")?.addEventListener("input", applyFilters);
    document.getElementById("filter-type")?.addEventListener("change", applyFilters);
    document.getElementById("filter-status")?.addEventListener("change", applyFilters);

    const toolForm = document.getElementById("tool-form");
    if (toolForm) {
        toolForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById("t-name").value;
            const type = document.getElementById("t-type").value;
            const prio = document.getElementById("t-priority").value;
            system.addItem(type, name, prio, type === "electrica" ? "220V" : "Acero");
            e.target.reset();
            renderCatalog();
        };
    }
    // DENTRO DE document.addEventListener('DOMContentLoaded', () => { ... })

const inputBusqueda = document.getElementById("search-input");
const selectTipo = document.getElementById("filter-type");
const selectEstado = document.getElementById("filter-status");

// Esto crea el "puente" entre el HTML y la función applyFilters
if (inputBusqueda) {
    inputBusqueda.addEventListener("input", applyFilters); // Se activa al escribir
}
if (selectTipo) {
    selectTipo.addEventListener("change", applyFilters); // Se activa al cambiar opción
}
if (selectEstado) {
    selectEstado.addEventListener("change", applyFilters); // Se activa al cambiar opción
}
});