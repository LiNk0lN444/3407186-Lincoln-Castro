// --- 1. CLASES BASE (POO) ---
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

// --- 2. SISTEMA DE BODEGA ---
class WarehouseSystem {
    #items = [];
    #users = [];
    #logs = [];

    addUser(name, role, email) {
        const newUser = new User(name, role, email);
        this.#users.push(newUser);
        this.addLog("USUARIO", `Registrado: ${name}`);
        this.save();
    }

    addLog(tipo, desc) {
        this.#logs.unshift({ fecha: new Date().toLocaleString(), tipo, desc });
        if (this.#logs.length > 15) this.#logs.pop();
    }

    addItem(type, name, prio, extra) {
        const tool = type === 'electrica' ? new ElectricTool(name, prio, extra) : new ManualTool(name, prio, extra);
        this.#items.push(tool);
        this.addLog("INGRESO", `Herramienta: ${name}`);
        this.save();
    }

    save() {
        const data = {
            items: this.#items.map(i => ({
                id: i.id, name: i.name, priority: i.priority, status: i.status,
                type: i instanceof ElectricTool ? 'elec' : 'man',
                extra: i instanceof ElectricTool ? i.voltage : i.material
            })),
            users: this.#users,
            logs: this.#logs
        };
        localStorage.setItem("bodega_total_data", JSON.stringify(data));
    }

    load() {
        const data = JSON.parse(localStorage.getItem("bodega_total_data")) || { items: [], users: [], logs: [] };
        this.#items = data.items.map(obj => obj.type === 'elec' 
            ? new ElectricTool(obj.name, obj.priority, obj.extra, obj.id, obj.status)
            : new ManualTool(obj.name, obj.priority, obj.extra, obj.id, obj.status));
        this.#users = data.users.map(u => new User(u.name, u.role, u.email, u.id));
        this.#logs = data.logs;
    }

    getStats() {
        return {
            total: this.#items.length,
            prestados: this.#items.filter(i => i.status !== "Disponible").length,
            usuarios: this.#users.length,
            electricas: this.#items.filter(i => i instanceof ElectricTool).length
        };
    }

    getItems() { return this.#items; }
    getUsers() { return this.#users; }
    getLogs() { return this.#logs; }
}

const system = new WarehouseSystem();

// --- 3. LÓGICA DE INTERFAZ ---
function renderCatalog() {
    const list = document.getElementById("item-list");
    if (!list) return;
    list.innerHTML = system.getItems().map(item => `
        <div class="item-card" onclick="changeStatus('${item.id}')">
            <div class="item-info">
                <strong>${item.name}</strong>
                <small>${item instanceof ElectricTool ? '⚡ ' + item.voltage : '🛠 ' + item.material}</small>
            </div>
            <span class="status-badge ${item.status === 'Disponible' ? 'status-disponible' : 'status-prestamo'}">
                ${item.status}
            </span>
        </div>
    `).join("");
}

window.changeStatus = (id) => {
    const item = system.getItems().find(i => i.id === id);
    if (item) {
        item.toggleStatus();
        system.addLog("ESTADO", `${item.name} ahora ${item.status}`);
        system.save();
        renderCatalog();
    }
};

window.showSection = (id, event) => {
    document.querySelectorAll('.panel-content').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    if (id === 'users') renderUsers();
    if (id === 'transactions') renderTransactions();
    if (id === 'stats') renderStats();
};

function renderUsers() {
    const list = document.getElementById("users-list");
    list.innerHTML = `
        <form id="u-form" class="form-row">
            <input id="u-n" placeholder="Nombre" required>
            <input id="u-e" type="email" placeholder="Email" required>
            <button type="submit">+ Añadir</button>
        </form>
        <div class="item-grid">${system.getUsers().map(u => `
            <div class="item-card"><strong>${u.name}</strong><small>${u.email}</small></div>
        `).join("")}</div>`;
    
    document.getElementById("u-form").onsubmit = (e) => {
        e.preventDefault();
        system.addUser(document.getElementById("u-n").value, "Operario", document.getElementById("u-e").value);
        renderUsers();
    };
}

function renderTransactions() {
    document.getElementById("transactions-list").innerHTML = system.getLogs().map(l => `
        <div class="log-entry"><span><b>[${l.tipo}]</b> ${l.desc}</span><small>${l.fecha}</small></div>
    `).join("") || "Sin movimientos.";
}

function renderStats() {
    const s = system.getStats();
    document.getElementById("stats-content").innerHTML = `
        <div class="stat-grid">
            <div class="stat-card"><h3>${s.total}</h3><p>Equipos</p></div>
            <div class="stat-card"><h3>${s.prestados}</h3><p>Prestados</p></div>
            <div class="stat-card"><h3>${s.usuarios}</h3><p>Personal</p></div>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    system.load();
    renderCatalog();
    const form = document.getElementById("tool-form");
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const type = document.getElementById("t-type").value;
            system.addItem(type, document.getElementById("t-name").value, document.getElementById("t-priority").value, type === "electrica" ? "220V" : "Acero");
            renderCatalog();
        };
    }
});