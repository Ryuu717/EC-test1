from app import app
from models import db, Product

with app.app_context():
    db.create_all()  # Create the tables

    # Add sample products
    products = [
        Product(name="Sample Product 1", description="Description for sample product 1", price=10.99, image="sample1.jpg"),
        Product(name="Sample Product 2", description="Description for sample product 2", price=15.99, image="sample2.jpg"),
        Product(name="Sample Product 3", description="Description for sample product 3", price=20.99, image="sample3.jpg"),
    ]

    db.session.add_all(products)
    db.session.commit()
