/**
 * Módulo: Productos
 * Responsabilidad: Gestión de datos de productos
 */

const ProductosModule = (() => {
  let productos = [];

  const cargarProductos = async () => {
    try {
      const response = await fetch('productos.json');
      const data = await response.json();
      
      if (localStorage.getItem('productos') === null) {
        productos = data;
        guardarProductos();
      } else {
        productos = JSON.parse(localStorage.getItem('productos'));
      }
      
      return productos;
    } catch (error) {
      console.error('Error cargando productos:', error);
      return [];
    }
  };

  const guardarProductos = () => {
    localStorage.setItem('productos', JSON.stringify(productos));
  };

  const obtenerTodos = () => [...productos];

  const obtenerPorCategoria = (categoria) => {
    return productos.filter(p => p.categoria === categoria);
  };

  const obtenerPorId = (id) => {
    return productos.find(p => p.id === id);
  };

  const buscar = (termino) => {
    const termino_lower = termino.toLowerCase();
    return productos.filter(p => 
      p.nombre.toLowerCase().includes(termino_lower) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(termino_lower))
    );
  };

  const filtrar = (categoria, busqueda) => {
    let filtrados = productos;

    if (categoria) {
      filtrados = filtrados.filter(p => p.categoria === categoria);
    }

    if (busqueda) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return filtrados;
  };

  const agregarProducto = (nombre, precio, imagen, categoria, stock) => {
    const nuevoProducto = {
      id: Math.max(...productos.map(p => p.id), 0) + 1,
      nombre,
      precio: parseInt(precio),
      imagen,
      categoria,
      stock: parseInt(stock),
      descripcion: 'Producto de calidad militar'
    };

    productos.push(nuevoProducto);
    guardarProductos();
    return nuevoProducto;
  };

  const actualizarStock = (id, cantidad) => {
    const producto = productos.find(p => p.id === id);
    if (producto) {
      producto.stock -= cantidad;
      guardarProductos();
      return true;
    }
    return false;
  };

  const getCategorias = () => {
    return [...new Set(productos.map(p => p.categoria))];
  };

  return {
    cargarProductos,
    obtenerTodos,
    obtenerPorCategoria,
    obtenerPorId,
    buscar,
    filtrar,
    agregarProducto,
    actualizarStock,
    getCategorias
  };
})();
