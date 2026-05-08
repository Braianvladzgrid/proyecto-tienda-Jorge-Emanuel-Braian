from flask import Flask, request, jsonify, Blueprint
from api.models import db, Cliente, Product, Order, OrderLine, Categoria, Proveedor, OrderStatus

api = Blueprint('api', __name__)

@api.route('/clientes', methods=['GET'])
def get_clientes():
    all_clientes = Cliente.query.all()
    return jsonify([c.serialize() for c in all_clientes]), 200

@api.route('/products', methods=['GET'])
def get_products():
    all_products = Product.query.all()
    return jsonify([p.serialize() for p in all_products]), 200

@api.route('/categorias', methods=['GET'])
def get_categorias():
    all_categorias = Categoria.query.all()
    return jsonify([cat.serialize() for cat in all_categorias]), 200

@api.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    new_order = Order(
        cliente_id=data.get("cliente_id"),
        total_amount=data.get("total_amount"),
        order_status_id=data.get("order_status_id")
    )
    db.session.add(new_order)
    db.session.commit()
    return jsonify({"id": new_order.id}), 201
