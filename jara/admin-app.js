/**
 * ADMIN-APP.JS - Orquestador para Panel Administrativo
 * Coordina módulos para el panel de administración
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Verificar autenticación
  if (localStorage.getItem('adminAuthenticated') !== 'true') {
    alert('Acceso denegado. Debes iniciar sesión como administrador.');
    window.location.href = 'index.html';
    return;
  }

  // ========================================
  // INICIALIZACIÓN DE MÓDULOS
  // ========================================

  // 1. Inicializar tema
  TemaModule.inicializar();

  // 2. Cargar productos
  await ProductosModule.cargarProductos();

  // 3. Inicializar UI para mensajes
  UIModule.inicializar();

  // ========================================
  // EVENT LISTENERS - EVENTOS GLOBALES
  // ========================================

  const ejecutarAction = (action) => {
    switch (action) {
      case 'toggle-dark':
        TemaModule.toggle();
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

  console.log('✅ Panel administrativo inicializado correctamente');
});