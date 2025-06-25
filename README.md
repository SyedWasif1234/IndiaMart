Site like IndiaMart

BACKEND

  🔐 Auth:

    * POST /auth/register → Register as buyer or seller
    * POST /auth/login → Login, return token/session
    * GET /auth/me → Get current user info

 🛒 Product Management:

    * GET /products → List all products (public)
    * GET /products/:id → Product detail (public)
    * POST /products → Seller only
    * PUT /products/:id → Seller only (own products)
    * DELETE /products/:id → Seller only or Admin

📨 Inquiry System:
  
    * POST /inquiries → Buyer sends inquiry to seller
    * GET /inquiries → Seller/Admin views inquiries
    * PUT /inquiries/:id/respond → Seller responds

 🧑‍💼 Admin Panel:

    * GET /admin/users → List all users
    * DELETE /admin/users/:id → Delete user
    * PUT /admin/users/:id/role → Change user role
    * GET /admin/products → Moderate product listings

 ✅ Delivered

    *  Auth system (Login/Register)
    *  Role-based route access
    *  Product listing CRUD
    *  Inquiry system between buyer and seller
    *  Admin routes (manage users/products)
    *  Postman collection for API testing
    *  Clean MVC-style folder structure
    *  MySQL schema with proper relationships

  
 🎯  Goal
  
    * Modular PHP backend (MVC-like structure)
    * MySQL database
    * JWT-based authentication (or PHP session-based auth for simplicity)
    * Role-based route protection (buyer, seller, admin)
    * Clean API routes for managing users, products, and orders
    * Admin dashboard APIs


 📊 Tables to be Created

    users          
    products      
    categories    
    inquiries     




  FRONTEND

  DEPENDENCIES
    
      "@hookform/resolvers": "^5.1.1",
      "@tailwindcss/vite": "^4.1.10",
      "axios": "^1.10.0",
      "daisyui": "^5.0.43",
      "lucide-react": "^0.518.0",
      "react": "^19.1.0",
      "react-dom": "^19.1.0",
      "react-hook-form": "^7.58.1",
      "react-hot-toast": "^2.5.2",
      "react-router-dom": "^7.6.2",
      "tailwindcss": "^4.1.10",
      "zod": "^3.25.67",
      "zustand": "^5.0.5"
    
   DEVDEPENDENCIES
    
      "@eslint/js": "^9.25.0",
      "@types/react": "^19.1.2",
      "@types/react-dom": "^19.1.2",
      "@vitejs/plugin-react": "^4.4.1",
      "eslint": "^9.25.0",
      "eslint-plugin-react-hooks": "^5.2.0",
      "eslint-plugin-react-refresh": "^0.4.19",
      "globals": "^16.0.0",
      "vite": "^6.3.5"

  

    





