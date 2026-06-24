# E-Shop — Multi-Vendor E-Commerce Platform

E-Shop is a full-stack multi-vendor e-commerce application built on the MERN stack 
(MongoDB, Express, React, Node.js), supporting two distinct user roles — **buyers** 
and **sellers** — each with their own authentication flow, dashboard, and permissions.

## Features

- **Dual authentication system** — separate JWT-based login for regular users and 
  sellers, with isolated cookies and protected routes for each role
- **Seller dashboard** — sellers can register their shop, upload a shop avatar, 
  manage products, and view shop analytics
- **Product management** — multi-image upload support via Multer, category 
  selection, pricing (original/discount), and stock tracking
- **Shopping cart** — Redux-managed cart with localStorage persistence across sessions
- **Secure password handling** — bcrypt-hashed passwords with Mongoose pre-save hooks
- **Image uploads** — handled via Multer middleware with file-type validation

## Tech Stack

**Frontend:** React, Redux Toolkit, React Router, Axios, Tailwind CSS  
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Multer, bcryptjs

## Getting Started

\`\`\`bash
# Clone the repo
git clone https://github.com/<your-username>/E-shop.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend
npm start

# Run frontend (in a separate terminal)
npm start
\`\`\`

## Environment Variables

Create a `.env` file inside `backend/config/` with:

\`\`\`
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d
NODE_ENV=development
\`\`\`
