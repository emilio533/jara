/**
 * APP.JS - Orquestador Principal
 * Coordina todos los módulos de forma independiente
 */

document.addEventListener('DOMContentLoaded', async () => {
  // ========================================
  // INICIALIZACIÓN DE MÓDULOS
  // ========================================

  // 1. Inicializar tema
  TemaModule.inicializar();

  // 2. Cargar productos y tienda
  await TiendaModule.inicializar();

  // ========================================
  // EVENT LISTENERS - EVENTOS GLOBALES
  // ========================================

  // Búsqueda y filtrado
  document.getElementById('buscar')?.addEventListener('keyup', () => {
    TiendaModule.actualizarProductos();
  });

  document.getElementById('categoria')?.addEventListener('change', () => {
    TiendaModule.actualizarProductos();
  });

  const ejecutarAction = (action) => {
    switch (action) {
      case 'toggle-dark':
        TemaModule.toggle();
        break;
      case 'toggle-cart':
        TiendaModule.abrirCarrito();
        break;
      case 'generate-factura':
        PagosModule.generarFactura();
        break;
      case 'login-admin': {
        const password = prompt('🔐 Ingresa contraseña de administrador:');
        if (password !== null) {
          if (AdminModule.autenticar(password)) {
            UIModule.mostrarMensaje('✅ Acceso de administrador concedido', 'success');
            window.location.href = 'admin.html';
          } else {
            UIModule.mostrarMensaje('❌ Contraseña incorrecta', 'error');
          }
        }
        break;
      }
      case 'pay-whatsapp':
        PagosModule.pagarWhatsapp();
        break;
      case 'pay-nequi':
        PagosModule.pagarNequi();
        break;
      case 'pay-paypal':
        PagosModule.pagarPaypal();
        break;
      case 'add-product':
        AdminModule.agregarProducto();
        break;
      case 'view-sales':
        AdminModule.verVentas();
        break;
      default:
        return;
    }
  };

  document.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.getAttribute('data-action');
    if (action) {
      e.preventDefault();
      ejecutarAction(action);
    }
  });

  console.log('✅ Aplicación inicializada correctamente');
  console.log('📦 Módulos disponibles:', {
    'Productos': 'ProductosModule',
    'Carrito': 'CarritoModule',
    'UI': 'UIModule',
    'Tienda': 'TiendaModule',
    'Admin': 'AdminModule',
    'Pagos': 'PagosModule',
    'Tema': 'TemaModule'
  });
});
