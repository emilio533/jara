/**
 * Módulo: Tienda
 * Responsabilidad: Lógica de la tienda y productos
 */

const TiendaModule = (() => {
  let productosFiltrados = [];

  const inicializar = async () => {
    await ProductosModule.cargarProductos();
    actualizarProductos();

    // Suscribirse a cambios del carrito
    CarritoModule.suscribirse(() => {
      UIModule.actualizar.contador();
      UIModule.actualizar.carrito();
    });

    // Eventos de filtrado
    document.getElementById('buscar')?.addEventListener('keyup', actualizarProductos);
    document.getElementById('categoria')?.addEventListener('change', actualizarProductos);
  };

  const actualizarProductos = () => {
    UIModule.actualizar.productos();
  };

  const agregarAlCarrito = (indice) => {
    const productos = ProductosModule.obtenerTodos();
    const producto = productos[indice];

    if (!producto) {
      UIModule.mostrarMensaje('Producto no encontrado', 'error');
      return;
    }

    if (CarritoModule.agregarProducto(producto)) {
      ProductosModule.actualizarStock(producto.id, 1);
      UIModule.mostrarMensaje('✅ Producto agregado al carrito', 'success');
      actualizarProductos();
    } else {
      UIModule.mostrarMensaje('❌ Producto sin stock', 'error');
    }
  };

  const abrirCarrito = () => {
    UIModule.actualizar.carrito();
    UIModule.toggleModal('modal');
  };

  return {
    inicializar,
    agregarAlCarrito,
    abrirCarrito,
    actualizarProductos
  };
})();
