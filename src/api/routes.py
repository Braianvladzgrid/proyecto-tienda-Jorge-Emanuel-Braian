from flask import Flask, request, jsonify, Blueprint
from api.models import db, Cliente, Product, Order, OrderLine, OrderStatus

api = Blueprint('api', __name__)

@api.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    items = data.get("items")
    
    nueva_orden = Order(
        cliente_id=data.get("cliente_id"),
        total_amount=0,
        order_status_id=1
    )
    db.session.add(nueva_orden)
    
    total_acumulado = 0
    for item in items:
        producto = Product.query.get(item["product_id"])
        if producto and producto.stock >= item["cantidad"]:
            subtotal = float(producto.precio) * item["cantidad"]
            total_acumulado += subtotal
            
            linea = OrderLine(
                order=nueva_orden,
                product_id=producto.id,
                cantidad=item["cantidad"],
                precio_unitario=producto.precio,
                subtotal=subtotal
            )
            producto.stock -= item["cantidad"]
            db.session.add(linea)
            
    nueva_orden.total_amount = total_acumulado
    db.session.commit()
    
    return jsonify({"message": "Orden procesada", "order_id": nueva_orden.id, "total": total_acumulado}), 201

@api.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([p.serialize() for p in products]), 200
