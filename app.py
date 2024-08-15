from flask import Flask, render_template, redirect, url_for, session
from models import db, Product

import pymysql
pymysql.install_as_MySQLdb()

import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_DATABASE_URI'] = (f"mysql://{os.getenv('RDS_USERNAME')}:{os.getenv('RDS_PASSWORD')}"f"@{os.getenv('RDS_ENDPOINT')}/{os.getenv('RDS_DB_NAME')}")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def home():
    products = Product.query.all()
    return render_template('home.html', products=products)

@app.route('/product/<int:product_id>')
def product(product_id):
    product = Product.query.get(product_id)
    return render_template('product.html', product=product)

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    if 'cart' not in session:
        session['cart'] = []
    session['cart'].append(product_id)
    return redirect(url_for('cart'))

@app.route('/cart')
def cart():
    if 'cart' not in session:
        session['cart'] = []
    cart_items = Product.query.filter(Product.id.in_(session['cart'])).all()
    return render_template('cart.html', cart_items=cart_items)

@app.route('/checkout')
def checkout():
    return render_template('checkout.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
