# 📸 Guía de Imágenes - JARA STORE

## Imágenes Actuales

El archivo `productos.json` está configurado con URLs de imágenes de **Unsplash** (imágenes gratuitas de alta calidad).

### Ventajas de usar URLs externas:
✅ Las imágenes se cargan automáticamente  
✅ No ocupan espacio en el servidor  
✅ Mejor rendimiento  
✅ Imágenes de alta calidad  
✅ Fácil de cambiar  

## Para Agregar Imágenes Locales

Si deseas agregar imágenes locales en la carpeta `imagen/`:

### 1. Agregar la imagen a la carpeta
```
jara/imagen/botas_tacticas.jpg
```

### 2. Actualizar productos.json
```json
{
  "id": 1,
  "nombre": "Botas Tácticas Negras",
  "precio": 150000,
  "imagen": "/imagen/botas_tacticas.jpg",  // Ruta relativa
  "categoria": "Botas",
  "stock": 5
}
```

### 3. Asegurar sincronización en app.py
El servidor Flask debe servir archivos estáticos:

```python
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='imagen', static_url_path='/imagen')

@app.route('/imagen/<filename>')
def imagen(filename):
    return send_from_directory('imagen', filename)
```

## Fuentes Recomendadas de Imágenes Gratuitas

- **Unsplash:** https://unsplash.com (Usadas actualmente)
- **Pexels:** https://pexels.com
- **Pixabay:** https://pixabay.com
- **Freepik:** https://freepik.com (algunas gratis)

## Búsquedas Recomendadas

Para obtener imágenes similares, busca en Unsplash:
- "military boots" → Botas tácticas
- "camouflage uniform" → Uniformes de camuflaje
- "tactical helmet" → Cascos tácticos
- "tactical vest" → Chalecos tácticos
- "military backpack" → Mochilas tácticas

## Cambiar URL de Imagen

Para actualizar las imágenes de los productos, edita `productos.json`:

```json
{
  "imagen": "https://tu-url-de-imagen.com/imagen.jpg"
}
```

**Las imágenes aparecerán automáticamente** en la tienda después de guardar.

## Fallback de Imágenes

Si una imagen no carga, el sistema automáticamente muestra un placeholder:
```javascript
onerror="this.src='https://via.placeholder.com/300?text=NombreDelProducto'"
```
