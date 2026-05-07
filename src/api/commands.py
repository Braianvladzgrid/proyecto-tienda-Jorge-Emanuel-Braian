import click
from api.models import db, Cliente

def setup_commands(app):
    @app.cli.command("insert-test-data")
    @click.argument("count")
    def insert_test_data(count):
        print("Creando datos de prueba...")
