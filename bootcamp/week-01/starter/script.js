//week-01 trata de la visualizacion de datos estaticos, una pagina NO funcional
//es la base de datos local de la aplicacion
const entityData = {
  name: "Bodega Central",
  title: "Sistema de Gestión de Inventarios",
  location: "📍 Zona Industrial, Bogotá",
  bio: "Sistema interactivo para la administración de stock, productos y logística en bodegas.",

  contact: {
    email: "contacto@bodega.com",
    phone: "3204567890",
  },

  skills: [
    "Control de inventarios",
    "Gestión de stock",
    "Alertas de bajo inventario",
    "Organización de bodegas",
    "Optimización logística",
    "Dashboard en tiempo real",
  ],

  social: [
    { platform: "Manual Técnico", url: "https://manual-bodega.com" },
    { platform: "Panel de Gestión", url: "https://sistema-bodega.com" }, 
  ],

  stats: {
    total: 350,
    lowStock: 45,
    occupiedSpace: 78,
    capacity: 100
  }
};


const userName = document.getElementById("userName");
const userTitle = document.getElementById("userTitle");
const userLocation = document.getElementById("userLocation");
const userBio = document.getElementById("userBio");

const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");

const skillsList = document.getElementById("skillsList");
const toggleSkills = document.getElementById("toggleSkills");

const socialLinks = document.getElementById("socialLinks");
const statsContainer = document.getElementById("stats");

const themeToggle = document.getElementById("themeToggle");
const copyEmailBtn = document.getElementById("copyEmailBtn");

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

//se encarga de mostrar la informacion de la pagina, con los datos guardados en la variable entityData, se asigna cada dato a su respectivo lugar en el DOM
const renderBasicInfo = () => {
  userName.textContent = entityData.name;
  userTitle.textContent = entityData.title;
  userLocation.textContent = entityData.location;
  userBio.textContent = entityData.bio;

  userEmail.textContent = entityData.contact.email;
  userPhone.textContent = entityData.contact.phone;
};


let showAllSkills = false;
//no saturar al usuario con informacion no relevante para el usuario
const renderSkills = () => {
  const skillsToShow = showAllSkills ? entityData.skills : entityData.skills.slice(0, 3);

  skillsList.innerHTML = skillsToShow
    .map(skill => `<span class="skill-item">${skill}</span>`)
    .join("");

  toggleSkills.textContent = showAllSkills ? "Ver Menos" : "Ver Mas";
};

// encargado de especificar datos personales dentro de la pagina
const renderSocial = () => {
  socialLinks.innerHTML = entityData.social
    .map(link => `<a href="${link.url}" target="_blank">${link.platform}</a>`)
    .join("");
};

// crea estadisticas segun la informacion guardada en la aplicacion
const renderStats = () => {
  const s = entityData.stats;

  statsContainer.innerHTML = `
    <div class="stat-item"><span class="stat-value">${s.total}</span><span class="stat-label">Productos Totales</span></div>
    <div class="stat-item"><span class="stat-value">${s.lowStock}</span><span class="stat-label">Bajo Stock</span></div>
    <div class="stat-item"><span class="stat-value">${s.occupiedSpace}%</span><span class="stat-label">Ocupado</span></div>
    <div class="stat-item"><span class="stat-value">${s.capacity}%</span><span class="stat-label">Capacidad</span></div>
  `;
};

// mejorar la experiencia del usuario, copiando el correo electronico al portapapeles
const copyEmail = () => {
  navigator.clipboard.writeText(entityData.contact.email);
  showToast("Correo copiado al portapapeles");
};


//mensaje rapido que aparece en pantalla y se oculta despues de 3 segundos
const showToast = (msg) => {
  toastMessage.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 3000);
};


// se centra en el interruptor de la pagina para cambiar entre modo claro y oscuro
const toggleThemeMode = () => {
  document.body.classList.toggle("dark");
};

//conecta las acciones del usuario con el codigo
toggleSkills.addEventListener("click", () => {
  showAllSkills = !showAllSkills;
  renderSkills();
});

copyEmailBtn.addEventListener("click", copyEmail);
themeToggle.addEventListener("click", toggleThemeMode);



const init = () => {
  //usuario o entidad
  renderBasicInfo();
  // habilidades
  renderSkills();
  // cargar enlaces o iconos de redes sociales
  renderSocial();
  // estadisticas
  renderStats();
};
// encargada de que TODO se ejecute al cargar la pagina
document.addEventListener("DOMContentLoaded", init);
