// script.js - Main Application Logic

class CELLOGApp {
    constructor() {
        this.products = [];
        this.cart = [];
        this.currentUser = null;
        this.currentPage = 1;
        this.productsPerPage = 8;
        
        this.init();
    }

    init() {
        console.log('Initializing CELLOG SMART WEAR...');
        
        // Load initial data
        this.loadProducts();
        this.loadCart();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Hide loading screen
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    }

    // Sample product data
    loadProducts() {
        this.products = [
            {
                id: 1,
                name: "Men's GPS Running Shirt",
                price: 4500,
                originalPrice: 5500,
                category: "clothes",
                subcategory: "men",
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
                description: "Smart shirt with built-in GPS tracking",
                stock: 15
            },
            {
                id: 2,
                name: "Women's Smart Yoga Leggings",
                price: 3800,
                originalPrice: 4500,
                category: "clothes",
                subcategory: "women",
                image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80",
                description: "Muscle monitoring smart leggings",
                stock: 22
            },
            {
                id: 3,
                name: "Smart Running Shoes",
                price: 7500,
                originalPrice: 9000,
                category: "shoes",
                subcategory: "running",
                image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
                description: "Step tracking smart running shoes",
                stock: 8
            },
            {
                id: 4,
                name: "GPS Smart Backpack",
                price: 5500,
                originalPrice: 6800,
                category: "bags",
                subcategory: "backpacks",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
                description: "Anti-theft backpack with GPS tracker",
                stock: 12
            },
            {
                id: 5,
                name: "Kids Smart Jacket",
                price: 3500,
                originalPrice: 4200,
                category: "clothes",
                subcategory: "kids",
                image: "https://images.unsplash.com/photo-1558769132-cb1a40ed0ada?auto=format&fit=crop&w=600&q=80",
                description: "Temperature regulating smart jacket",
                stock: 18
            },
            {
                id: 6,
                name: "Smart School Bag",
                price: 4200,
                originalPrice: 5000,
                category: "school",
                subcategory: "bags",
                image: "https://images.unsplash.com/photo-1581798459216-b8cba6ccb68b?auto=format&fit=crop&w=600&q=80",
                description: "Waterproof school bag with weight sensor",
                stock: 14
            },
            {
                id: 7,
                name: "Smart Casual Sneakers",
                price: 6200,
                originalPrice: 7500,
                category: "shoes",
                subcategory: "casual",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80",
                description: "Comfortable sneakers with step counter",
                stock: 9
            },
            {
                id: 8,
                name: "Smart Stationery Set",
                price: 2800,
                originalPrice: 3500,
                category: "school",
                subcategory: "stationery",
                image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80",
                description: "Digital pen and smart notebook set",
                stock: 25
            },
            {
                id: 9,
                name: "Men's Smart Hoodie",
                price: 5200,
                originalPrice: 6500,
                category: "clothes",
                subcategory: "men",
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
                description: "Smart hoodie with heating elements",
                stock: 7
            },
            {
                id: 10,
                name: "Women's Smart Dress",
                price: 6800,
                originalPrice: 8500,
                category: "clothes",
                subcategory: "women",
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
                description: "Elegant smart dress with LED lighting",
                stock: 11
            }
        ];
        
        this.renderProducts();
    }

    loadCart() {
        const savedCart = localStorage.getItem('cellog_cart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
            this.updateCartCount();
        }
    }

    saveCart() {
        localStorage.setItem('cellog_cart', JSON.stringify(this.cart));
    }

    setupEventListeners() {
        // Mobile menu
        document.getElementById('mobileMenuBtn').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.add('show');
        });

        document.querySelector('.close-menu').addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('show');
        });

        // Mobile category dropdowns
        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', () => {
                const subcategories = header.nextElementSibling;
                subcategories.classList.toggle('show');
            });
        });

        // Login button
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showModal('loginModal');
        });

        // Cart button
        document.getElementById('cartBtn').addEventListener('click', () => {
            this.showCartModal();
        });

        // Shop Now button
        document.getElementById('shopNowBtn').addEventListener('click', () => {
            document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.closest('.category-card').dataset.category;
                this.filterProductsByCategory(category);
            });
        });

        // Sort products
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortProducts(e.target.value);
        });

        // Load more products
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.loadMoreProducts();
        });

        // Checkout button
        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.showPaymentModal();
        });

        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                }
            });
        });

        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
            });
        });

        // Switch between login/signup
        document.getElementById('showSignup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('loginModal');
            this.showModal('signupModal');
        });

        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('signupModal');
            this.showModal('loginModal');
        });

        // Form submissions
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signupForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        document.getElementById('paymentForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processPayment();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Get products for current page
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.products.slice(0, endIndex);

        productsGrid.innerHTML = productsToShow.map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = endIndex < this.products.length ? 'block' : 'none';
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`, 'success');
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').textContent = totalItems;
    }

    showCartModal() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;

        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">KES ${item.price.toLocaleString()}</div>
                        <div class="cart-item-actions">
                            <button class="quantity-btn minus" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                            <button class="remove-item" onclick="app.removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cartTotal').textContent = `KES ${total.toLocaleString()}`;
        document.getElementById('paymentAmount').textContent = `KES ${total.toLocaleString()}`;

        this.showModal('cartModal');
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(productId);
        } else {
            this.saveCart();
            this.updateCartCount();
            this.showCartModal();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.showCartModal();
        this.showNotification('Item removed from cart', 'info');
    }

    filterProductsByCategory(category) {
        const filteredProducts = this.products.filter(product => 
            product.category === category
        );
        
        this.renderFilteredProducts(filteredProducts);
    }

    sortProducts(sortBy) {
        let sortedProducts = [...this.products];
        
        switch(sortBy) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // Keep original order for featured
                break;
        }
        
        this.renderFilteredProducts(sortedProducts);
    }

    renderFilteredProducts(filteredProducts) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = filteredProducts.slice(0, this.productsPerPage).map(product => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category.toUpperCase()}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice > product.price ? 
                            `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="app.addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadMoreProducts() {
        this.currentPage++;
        this.renderProducts();
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.renderProducts();
            return;
        }

        const searchResults = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredProducts(searchResults);
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('show');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('show');
    }

    showPaymentModal() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty', 'warning');
            return;
        }

        this.hideModal('cartModal');
        this.showModal('paymentModal');
    }

    handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Simulate login
        this.currentUser = {
            id: 1,
            email: email,
            name: email.split('@')[0]
        };

        localStorage.setItem('cellog_user', JSON.stringify(this.currentUser));
        
        this.showNotification('Login successful!', 'success');
        this.hideModal('loginModal');
        
        // Update UI
        document.getElementById('loginBtn').innerHTML = `
            <i class="fas fa-user"></i>
            <span class="action-text">${this.currentUser.name}</span>
        `;
    }

    handleSignup() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;

        if (!name || !email || !phone || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Simulate signup
        this.currentUser = {
            id: Date.now(),
            email: email,
            name: name,
            phone: phone
        };

        localStorage.setItem('cellog_user', JSON.stringify(this.currentUser));
        
        this.showNotification('Account created successfully!', 'success');
        this.hideModal('signupModal');
        
        // Update UI
        document.getElementById('loginBtn').innerHTML = `
            <i class="fas fa-user"></i>
            <span class="action-text">${name}</span>
        `;
    }

    processPayment() {
        const phone = document.getElementById('phone').value;
        
        if (!this.validatePhone(phone)) {
            this.showNotification('Please enter a valid Safaricom number (07XXXXXXXX)', 'error');
            return;
        }

        // Show processing state
        const payBtn = document.querySelector('.pay-now-btn');
        const originalText = payBtn.innerHTML;
        payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        payBtn.disabled = true;

        // Simulate payment processing
        setTimeout(() => {
            const receiptNumber = `MPS${Math.floor(Math.random() * 1000000000)}`;
            const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Clear cart
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            
            // Reset button
            payBtn.innerHTML = originalText;
            payBtn.disabled = false;
            
            // Hide modal
            this.hideModal('paymentModal');
            
            // Show success notification
            this.showNotification(
                `Payment successful! M-Pesa Receipt: ${receiptNumber}`,
                'success'
            );
            
            // Show order confirmation
            alert(`🎉 Order Confirmed!\n\nReceipt: ${receiptNumber}\nAmount: KES ${total.toLocaleString()}\n\nWe'll send an SMS confirmation to ${phone}`);
            
        }, 2000);
    }

    validatePhone(phone) {
        const regex = /^07[0-9]{8}$/;
        return regex.test(phone);
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    getNotificationIcon(type) {
        switch(type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'warning': return 'exclamation-triangle';
            default: return 'info-circle';
        }
    }
}

// Initialize app
const app = new CELLOGApp();
window.app = app;

// Load saved user
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('cellog_user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.getElementById('loginBtn').innerHTML = `
            <i class="fas fa-user"></i>
            <span class="action-text">${user.name}</span>
        `;
    }
});