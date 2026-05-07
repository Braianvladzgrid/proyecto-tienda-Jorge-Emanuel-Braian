import os
from flask_admin import Admin
from .models import db, Cliente, Product, Categoria, Proveedor, Order, OrderStatus, OrderLine
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    # Se eliminó template_mode para evitar el error de versión
    admin = Admin(app, name='4Geeks Admin')
    admin.add_view(ModelView(Cliente, db.session))
    admin.add_view(ModelView(Product, db.session))
    admin.add_view(ModelView(Categoria, db.session))
    admin.add_view(ModelView(Proveedor, db.session))
    admin.add_view(ModelView(Order, db.session))
    admin.add_view(ModelView(OrderStatus, db.session))
    admin.add_view(ModelView(OrderLine, db.session))
