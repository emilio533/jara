/**
 * Módulo: Admin
 * Responsabilidad: Panel administrativo
 */

const AdminModule = (() => {
  let isAutenticado = false;
  const CONTRASENA = '1234';

  const autenticar = (password) => {
    if (password === CONTRASENA) {
      isAutenticado = true;
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const mostrarPanel = () => {
    const admin = document.getElementById('admin');
    if (admin) admin.classList.add('active');
  };

  const ocultarPanel = () => {
    const admin = document.getElementById('admin');
    if (admin) admin.classList.remove('active');
    isAutenticado = false;
    localStorage.removeItem('adminAuthenticated');
  };

  const agregarProducto = () => {
    const nombre = document.getElementById('n')?.value.trim();
    const precio = document.getElementById('p')?.value;
    const imagen = document.getElementById('i')?.value.trim();
    const categoria = document.getElementById('c')?.value;
    const stock = document.getElementById('s')?.value;

    // Validaciones
    if (!nombre || !precio || !imagen || !stock) {
      UIModule.mostrarMensaje('❌ Completa todos los campos', 'error');
      return;
    }

    if (isNaN(precio) || isNaN(stock)) {
      UIModule.mostrarMensaje('❌ Precio y stock deben ser números', 'error');
      return;
    }

    // Agregar producto
    const producto = ProductosModule.agregarProducto(nombre, precio, imagen, categoria, stock);
    
    // Limpiar formulario
    document.getElementById('n').value = '';
    document.getElementById('p').value = '';
    document.getElementById('i').value = '';
    document.getElementById('s').value = '';

    UIModule.mostrarMensaje(`✅ Producto "${nombre}" agregado correctamente`, 'success');
    TiendaModule.actualizarProductos();
  };

  const verVentas = () => {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const ventasDiv = document.getElementById('ventas');

    if (!ventasDiv) return;

    if (ventas.length === 0) {
      ventasDiv.innerHTML = '<p>No hay ventas registradas</p>';
      return;
    }

    const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
    const cantidadVentas = ventas.length;

    ventasDiv.innerHTML = `
      <div style="background: #e8f5e9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
        <strong>📊 Estadísticas</strong><br>
        Total de ventas: ${cantidadVentas}<br>
        Ingresos: $ ${totalVentas.toLocaleString()}
      </div>
      <h5>Historial de Ventas:</h5>
      ${ventas.slice().reverse().map(v => `
        <div style="border: 1px solid #555; padding: 8px; margin: 5px 0; border-radius: 3px;">
          <small>
            📅 ${v.fecha}<br>
            📦 Items: ${v.items}<br>
            💰 Total: $ ${v.total.toLocaleString()}
          </small>
        </div>
      `).join('')}
    `;
  };

  const registrarVenta = (items, total) => {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push({
      fecha: new Date().toLocaleString(),
      items,
      total
    });
    localStorage.setItem('ventas', JSON.stringify(ventas));
  };

  return {
    autenticar,
    mostrarPanel,
    ocultarPanel,
    agregarProducto,
    verVentas,
    registrarVenta,
    isAutenticado: () => isAutenticado
  };
})();
