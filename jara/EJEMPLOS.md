# 🎓 Ejemplos Prácticos - Cómo Usar los Módulos

## 📚 Guía de Ejemplos

Aquí tienes ejemplos reales de cómo usar cada módulo de forma independiente.

---

## 1️⃣ ProductosModule - Gestionar Productos

### Cargar todos los productos
```javascript
const todos = ProductosModule.obtenerTodos();
console.log('Total de productos:', todos.length);
```

### Obtener productos por categoría
```javascript
const botas = ProductosModule.obtenerPorCategoria('Botas');
console.log('Botas disponibles:', botas);
```

### Buscar productos
```javascript
const resultados = ProductosModule.buscar('casco');
console.log('Resultados de búsqueda:', resultados);
```

### Filtrar por categoría y búsqueda
```javascript
const filtrados = ProductosModule.filtrar('Uniformes', 'camuflaje');
console.log('Uniformes con camuflaje:', filtrados);
```

### Obtener categorías disponibles
```javascript
const categorias = ProductosModule.getCategorias();
console.log('Categorías:', categorias); // ['Botas', 'Uniformes', 'Accesorios']
```

### Agregar nuevo producto (Admin)
```javascript
const nuevoProducto = ProductosModule.agregarProducto(
  'Botas de Montaña',
  195000,
  'https://via.placeholder.com/300',
  'Botas',
  12
);
console.log('Producto agregado:', nuevoProducto);
```

### Actualizar stock
```javascript
ProductosModule.actualizarStock(1, 1); // Reduce stock del producto ID=1 en 1
```

---

## 2️⃣ CarritoModule - Gestionar Carrito

### Agregar producto al carrito
```javascript
const producto = ProductosModule.obtenerPorId(1);
if (producto) {
  CarritoModule.agregarProducto(producto);
  console.log('✅ Producto agregado');
}
```

### Ver items del carrito
```javascript
const items = CarritoModule.obtenerTodos();
items.forEach((item, i) => {
  console.log(`${i + 1}. ${item.nombre} - $${item.precio}`);
});
```

### Obtener total del carrito
```javascript
const total = CarritoModule.obtenerTotal();
console.log('Total a pagar: $' + total.toLocaleString());
```

### Obtener cantidad de items
```javascript
const cantidad = CarritoModule.obtenerCantidad();
console.log('Items en carrito:', cantidad);
```

### Remover producto del carrito
```javascript
CarritoModule.removerProducto(0); // Remover primer producto
```

### Vaciar carrito
```javascript
CarritoModule.vaciar();
console.log('✅ Carrito vaciado');
```

### Suscribirse a cambios del carrito
```javascript
const dejar = CarritoModule.suscribirse((carrito) => {
  console.log('Carrito actualizado:', carrito);
  console.log('Nueva cantidad:', carrito.length);
});

// Luego cuando quieras dejar de escuchar
dejar();
```

---

## 3️⃣ UIModule - Actualizar Interfaz

### Actualizar lista de productos
```javascript
UIModule.actualizar.productos();
// Se filtra por categoría y búsqueda actual
```

### Actualizar carrito en pantalla
```javascript
UIModule.actualizar.carrito();
// Renderiza los items y el total
```

### Actualizar contador del carrito
```javascript
UIModule.actualizar.contador();
// Muestra cantidad en la badge del carrito
```

### Mostrar mensajes
```javascript
UIModule.mostrarMensaje('✅ Operación exitosa', 'success');
UIModule.mostrarMensaje('❌ Error en la operación', 'error');
UIModule.mostrarMensaje('ℹ️ Información importante', 'info');
```

### Abrir/cerrar modal
```javascript
UIModule.toggleModal('modal'); // Abre o cierra el carrito
```

---

## 4️⃣ TemaModule - Gestionar Tema

### Obtener estado actual
```javascript
if (TemaModule.estaActivo()) {
  console.log('🌙 Modo oscuro activo');
} else {
  console.log('☀️ Modo claro activo');
}
```

### Cambiar tema
```javascript
TemaModule.toggle(); // Alterna entre claro y oscuro
```

### Activar forzadamente tema oscuro
```javascript
TemaModule.activar(); // Fuerza tema oscuro
```

### Desactivar forzadamente tema oscuro
```javascript
TemaModule.desactivar(); // Fuerza tema claro
```

---

## 5️⃣ TiendaModule - Lógica de Compra

### Agregar producto al carrito
```javascript
TiendaModule.agregarAlCarrito(0); // Agregar primer producto
```

### Abrir modal del carrito
```javascript
TiendaModule.abrirCarrito();
```

### Actualizar productos mostrados
```javascript
TiendaModule.actualizarProductos();
// Aplica filtros actuales de búsqueda y categoría
```

---

## 6️⃣ AdminModule - Panel Administrativo

### Autenticar como admin
```javascript
if (AdminModule.autenticar('1234')) {
  console.log('✅ Autenticación exitosa');
  // Panel admin visible
} else {
  console.log('❌ Contraseña incorrecta');
}
```

### Agregar producto (desde formulario)
```javascript
// Los inputs deben estar rellenos:
// document.getElementById('n').value = 'Producto X'
// document.getElementById('p').value = 150000
// document.getElementById('i').value = 'URL-imagen'
// document.getElementById('c').value = 'Botas'
// document.getElementById('s').value = 10

AdminModule.agregarProducto(); // Lee los inputs y agrega producto
```

### Ver historial de ventas
```javascript
AdminModule.verVentas();
// Muestra todas las ventas registradas
```

### Registrar una venta (manual)
```javascript
AdminModule.registrarVenta(
  5,      // cantidad de items
  750000  // total en pesos
);
```

### Verificar si está autenticado
```javascript
if (AdminModule.isAutenticado()) {
  console.log('Admin panel activo');
}
```

---

## 7️⃣ PagosModule - Métodos de Pago

### Generar factura PDF
```javascript
PagosModule.generarFactura();
// Genera PDF y descarga como "factura_tienda_militar.pdf"
```

### Pagar por WhatsApp
```javascript
PagosModule.pagarWhatsapp();
// Abre WhatsApp con mensajes del carrito
```

### Pagar con Nequi
```javascript
PagosModule.pagarNequi();
// Redirige a Nequi (implementar después)
```

### Pagar con PayPal
```javascript
PagosModule.pagarPaypal();
// Redirige a PayPal (implementar después)
```

---

## 🔄 Casos de Uso Complejos

### Caso 1: Cliente compra producto
```javascript
// 1. Cliente ve lista de productos
TiendaModule.actualizarProductos();

// 2. Cliente busca "botas"
document.getElementById('buscar').value = 'botas';
TiendaModule.actualizarProductos();

// 3. Cliente agrega producto al carrito
TiendaModule.agregarAlCarrito(0);
// → CarritoModule notifica cambios
// → UIModule actualiza contador y carrito automáticamente

// 4. Cliente abre carrito
TiendaModule.abrirCarrito();

// 5. Cliente genera factura
PagosModule.generarFactura();
// → Carrito se vacía automáticamente
// → Venta se registra en admin
```

### Caso 2: Admin agrega producto
```javascript
// 1. Admin se autentica
AdminModule.autenticar('1234'); // ✅ Abre panel

// 2. Admin rellena formulario
document.getElementById('n').value = 'Botas Nuevas';
document.getElementById('p').value = '180000';
document.getElementById('i').value = 'https://...';
document.getElementById('c').value = 'Botas';
document.getElementById('s').value = '15';

// 3. Admin agrega producto
AdminModule.agregarProducto();
// → ProductosModule agrega producto
// → Carrito notifica cambios
// → Tienda actualiza productos automáticamente
// → Clientes ven el nuevo producto
```

### Caso 3: Suscribirse a todos los cambios
```javascript
// Monitorear cambios del carrito
const unsubscribe = CarritoModule.suscribirse((carrito) => {
  console.log('Carrito cambió:', carrito);
  
  // Actualizar UI
  UIModule.actualizar.contador();
  UIModule.actualizar.carrito();
  
  // Guardar en analytics
  console.log('Total en carrito: $' + CarritoModule.obtenerTotal());
});

// Cuando ya no necesites escuchar
unsubscribe();
```

### Caso 4: Buscar y filtrar
```javascript
// Obtener uniformes de camuflaje
const uniformesCamuflaje = ProductosModule.filtrar(
  'Uniformes',
  'camuflaje'
);

// Renderizar directamente
UIModule.render.productos(uniformesCamuflaje, document.getElementById('productos'));
```

---

## 🧪 Testing (Ejemplos)

```javascript
// Test: Agregar y remover del carrito
console.log('TEST 1: Carrito');
const inicial = CarritoModule.obtenerCantidad();
console.assert(inicial === 0, 'Carrito debe empezar vacío');

const producto = ProductosModule.obtenerPorId(1);
CarritoModule.agregarProducto(producto);
console.assert(CarritoModule.obtenerCantidad() === 1, 'Debe haber 1 item');

CarritoModule.removerProducto(0);
console.assert(CarritoModule.obtenerCantidad() === 0, 'Debe estar vacío de nuevo');
```

---

## 🎯 Buenas Prácticas

✅ **Usar módulos en orden**
```javascript
// CORRECTO: Primero datos, luego lógica
ProductosModule.cargarProductos();
TiendaModule.inicializar();
```

✅ **Suscribirse una sola vez**
```javascript
// En app.js (no repetir en otros lugares)
CarritoModule.suscribirse(() => {
  UIModule.actualizar.contador();
});
```

✅ **No mezclar responsabilidades**
```javascript
// MALO: ❌
CarritoModule.render(); // No, eso es de UIModule

// BUENO: ✅
UIModule.actualizar.carrito();
```

---

## 📞 Preguntas Frecuentes

**P: ¿Cómo sé cuando el carrito cambia?**
R: Suscríbete con `CarritoModule.suscribirse(callback)`

**P: ¿Puedo usar múltiples módulos juntos?**
R: Sí, están diseñados para ello:
```javascript
ProductosModule → TiendaModule → CarritoModule → UIModule
```

**P: ¿Los datos se guardan?**
R: Sí, en localStorage automáticamente

**P: ¿Cómo agrego nueva funcionalidad?**
R: Crea un nuevo módulo con el mismo patrón IIFE

---

**¡Ahora sabes cómo usar cada módulo independientemente! 🚀**
