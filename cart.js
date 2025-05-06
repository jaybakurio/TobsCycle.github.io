// Cart functionality
let cart = [];

// Function to add item to cart
function addToCart(productName, price, image) {
    const item = {
        name: productName,
        price: price,
        image: image,
        quantity: 1
    };
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show cart modal
    showCart();
}

// Function to show cart modal
function showCart() {
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-content">
            <h2>Your Cart</h2>
            <div class="cart-items"></div>
            <div class="cart-total">
                <p>Total: ₱<span id="cart-total-amount">0.00</span></p>
            </div>
            <div class="cart-buttons">
                <button onclick="closeCart()">Continue Shopping</button>
                <button onclick="proceedToPurchase()">Purchase</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.getElementById('cart-total-amount');
    
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>₱${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    totalAmount.textContent = total.toFixed(2);
}

// Function to update item quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeItem(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Function to close cart modal
function closeCart() {
    const modal = document.querySelector('.cart-modal');
    if (modal) {
        modal.remove();
    }
}

// Function to proceed to purchase
function proceedToPurchase() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="purchase-content">
            <h2>Complete Your Purchase</h2>
            <form id="purchase-form">
                <div class="form-group">
                    <label for="name">Full Name:</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="address">Delivery Address:</label>
                    <textarea id="address" required></textarea>
                </div>
                <div class="form-group">
                    <label for="payment">Payment Method:</label>
                    <select id="payment" required>
                        <option value="">Select payment method</option>
                        <option value="cod">Cash on Delivery</option>
                        <option value="gcash">GCash</option>
                        <option value="card">Credit/Debit Card</option>
                    </select>
                </div>
                <div class="purchase-buttons">
                    <button type="button" onclick="closePurchase()">Cancel</button>
                    <button type="submit">Confirm Purchase</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Handle form submission
    document.getElementById('purchase-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const payment = document.getElementById('payment').value;
        
        // Here you would typically send this data to your server
        alert('Thank you for your purchase! We will contact you shortly with the delivery details.');
        
        // Clear cart and close modals
        cart = [];
        localStorage.removeItem('cart');
        closePurchase();
        closeCart();
    });
}

// Function to close purchase modal
function closePurchase() {
    const modal = document.querySelector('.purchase-modal');
    if (modal) {
        modal.remove();
    }
}

// Load cart from localStorage when page loads
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}); 