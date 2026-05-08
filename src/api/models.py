from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean

db = SQLAlchemy()

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    telefono = db.Column(db.String(20), nullable=True)
    direccion = db.Column(db.String(250), nullable=True)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    pw = db.Column(db.String(250), nullable=False)
    fecha_registro = db.Column(db.DateTime, server_default=db.func.now())
    pedidos = db.relationship('Order', backref='cliente', lazy=True)
    def __repr__(self):
        return f'<Cliente {self.nombre}>'
    def serialize(self):
        return {"id": self.id, "nombre": self.nombre, "correo": self.correo}

class Categoria(db.Model):
    def __repr__(self):
        return self.nombre
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), unique=True, nullable=False)
    descripcion = db.Column(db.String(250), nullable=True)
    productos = db.relationship('Product', backref='categoria', lazy=True)
    def __repr__(self):
        return f'<Categoria {self.nombre}>'
    def serialize(self):
        return {"id": self.id, "nombre": self.nombre}

class Proveedor(db.Model):
    def __repr__(self):
        return self.nombre
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    telefono = db.Column(db.String(20), nullable=True)
    direccion = db.Column(db.String(250), nullable=True)
    productos = db.relationship('Product', backref='proveedor', lazy=True)
    def __repr__(self):
        return f'<Proveedor {self.nombre}>'
    def serialize(self):
        return {"id": self.id, "nombre": self.nombre}

class Product(db.Model):
    def __repr__(self):
        return self.nombre
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), unique=True, nullable=False)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    unidad = db.Column(db.String(50), nullable=True)
    categoria_id = db.Column(db.Integer, db.ForeignKey('categoria.id'), nullable=False)
    proveedor_id = db.Column(db.Integer, db.ForeignKey('proveedor.id'), nullable=False)
    order_lines = db.relationship('OrderLine', backref='product', lazy=True)
    def __repr__(self):
        return f'<Product {self.nombre}>'
    def serialize(self):
        return {"id": self.id, "nombre": self.nombre, "precio": float(self.precio), "stock": self.stock}

class OrderStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
    orders = db.relationship('Order', backref='status', lazy=True)
    def __repr__(self):
        return f'<Status {self.nombre}>'

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    fecha = db.Column(db.DateTime, server_default=db.func.now())
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    order_status_id = db.Column(db.Integer, db.ForeignKey('order_status.id'), nullable=False)
    order_lines = db.relationship('OrderLine', backref='order', lazy=True)
    def __repr__(self):
        return f'<Order {self.id} - Cliente {self.cliente_id}>'

class OrderLine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    cantidad = db.Column(db.Numeric(10, 2), nullable=False)
    precio_unitario = db.Column(db.Numeric(10, 2), nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
