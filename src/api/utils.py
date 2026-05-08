import cloudinary
import cloudinary.uploader
import os
import requests

cloudinary.config( 
  cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME"), 
  api_key = os.getenv("CLOUDINARY_API_KEY"), 
  api_secret = os.getenv("CLOUDINARY_API_SECRET") 
)

def upload_image(file):
    upload_result = cloudinary.uploader.upload(file)
    return upload_result["secure_url"]

def send_recovery_email(to_email, token):
    return requests.post(
        f"https://api.mailgun.net/v3/{os.getenv('MAIL_DOMAIN')}/messages",
        auth=("api", os.getenv('MAILGUN_API_KEY')),
        data={"from": "Soporte Tienda <mailgun@YOUR_DOMAIN_HERE>",
              "to": [to_email],
              "subject": "Recuperacion de contrasenia",
              "text": f"Tu token es: {token}"})
