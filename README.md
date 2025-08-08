# Ecommerce Website

A full-stack ecommerce web application featuring both admin and user functionalities, built with Node.js, Express, MongoDB, and React.  
The application supports product management, user authentication, secure payments with Stripe, and a responsive frontend interface.

## Features

### Backend (Node.js, Express, MongoDB)
- User authentication and authorization with JWT (register, login, logout)
- Role-based access control for admin and regular users
- Full CRUD operations for product management by admins
- Product image upload and storage using Cloudinary
- Advanced product search, filtering, pagination, and sorting
- Secure password hashing with bcrypt
- Middleware for authentication, authorization, and input validation
- RESTful API design following best practices
- Stripe payment integration with webhook support for real-time payment confirmation

### Frontend (React)
- Responsive and modern UI built with React functional components and hooks
- User registration and login forms with client-side validation
- Protected routes for authenticated users and admin-only sections
- Admin dashboard featuring product creation, editing, and deletion
- Product listing with search, filtering, sorting, and pagination
- Detailed product overview page with image gallery and reviews
- Intuitive navigation and consistent layout using Tailwind CSS and CSS Modules
- Shopping cart management with add, update, and remove functionalities
- Stripe Checkout integration for secure payments
- User order history and shipping address management

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Cloudinary for image storage
  - Stripe API Payment processing and checkout integration
  - Stripe Webhooks Real-time event handling for payment confirmation
  - Multer Middleware for handling file uploads
- Frontend:
  - React.js (functional components, hooks)
  - React Router for client-side routing
  - Axios for API calls
  - CSS Modules and Tailwind CSS for styling
- Other Tools & Utilities:
  - dotenv Environment variable management
  - cors Cross-origin resource sharing middleware
  - ngrok Secure tunneling for local webhook testing
  - Git & GitHub Version control and code hosting

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Backend Setup

1. Navigate to the backend folder:  
   `cd backend`

2. Install dependencies:  
   `npm install`

3. Create a `.env` file in backend folder with the following variables:


4. Start the backend server:  
`npm run dev`

---

### Frontend Setup

1. Navigate to the frontend folder:  
`cd frontend`

2. Install dependencies:  
`npm install`

3. Start the frontend development server:  
`npm start`

---

### 📡 API Endpoints Overview (Backend)

#### Authentication
- `POST /api/auth/register` — Register a new user  
- `POST /api/auth/login` — Login and receive JWT token  
- `POST /api/auth/admin-login` — Login as an admin and receive JWT token  
- `GET /api/auth/user` — Get details of the currently logged-in user  

#### Products (User)
- `GET /api/products` — Get all products 
- `GET /api/products/:id` — Get product details by ID 
- `POST /api/products/:id/reviews` — Add a review for a product   
- `GET /api/products/:id/reviews` — Get all reviews for a product 

#### Products (Admin)
- `POST /api/admin/products` — Create a new product with images   
- `GET /api/admin/products` — Get all products   
- `GET /api/admin/products/check` — Check if a product exists by query params  
- `GET /api/admin/products/:id` — Get a product by ID 
- `PUT /api/admin/products/:id` — Update product details  
- `DELETE /api/admin/products/:id` — Delete a product
- `GET /api/admin/products/users` — Get all registered users 

#### Cart
- `POST /api/cart` — Add an item to the cart  
- `GET /api/cart` — Get all items in the cart  
- `PATCH /api/cart/update` — Update the quantity of a cart item 
- `DELETE /api/cart/remove` — Remove an item from the cart   

#### Shipping Address
- `GET /api/address` — Get the user's shipping address 
- `PUT /api/address` — Update the user's shipping address 

#### Orders History
- `GET /api/orders` — Get the logged-in user's order history 

#### Payments (Stripe Integration)
- `POST /api/payment/create-checkout-session` — Create a Stripe Checkout session 
- `GET /api/payment/session/:sessionId` — Retrieve Stripe session details  
- `POST /api/payment/webhook` — Stripe webhook endpoint for real-time payment event handling

### 🖥️ Frontend Routes 

#### Authentication
- `/register` — User registration page  
- `/login` — User and Admin login page  

#### Admin Dashboard (protected, admin only)
- `/admin` — Admin home dashboard  
- `/admin/add-product` — Add new product form with image upload  
- `/admin/products` — List all products with edit/delete options  
- `/admin/products/:id/edit` — Edit product page  
- `/admin/users` — View registered users  

#### User Pages (protected, user role)
- `/` — Home page with product listings  
- `/products` — List all products  
- `/product/:id` — Product detail and reviews page  
- `/cart` — Shopping cart page  
- `/shipping-address` — Shipping address form  
- `/order-summary` — Order summary and checkout page  
- `/orders` — User order history page  
- `/payment-success` — Payment success confirmation page  

---

### Notes

- Make sure to secure your `.env` file and never commit it to GitHub.  
- Use strong JWT secrets and MongoDB connection strings.  
- You can deploy backend and frontend separately or together based on your preference.
