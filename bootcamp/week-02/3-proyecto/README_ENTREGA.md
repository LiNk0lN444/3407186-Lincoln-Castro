Sistema de Gestión de Bodegas - Entrega Semana 2
Información personal
Nombre: Lincoln Eduardo Castro Esquivel

Dominio Asignado: Gestión de Bodegas

Bootcamp: JavaScript Moderno ES2023

Resumen del Proyecto
Esta aplicación permite administrar el inventario físico de una bodega, controlando el flujo de entrada y salida de mercancía. Se ha implementado utilizando Programación Funcional e Inmutabilidad, garantizando que el historial de datos no se corrompa por mutaciones accidentales.

Implementación Técnica (Conceptos Semana 2)
1. Inmutabilidad y Operadores Modernos
Spread Operator (...): Utilizado para la creación de nuevos registros sin modificar el array original: [...items, newItem].

Actualización con .map(): Para editar la información de un estante o producto, se genera un nuevo array basado en el anterior.

Eliminación con .filter(): Se retiran artículos de la bodega filtrando por ID, manteniendo la integridad del estado inicial.

2. Métodos de Array Avanzados
reduce(): Se utilizó para generar un reporte dinámico que agrupa la cantidad de artículos por cada categoría de la bodega (ej. Herramientas, Electrónicos).

Chaining (Encadenamiento): El sistema de búsqueda aplica filtros de texto, prioridad y estado de forma consecutiva para una precisión total.

find(): Implementado para localizar la ficha técnica de un producto antes de abrir el modo edición.

3. Características ES2022 / ES2023
Array.prototype.at(-1): Implementado para identificar y mostrar en la interfaz cuál fue el último movimiento registrado en la bodega.

Object Shorthand: Aplicado para mantener un código limpio al crear objetos donde la propiedad y la variable tienen el mismo nombre.

Funcionalidades CRUD
Create: Registro de nuevos insumos con categoría y nivel de prioridad.

Read: Visualización de la lista de bodega con estados diferenciados (Activo/Inactivo).

Update: Edición completa de datos existentes cargando la información de vuelta al formulario.

Delete: Remoción segura de elementos del inventario.

Persistencia
Se utiliza LocalStorage para asegurar que el inventario de la bodega persista incluso después de cerrar el navegador o recargar la página.

Instrucciones de Ejecución
Abrir el archivo index.html en un navegador moderno.

Utilizar el panel de filtros para segmentar la mercancía de la bodega.

El panel de "Estadísticas Detalladas" mostrará el conteo actualizado mediante lógica de reducción.

Notas del Desarrollador
El código cuenta con nomenclatura técnica en inglés (ej: inventoryItems, applyFilters).

Se incluyeron comentarios explicativos en español para facilitar la revisión del instructor.

La interfaz fue personalizada con colores y emojis coherentes al entorno logístico de una bodega.