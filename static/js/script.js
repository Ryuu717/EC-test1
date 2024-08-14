const API_BASE_URL = 'http://localhost:5000';

// Add to Cart
async function addToCart(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ product_id: productId })
        });
        if (response.ok) {
            alert('Product added to cart!');
            displayCart();
        } else {
            console.error('Failed to add product to cart');
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
    }
}

// Display Cart
async function displayCart() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart`);
        const cart = await response.json();
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>No items in cart.</p>';
            return;
        }

        for (const item of cart) {
            const productResponse = await fetch(`${API_BASE_URL}/api/products/${item.product_id}`);
            const product = await productResponse.json();
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item', 'mb-2');
            itemDiv.innerHTML = `
                <p>${product.name} - $${product.price} (x${item.quantity})
                <button class="btn btn-danger btn-sm ml-2" onclick="removeFromCart(${product.id})">Remove</button></p>
            `;
            cartItems.appendChild(itemDiv);
        }
    } catch (error) {
        console.error('Error displaying cart:', error);
    }
}

// Remove from Cart
async function removeFromCart(productId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            alert('Product removed from cart!');
            displayCart();
        } else {
            console.error('Failed to remove product from cart');
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
    }
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Checkout functionality not implemented.');
});

window.onload = () => {
    displayCart();
};



// Truncation for card descriptions
document.addEventListener('DOMContentLoaded', function() {
    const maxDescriptionLength = 50;  // Adjust this value as needed

    document.querySelectorAll('.card-text[data-description]').forEach(function(element) {
        const description = element.getAttribute('data-description');
        if (description.length > maxDescriptionLength) {
            element.textContent = description.substring(0, maxDescriptionLength) + '...';
        }
    });
});
