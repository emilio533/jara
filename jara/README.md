# 🪖 JARA STORE - Tienda Militar

Aplicación de tienda online para productos militares con frontend moderno y backend Flask.

## 📁 Estructura del Proyecto

```
jara/
├── index.html          # Página principal (HTML)
├── styles.css          # Estilos globales
├── app.js              # Lógica del frontend (JavaScript)
├── app.py              # Backend Flask (Python)
├── productos.json      # Base de datos de productos
├── usuario.json        # Credenciales de administrador
├── README.md           # Este archivo
└── imagen/             # Carpeta de imágenes
    └── chaqueta.jpeg
```

## 🚀 Instalación

### Requisitos
- Python 3.7+
- Flask
- Navegador web moderno

### Pasos

1. **Instalar dependencias Python:**
```bash
pip install flask
```

2. **Ejecutar el servidor:**
```bash
python app.py
```

3. **Abrir en navegador:**
```
http://localhost:5000
```

## 🎨 Características

### Frontend
- ✅ Interfaz responsiva y moderna
- ✅ Tema claro/oscuro
- ✅ Búsqueda de productos
- ✅ Filtrado por categoría
- ✅ Carrito de compras con localStorage
- ✅ Generación de facturas PDF
- ✅ Integración con WhatsApp, Nequi y PayPal

### Backend
- ✅ API REST para productos
- ✅ Filtrado por categoría
- ✅ Autenticación de admin
- ✅ Manejo de errores
- ✅ Respuestas JSON estructuradas

## 👤 Panel de Administración

**Contraseña:** `1234`

Funciones:
- Agregar nuevos productos
- Ver historial de ventas
- Gestionar categorías

## 📦 Categorías de Productos

- Botas
- Uniformes
- Accesorios

## 💳 Métodos de Pago

- WhatsApp
- Nequi
- PayPal

## 📝 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página principal |
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/<id>` | Obtener producto por ID |
| GET | `/api/productos/categoria/<cat>` | Productos por categoría |
| POST | `/api/auth/login` | Autenticación admin |

## 🔐 Credenciales

### Admin
- Usuario: `admin`
- Contraseña: `1234`

## 📱 Responsividad

La aplicación es totalmente responsiva y funciona en:
- Computadoras de escritorio
- Tabletas
- Dispositivos móviles

## 🛠️ Tecnologías Usadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python Flask
- **Almacenamiento:** LocalStorage y JSON
- **PDF:** jsPDF
- **APIs Externas:** WhatsApp, Nequi, PayPal

## ✨ Mejoras Realizadas

1. ✅ Renombrados archivos con extensiones correctas
2. ✅ Separación de CSS en archivo dedicado
3. ✅ Código JavaScript bien estructurado y comentado
4. ✅ Backend Flask mejorado con API REST
5. ✅ Archivos JSON con datos de ejemplo
6. ✅ Documentación completa (README.md)
7. ✅ Mejor UX/UI con animaciones
8. ✅ Validaciones y manejo de errores

## 📄 Licencia

Este proyecto es de uso libre.
