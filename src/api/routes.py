import os
import requests
import cloudinary
import cloudinary.uploader
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Product, Favorite
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

def send_welcome_email(email):
    return requests.post(
        f"https://api.mailgun.net/v3/{os.getenv('MAILGUN_DOMAIN')}/messages",
        auth=("api", os.getenv("MAILGUN_API_KEY")),
        data={"from": f"Tienda AI <mailgun@{os.getenv('MAILGUN_DOMAIN')}>",
              "to": [email],
              "subject": "Bienvenido a nuestra tienda",
              "text": "Gracias por registrarte en nuestra plataforma."})

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    send_welcome_email(user.email)
    return jsonify({"message": "Usuario creado con exito"}), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    user = User.query.filter_by(email=body['email'], password=body['password']).first()
    if not user: return jsonify({"msg": "Datos incorrectos"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "user": user.serialize()}), 200

@api.route('/product/<int:product_id>/image', methods=['POST'])
@jwt_required()
def upload_product_image(product_id):
    file = request.files['file']
    upload_result = cloudinary.uploader.upload(file)
    product = Product.query.get(product_id)
    product.image_url = upload_result['secure_url']
    db.session.commit()
    return jsonify(product.serialize()), 200

@api.route('/favorite', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity()
    body = request.get_json()
    fav = Favorite(user_id=user_id, product_id=body['product_id'])
    db.session.add(fav)
    db.session.commit()
    return jsonify({"msg": "Agregado a favoritos"}), 200

@api.route('/favorite/<int:fav_id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(fav_id):
    user_id = get_jwt_identity()
    fav = Favorite.query.filter_by(id=fav_id, user_id=user_id).first()
    db.session.delete(fav)
    db.session.commit()
    return jsonify({"msg": "Favorito eliminado"}), 200
