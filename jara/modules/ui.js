/**
 * Módulo: UI - Renderizado
 * Responsabilidad: Actualizar la interfaz de usuario
 */

const UIModule = (() => {
  const render = {
    productos: (productos, container) => {
      container.innerHTML = productos.map((p, i) => `
        <div class="producto" data-cat="${p.categoria}" data-id="${p.id}">
          <div class="producto-imagen">
            <img src="${p.imagen}" alt="${p.nombre}" 
              onerror="this.src='https://via.placeholder.com/300?text=${encodeURIComponent(p.nombre)}'">
            <span class="categoria-badge">${p.categoria}</span>
          </div>
          <div class="info">
            <h3>${p.nombre}</h3>
            <p class="descripcion">${p.descripcion || 'Producto de calidad militar'}</p>
            <p class="precio">$ ${p.precio.toLocaleString()}</p>
            <p class="stock">
              <strong>Stock:</strong> 
              <span class="stock-count">${p.stock}</span>
            </p>
            <button onclick="TiendaModule.agregarAlCarrito(${i})" class="btn-agregar">
              ${p.stock > 0 ? "🛒 Agregar al carrito" : "❌ Sin stock"}
            </button>
          </div>
        </div>
      `).join('');
    },

    carrito: (items, container, totalElement) => {
      if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">El carrito está vacío</p>';
        totalElement.textContent = '0';
        return;
      }

      container.innerHTML = items.map((item, i) => `
        <div class="carrito-item">
          <div class="item-info">
            <strong>${item.nombre}</strong><br>
            <span class="item-precio">$ ${item.precio.toLocaleString()}</span>
          </div>
          <button class="item-eliminar" onclick="CarritoModule.removerProducto(${i})">
            ✕ Remover
          </button>
        </div>
      `).join('');

      const total = items.reduce((sum, item) => sum + item.precio, 0);
      totalElement.textContent = total.toLocaleString();
    },

    contador: (cantidad) => {
      const contador = document.getElementById('contador');
      if (contador) contador.textContent = cantidad;
    }
  };

  const actualizar = {
    productos: () => {
      const container = document.getElementById('productos');
      if (!container) return;

      const categoria = document.getElementById('categoria')?.value || '';
      const busqueda = document.getElementById('buscar')?.value || '';

      const productos = ProductosModule.filtrar(categoria, busqueda);
      render.productos(productos, container);
    },

    carrito: () => {
      const lista = document.getElementById('lista');
      const totalEl = document.getElementById('total');
      if (!lista || !totalEl) return;

      const items = CarritoModule.obtenerTodos();
      render.carrito(items, lista, totalEl);
    },

    contador: () => {
      const cantidad = CarritoModule.obtenerCantidad();
      render.contador(cantidad);
    }
  };

  const mostrarMensaje = (mensaje, tipo = 'info') => {
    alert(mensaje); // Mejorable con notificaciones más sofisticadas
  };

  const toggleModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.toggle('active');
    }
  };

  return {
    render,
    actualizar,
    mostrarMensaje,
    toggleModal
  };
})();
