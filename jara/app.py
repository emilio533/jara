"""
Aplicación Flask para la Tienda Militar
Servidor backend para servir productos y gestionar la tienda
"""

from flask import Flask, render_template, jsonify, request
import json
import os
from datetime import datetime

# Inicializar aplicación
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# ==========================================
# RUTAS Y UTILIDADES
# ==========================================

def cargar_productos():
    """Carga productos desde el archivo JSON"""
    ruta_productos = os.path.join(os.path.dirname(__file__), 'productos.json')
    try:
        with open(ruta_productos, 'r', encoding='utf-8') as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []


def cargar_usuarios():
    """Carga usuarios desde el archivo JSON"""
    ruta_usuarios = os.path.join(os.path.dirname(__file__), 'usuario.json')
    try:
        with open(ruta_usuarios, 'r', encoding='utf-8') as archivo:
            return json.load(archivo)
    except FileNotFoundError:
        return []


# ==========================================
# RUTAS PRINCIPALES
# ==========================================

@app.route('/')
def index():
    """Página principal de la tienda"""
    return render_template('index.html')


@app.route('/api/productos')
def api_productos():
    """API para obtener todos los productos"""
    productos = cargar_productos()
    return jsonify({
        'success': True,
        'data': productos,
        'count': len(productos)
    })


@app.route('/api/productos/<int:producto_id>')
def api_producto_detalle(producto_id):
    """API para obtener detalles de un producto específico"""
    productos = cargar_productos()
    producto = next((p for p in productos if p.get('id') == producto_id), None)
    
    if producto:
        return jsonify({
            'success': True,
            'data': producto
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Producto no encontrado'
        }), 404


@app.route('/api/productos/categoria/<categoria>')
def api_productos_por_categoria(categoria):
    """API para obtener productos por categoría"""
    productos = cargar_productos()
    filtrados = [p for p in productos if p.get('categoria') == categoria]
    
    return jsonify({
        'success': True,
        'data': filtrados,
        'count': len(filtrados)
    })


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Autenticación de administrador"""
    datos = request.get_json()
    password = datos.get('password')
    usuarios = cargar_usuarios()
    
    admin_user = next((u for u in usuarios if u.get('usuario') == 'admin'), None)
    
    if admin_user and admin_user.get('password') == password:
        return jsonify({
            'success': True,
            'message': 'Autenticación exitosa',
            'token': 'admin_token_123'
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Credenciales inválidas'
        }), 401


# ==========================================
# MANEJO DE ERRORES
# ==========================================

@app.errorhandler(404)
def no_encontrado(error):
    """Manejo de error 404"""
    return jsonify({
        'success': False,
        'error': 'Recurso no encontrado'
    }), 404


@app.errorhandler(500)
def error_interno(error):
    """Manejo de error 500"""
    return jsonify({
        'success': False,
        'error': 'Error interno del servidor'
    }), 500


# ==========================================
# PUNTO DE ENTRADA
# ==========================================

if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=5000,
        debug=True
    )
