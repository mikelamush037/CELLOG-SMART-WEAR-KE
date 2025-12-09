// api.js - Simple API Functions

class CELLOGAPI {
    constructor() {
        this.baseURL = 'https://your-api-endpoint.com'; // Replace with your API
    }

    async getProducts() {
        // In production, fetch from your API
        // const response = await fetch(`${this.baseURL}/products`);
        // return await response.json();
        
        // For demo, return sample data
        return {
            success: true,
            data: []
        };
    }

    async addToCart(productId, quantity) {
        // In production, send to your API
        // const response = await fetch(`${this.baseURL}/cart`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ productId, quantity })
        // });
        // return await response.json();
        
        return { success: true };
    }

    async processMpesaPayment(phone, amount) {
        // Simulate M-Pesa payment
        // In production, integrate with Safaricom Daraja API
        
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        receiptNumber: `MPS${Math.floor(Math.random() * 1000000000)}`,
                        transactionDate: new Date().toISOString()
                    }
                });
            }, 2000);
        });
    }
}

// Create global instance
const api = new CELLOGAPI();
window.api = api;