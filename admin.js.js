// admin.js - Simple Admin Functions

class AdminPanel {
    constructor() {
        this.init();
    }

    init() {
        // Check if user is admin (in production, check from API)
        const user = JSON.parse(localStorage.getItem('cellog_user') || '{}');
        if (user.role === 'admin') {
            this.addAdminButton();
        }
    }

    addAdminButton() {
        const userActions = document.querySelector('.user-actions');
        if (!userActions) return;

        const adminBtn = document.createElement('button');
        adminBtn.className = 'action-btn admin-btn';
        adminBtn.innerHTML = `
            <i class="fas fa-cog"></i>
            <span class="action-text">Admin</span>
        `;
        adminBtn.addEventListener('click', () => {
            this.showAdminPanel();
        });

        userActions.insertBefore(adminBtn, userActions.firstChild);
    }

    showAdminPanel() {
        // Create admin panel modal
        const adminModal = document.createElement('div');
        adminModal.className = 'modal show';
        adminModal.id = 'adminModal';
        adminModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-cog"></i> Admin Panel</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="admin-stats">
                        <div class="stat-card">
                            <h3>Products</h3>
                            <p>24</p>
                        </div>
                        <div class="stat-card">
                            <h3>Orders</h3>
                            <p>156</p>
                        </div>
                        <div class="stat-card">
                            <h3>Revenue</h3>
                            <p>KES 450,000</p>
                        </div>
                    </div>
                    <div class="admin-actions">
                        <button class="admin-action-btn" onclick="admin.manageProducts()">
                            <i class="fas fa-tshirt"></i> Manage Products
                        </button>
                        <button class="admin-action-btn" onclick="admin.manageOrders()">
                            <i class="fas fa-shopping-cart"></i> Manage Orders
                        </button>
                        <button class="admin-action-btn" onclick="admin.viewAnalytics()">
                            <i class="fas fa-chart-line"></i> Analytics
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(adminModal);

        // Add event listeners
        adminModal.querySelector('.close-modal').addEventListener('click', () => {
            adminModal.remove();
        });

        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.remove();
            }
        });
    }

    manageProducts() {
        alert('Product management coming soon...');
    }

    manageOrders() {
        alert('Order management coming soon...');
    }

    viewAnalytics() {
        alert('Analytics dashboard coming soon...');
    }
}

// Initialize admin panel
const admin = new AdminPanel();
window.admin = admin;