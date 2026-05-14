from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    # Guarda el hash, no la contraseña real
    password = db.Column(
        db.String(250),
        nullable=False
    )

    is_active = db.Column(
        db.Boolean(),
        unique=False,
        nullable=False,
        default=True
    )

    favorites = db.relationship(
        'Favorite',
        backref='user',
        lazy=True
    )

    cart_items = db.relationship(
        'CartItem',
        backref='user',
        lazy=True
    )

    # Generar hash de contraseña
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # Verificar contraseña
    def check_password(self, password):
        return check_password_hash(
            self.password,
            password
        )

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "favorites": [
                fav.serialize()
                for fav in self.favorites
            ],
            "cart_items": [
                item.serialize()
                for item in self.cart_items
            ]
        }
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    def serialize(self): return {"id": self.id, "name": self.name}

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=True, default=0)
    category = db.Column(db.String(120), nullable=True)
    image_url = db.Column(db.String(250), nullable=True)
    def serialize(self): return {"id": self.id, "name": self.name, "price": self.price, "image_url": self.image_url}

class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product')
    def serialize(self): return {"id": self.id, "product": self.product.serialize() if self.product else None}

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    product = db.relationship('Product')
    def serialize(self): return {"id": self.id, "product_id": self.product_id, "quantity": self.quantity}

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}

class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}

class Proveedor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}

class OrderStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}

class OrderLine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    def serialize(self): return {"id": self.id}
