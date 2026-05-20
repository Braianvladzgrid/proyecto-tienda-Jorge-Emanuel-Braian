#!/usr/bin/env python3
"""
Arranca el backend La Verde en http://127.0.0.1:3001
Uso: python run_backend.py
"""
import os
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(ROOT, "src"))
os.environ.setdefault("FLASK_APP", os.path.join(ROOT, "src", "app.py"))

from dotenv import load_dotenv

load_dotenv(os.path.join(ROOT, ".env"))

from app import app  # noqa: E402
from api.models import db, Product, User  # noqa: E402
from api.catalog_seed import ensure_catalog  # noqa: E402
from api.db_utils import ensure_user_admin_column, ensure_admin_user  # noqa: E402
from api.commands import setup_commands  # noqa: E402

setup_commands(app)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        ensure_user_admin_column(db)
        ensure_admin_user(db, User)
        print("Base de datos:", app.config["SQLALCHEMY_DATABASE_URI"])
        added, fixed = ensure_catalog(db, Product)
        total = Product.query.filter_by(is_active=True).count()
        print(
            f"  -> Catálogo: {total} productos (+{added} nuevos, {fixed} imágenes reparadas)"
        )

    port = int(os.environ.get("PORT", 3001))
    print(f"\nBackend La Verde: http://127.0.0.1:{port}/api/hello\n")
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)
