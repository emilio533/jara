/**
 * Módulo: Pagos
 * Responsabilidad: Gestión de métodos de pago
 */

const PagosModule = (() => {
  const generarFactura = () => {
    const items = CarritoModule.obtenerTodos();
    
    if (items.length === 0) {
      UIModule.mostrarMensaje('❌ El carrito está vacío', 'error');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const total = CarritoModule.obtenerTotal();

    // Título
    doc.setFontSize(16);
    doc.text('FACTURA - TIENDA MILITAR', 20, 20);

    // Fecha
    doc.setFontSize(10);
    doc.text('Fecha: ' + new Date().toLocaleString(), 20, 30);

    // Encabezado de productos
    let y = 45;
    doc.text('PRODUCTOS', 20, y);
    y += 10;

    // Items
    items.forEach((item, i) => {
      doc.text(
        `${i + 1}. ${item.nombre} - $ ${item.precio.toLocaleString()}`,
        20,
        y
      );
      y += 8;
    });

    // Línea separadora
    y += 5;
    doc.line(20, y, 190, y);
    y += 10;

    // Total
    doc.setFontSize(12);
    doc.text('TOTAL: $ ' + total.toLocaleString(), 20, y);

    // Guardar PDF
    doc.save('factura_tienda_militar.pdf');

    // Registrar venta
    AdminModule.registrarVenta(items.length, total);
    
    // Limpiar carrito
    CarritoModule.vaciar();
    UIModule.toggleModal('modal');
    UIModule.mostrarMensaje('✅ Factura generada correctamente', 'success');
  };

  const pagarWhatsapp = () => {
    const items = CarritoModule.obtenerTodos();
    
    if (items.length === 0) {
      UIModule.mostrarMensaje('❌ El carrito está vacío', 'error');
      return;
    }

    const total = CarritoModule.obtenerTotal();
    const itemsTexto = items.map(item => `${item.nombre} ($${item.precio.toLocaleString()})`).join('\n');
    const mensaje = `Hola, quisiera comprar:\n\n${itemsTexto}\n\n*Total: $${total.toLocaleString()}*`;

    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank');
    
    // Registrar venta
    AdminModule.registrarVenta(items.length, total);
    CarritoModule.vaciar();
    UIModule.toggleModal('modal');
  };

  const pagarNequi = () => {
    const total = CarritoModule.obtenerTotal();
    if (total === 0) {
      UIModule.mostrarMensaje('❌ El carrito está vacío', 'error');
      return;
    }
    UIModule.mostrarMensaje('💳 Redirigiendo a Nequi... (Demostración)');
  };

  const pagarPaypal = () => {
    const total = CarritoModule.obtenerTotal();
    if (total === 0) {
      UIModule.mostrarMensaje('❌ El carrito está vacío', 'error');
      return;
    }
    UIModule.mostrarMensaje('🅿️ Redirigiendo a PayPal... (Demostración)');
  };

  return {
    generarFactura,
    pagarWhatsapp,
    pagarNequi,
    pagarPaypal
  };
})();
