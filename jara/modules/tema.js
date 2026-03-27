/**
 * Módulo: Tema
 * Responsabilidad: Gestión del tema oscuro/claro
 */

const TemaModule = (() => {
  const STORAGE_KEY = 'dark-mode';

  const inicializar = () => {
    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const activar = () => {
    document.body.classList.add('dark');
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const desactivar = () => {
    document.body.classList.remove('dark');
    localStorage.setItem(STORAGE_KEY, 'false');
  };

  const toggle = () => {
    if (document.body.classList.contains('dark')) {
      desactivar();
    } else {
      activar();
    }
  };

  const estaActivo = () => {
    return document.body.classList.contains('dark');
  };

  return {
    inicializar,
    activar,
    desactivar,
    toggle,
    estaActivo
  };
})();
