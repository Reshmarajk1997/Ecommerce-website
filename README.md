# Ecommerce Website

A full-stack ecommerce web application with admin and user functionality built with Node.js, Express, MongoDB, and React.

## Features

### Backend (Node.js, Express, MongoDB)
- User authentication with JWT (register, login, logout)
- Role-based access control (admin and user)
- Product management (CRUD operations by admin)
- Product image upload with Cloudinary
- Product search, filter, pagination, and sorting
- Secure password hashing with bcrypt
- Middleware for authentication and authorization
- RESTful API design

### Frontend (React)
- Responsive UI with React functional components and hooks
- User registration and login forms with validation
- Protected routes for authenticated users and admin panel
- Admin dashboard to add, edit, delete products
- Product listing page with search, filter, and sort
- Product detail page with overview and image gallery
- User-friendly navigation and layout

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
  - Cloudinary for image storage
- Frontend:
  - React.js (functional components, hooks)
  - React Router for client-side routing
  - Axios for API calls
  - CSS Modules and Tailwind CSS for styling

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

### API Endpoints Overview (Backend)

- `POST /api/auth/register` — Register a new user  
- `POST /api/auth/login` — Login and get JWT token  
- `POST /api/auth/logout` — Logout user  
- `GET /api/products` — Get all products (with filters, pagination, sort)  
- `GET /api/products/:id` — Get product details  
- `POST /api/products` — Create new product (admin only)  
- `PUT /api/products/:id` — Update product (admin only)  
- `DELETE /api/products/:id` — Delete product (admin only)  

---

### Notes

- Make sure to secure your `.env` file and never commit it to GitHub.  
- Use strong JWT secrets and MongoDB connection strings.  
- You can deploy backend and frontend separately or together based on your preference.
