import click
from api.models import db, Cliente, Product, Categoria, Proveedor

def setup_commands(app):
    @app.cli.command("insert-test-data")
    @click.argument("count")
    def insert_test_data(count):
        pass
