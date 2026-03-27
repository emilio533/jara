/**
 * Módulo: Carrito
 * Responsabilidad: Gestión del carrito de compras
 */

const CarritoModule = (() => {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const observers = [];

  const notificar = () => {
    observers.forEach(callback => callback(carrito));
  };

  const agregarProducto = (producto) => {
    if (producto.stock > 0) {
      carrito.push({
        ...producto,
        timestamp: Date.now()
      });
      guardar();
      notificar();
      return true;
    }
    return false;
  };

  const removerProducto = (indice) => {
    carrito.splice(indice, 1);
    guardar();
    notificar();
  };

  const vaciar = () => {
    carrito = [];
    guardar();
    notificar();
  };

  const obtenerTodos = () => [...carrito];

  const obtenerTotal = () => {
    return carrito.reduce((total, item) => total + item.precio, 0);
  };

  const obtenerCantidad = () => {
    return carrito.length;
  };

  const guardar = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  const suscribirse = (callback) => {
    observers.push(callback);
    callback(carrito); // Ejecutar inmediatamente con el estado actual
    
    // Retornar función para desuscribirse
    return () => {
      const index = observers.indexOf(callback);
      if (index > -1) observers.splice(index, 1);
    };
  };

  return {
    agregarProducto,
    removerProducto,
    vaciar,
    obtenerTodos,
    obtenerTotal,
    obtenerCantidad,
    suscribirse
  };
})();
