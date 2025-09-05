# 🛒 E-Commerce Backend API

A production-ready RESTful API for managing an online store — with authentication, product/catalog management, shopping cart, and order handling. Built with Node.js, Express, and MongoDB.

# 🌐 Live Demo
https://ecommerce-backend-8mu7.onrender.com

 #🚀 Features

👤 User Authentication — Register, Login, and Get Profile
🔑 JWT Authentication & Role-based Access (User / Admin)
📦 Products & Categories — CRUD operations (Admin-only for create/update/delete)
🛒 Shopping Cart — Add, update, and remove items in cart
📑 Orders & Payments — Place orders, update payment status, track delivery
✅ Input Validation — Using Joi for clean, safe data
⚡ Centralized Error Handling with custom middleware
🌍 MongoDB Atlas Integration
🔒 Security Middleware — Helmet, CORS, Rate Limiting

# 🛠 Tech Stack

Node.js — Runtime

Express.js — Web framework

MongoDB + Mongoose — Database & ODM

Joi — Input validation

bcryptjs — Password hashing

JWT — Authentication

dotenv — Environment variable management

Postman — API testing

# 📂 Project Structure
ecommerce-backend/
│── controllers/ # Route logic
│── middlewares/ # Auth, validation, error handling
│── models/ # Mongoose schemas
│── routes/ # Express route definitions
│── validations/ # Joi schemas for request validation
│── index.js # Entry point
│── .env # Environment variables
└── package.json # Project dependencies

# 🔐 API Authentication

All protected routes require a JWT token in the Authorization header:

Authorization: Bearer <your_token_here>

📡 Example Endpoints
# 🔑 Auth

POST /api/auth/register → Register a new user

POST /api/auth/login → Login and receive a JWT

GET /api/auth/me → Get current authenticated user

# 📦 Products

GET /api/products → Get all products

GET /api/products/:id → Get product by ID

POST /api/products → Create product (Admin only)

PUT /api/products/:id → Update product (Admin only)

DELETE /api/products/:id → Delete product (Admin only)

# 🛒 Cart

POST /api/cart → Add item to cart

GET /api/cart → Get user’s cart

# 📑 Orders

POST /api/orders → Place an order

GET /api/orders/my → Get user’s orders

PUT /api/orders/:id/pay → Pay for an order

# ⚙️ Setup
1️⃣ Clone the repository
git clone https://github.com/Nuel999/ecommerce-backend.git
cd ecommerce-backend

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables (.env)
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=\*

4️⃣ Start the server

# Development

npm run dev

# Production

npm start

# 👨‍💻 Author

Built with ❤️ by Emmanuel Maurice
