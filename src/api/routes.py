from flask import Flask, request, jsonify, Blueprint
from api.models import db, Cliente, Product, Order, OrderLine, OrderStatus

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    nombre = data.get("nombre")
    if Cliente.query.filter_by(correo=email).first():
        return jsonify({"message": "El usuario ya existe"}), 400
    nuevo_cliente = Cliente(correo=email, nombre=nombre)
    nuevo_cliente.set_password(password)
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify({"message": "Usuario creado correctamente"}), 201

@api.route('/password-recovery', methods=['POST'])
def password_recovery():
    data = request.json
    email = data.get("email")
    cliente = Cliente.query.filter_by(correo=email).first()
    
    if not cliente:
        return jsonify({"message": "Si el correo existe, se enviarán instrucciones"}), 200
    
    return jsonify({"message": "Instrucciones enviadas al correo"}), 200

@api.route('/password-reset', methods=['POST'])
def password_reset():
    data = request.json
    email = data.get("email")
    new_password = data.get("password")
    
    cliente = Cliente.query.filter_by(correo=email).first()
    if cliente:
        cliente.set_password(new_password)
        db.session.commit()
        return jsonify({"message": "Contraseña actualizada"}), 200
    
    return jsonify({"message": "Error al actualizar"}), 400

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    cliente = Cliente.query.filter_by(correo=email).first()
    if not cliente or not cliente.check_password(password):
        return jsonify({"message": "Credenciales inválidas"}), 401
    token = create_access_token(identity=str(cliente.id))
    return jsonify({"token": token, "cliente": cliente.serialize()}), 200

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
