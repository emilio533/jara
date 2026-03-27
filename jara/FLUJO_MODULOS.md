# 📊 Diagrama de Módulos - JARA STORE

## 🎯 Flujo de Datos entre Módulos

```
┌─────────────────────────────────────────────────────────────────┐
│                         DOM / HTML                              │
│                                                                  │
│  [🌙 Tema] [🛒 Carrito] [📄 Factura] [👤 Admin]              │
│  [🔍 Buscar] [📂 Categoría]                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                    Event Listeners
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ↓                  ↓                  ↓
    ┌────────┐      ┌────────────┐      ┌─────────┐
    │ Tema   │      │  Tienda    │      │  Admin  │
    │Module  │      │  Module    │      │ Module  │
    └────────┘      └─────┬──────┘      └────┬────┘
        │                 │                   │
        └─────────────────┼───────────────────┘
                          │
            ┌─────────────┼─────────────┐
            │             │             │
            ↓             ↓             ↓
    ┌──────────────┐  ┌─────────┐  ┌────────┐
    │ Productos    │  │ Carrito │  │ Pagos  │
    │ Module       │  │ Module  │  │ Module │
    └──────────────┘  └────┬────┘  └────────┘
            │               │
            └───────┬───────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ↓                     ↓
    ┌────────┐            ┌─────────┐
    │ UI     │            │Observer │
    │Module  │◄───────────┤Pattern  │
    └────────┘            │Notifica │
         │                │cambios  │
         │                └─────────┘
         │
         ↓
    Actualiza DOM
```

## 🔄 Ciclo de Vida: Agregar Producto al Carrito

```
1. Usuario hace clic en "Agregar al carrito"
        ↓
2. TiendaModule.agregarAlCarrito() se ejecuta
        ↓
3. ProductosModule.actualizarStock() reduce stock
        ↓
4. CarritoModule.agregarProducto() agrega el item
        ↓
5. CarritoModule notifica a sus observadores
        ↓
6. UIModule actualiza:
   - Contador del carrito
   - Lista de productos (menos stock)
   - Carrito visible
        ↓
7. Usuario ve los cambios en pantalla
```

## 📡 Comunicación Entre Módulos

### Patrón 1: Llamada Directa
```javascript
TiendaModule.agregarAlCarrito()
  ↓ Llama a →
CarritoModule.agregarProducto()
```

### Patrón 2: Observer (Suscripción)
```javascript
CarritoModule.suscribirse((carrito) => {
  // Se ejecuta cuando el carrito cambia
  UIModule.actualizar.contador();
})
```

### Patrón 3: Con localStorage
```javascript
ProductosModule → localStorage → CarritoModule
(Persistencia entre sesiones)
```

## 🎭 Interacciones Principales

### Escenario 1: Comprar un Producto
```
Usuario
  ↓ click
TiendaModule
  ↓
ProductosModule.actualizarStock()
CarritoModule.agregarProducto()
  ↓ notifica →
UIModule.actualizar.contador()
UIModule.actualizar.carrito()
UIModule.actualizar.productos()
  ↓
Pantalla actualizada ✅
```

### Escenario 2: Cambiar Tema
```
Usuario
  ↓ click 🌙
TemaModule.toggle()
  ↓
document.body.classList.toggle('dark')
localStorage.setItem('dark-mode', true/false)
  ↓
CSS media queries aplican estilos
Pantalla actualizada ✅
```

### Escenario 3: Generar Factura
```
Usuario
  ↓ click
PagosModule.generarFactura()
  ↓
CarritoModule.obtenerTodos()
CarritoModule.obtenerTotal()
  ↓
Generar PDF con jsPDF
AdminModule.registrarVenta()
CarritoModule.vaciar()
  ↓
Descarga PDF ✅
```

### Escenario 4: Panel Admin
```
Usuario (contraseña: 1234)
  ↓ click 👤
Ingresar contraseña
  ↓
AdminModule.autenticar()
  ↓
AdminModule.mostrarPanel()
  ↓
Panel Admin visible ✅
  ↓
Agregar producto → ProductosModule.agregarProducto()
  ↓
TiendaModule.actualizarProductos()
  ↓
Producto visible en tienda ✅
```

## 🔐 Encapsulación: Qué está PRIVADO vs PÚBLICO

### ProductosModule
```javascript
PRIVADO: let productos = []

PÚBLICO: {
  cargarProductos(),
  obtenerTodos(),
  filtrar(categoria, búsqueda),
  agregarProducto(),
  actualizarStock()
}
```

### CarritoModule
```javascript
PRIVADO: let carrito = []
         let observers = []

PÚBLICO: {
  agregarProducto(producto),
  removerProducto(indice),
  obtenerTodos(),
  obtenerTotal(),
  suscribirse(callback)
}
```

## 🛡️ Ventajas de los Módulos Independientes

| Propiedad | Antes | Después |
|-----------|-------|--------|
| **Acoplamiento** | Alto ❌ | Bajo ✅ |
| **Reutilización** | Difícil ❌ | Fácil ✅ |
| **Testing** | Complejo ❌ | Simple ✅ |
| **Mantenimiento** | Costoso ❌ | Económico ✅ |
| **Escalabilidad** | Limitada ❌ | Ilimitada ✅ |

## 📈 Cómo Extender los Módulos

Para agregar una nueva funcionalidad sin romper nada:

```javascript
// 1. Crear nuevo módulo independiente
const NotificacionesModule = (() => {
  const cola = [];
  
  const agregar = (msg, tipo) => {
    cola.push({ msg, tipo, id: Date.now() });
  };
  
  return { agregar };
})();

// 2. Integrarlo sin cambiar otros módulos
UIModule.mostrarMensaje = (msg, tipo) => {
  NotificacionesModule.agregar(msg, tipo);
};

// ✅ Los módulos existentes siguen funcionando igual
```

## 🚀 Estructura Escalable

```
Proyecto
├── modules/
│   ├── productos.js        ← Datos
│   ├── carrito.js         ← Datos
│   ├── ui.js              ← Presentación
│   ├── tema.js            ← Presentación
│   ├── tienda.js          ← Lógica
│   ├── admin.js           ← Lógica
│   ├── pagos.js           ← Lógica
│   └── [nuevo-modulo.js]  ← Fácil de agregar
├── app.js                 ← Orquestador
└── index.html             ← Interfaz
```

## ✅ Conclusión

Con esta arquitectura modular:

1. **Cada módulo es independiente** - Funciona solo
2. **Sin efectos secundarios** - Cambios localizados
3. **Fácil de probar** - Mock de dependencias
4. **Escalable** - Usa datos del localStorage
5. **Mantenible** - Código organizado y limpio
6. **Profesional** - Patrón usado en empresas

¡Tu tienda ahora es escalable y lista para crecer! 🚀
