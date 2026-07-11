# 🛒 E-Shop — Multi-Vendor E-Commerce Platform

E-Shop is a state-of-the-art, production-ready, full-stack multi-vendor e-commerce application built on the **MERN Stack** (MongoDB, Express, React, Node.js) and powered by **Socket.io** for real-time messaging. Designed with a dual-role architecture, it provides separate, isolated portals and authentication systems for **Buyers** and **Sellers**.

---

## 🌟 Key Features

### 👤 Buyer / Customer Experience
- **Interactive Home Page:** Promoted product sliders, featured categories, best-selling showcases, and active promotional events.
- **Advanced Filtering & Details:** Filter products by category and sort by price/reviews. View rich product description pages with customer reviews.
- **Cart & Wishlist Systems:** Fully managed via Redux Toolkit with automated `localStorage` persistence across sessions.
- **Secure Checkout & Order Management:** Multistep checkout flow (Shipping Details, Order Confirmation, and Payment). Order tracking console showing real-time delivery status updates.
- **Product Reviews:** Write and edit reviews with star ratings and comments after receiving orders.
- **Real-Time Customer Support:** Chat directly with shop owners/sellers with live typing indicators and seen/unseen status notifications.

### 🏢 Seller / Merchant Portal
- **Shop Onboarding & Management:** Dedicated registration for sellers with customizable shop names, profile banners, avatars, and descriptions.
- **Seller Dashboard:** Interactive panel detailing sales analytics, total orders, product lists, and customer messages.
- **Rich Product Manager:** Multi-image uploads via Cloudinary & Multer with price, discount, inventory, and category tracking.
- **Promotional Events:** Create time-bound promotional events with special pricing tiers.
- **Discount Coupon System:** Generate custom coupon codes (percentage or flat discounts) with eligibility criteria.
- **Order Fulfillment Pipeline:** Detailed order lists with status transitions (e.g., *Processing*, *Shipped*, *Delivered*, *Refunded*).
- **Settings Panel:** Update shop metadata, change password, and manage shop avatars dynamically.

### ⚡ Real-Time Communication Hub
- **Socket.io Integration:** Dual-way socket server matching active connection states.
- **Instant Messaging:** Real-time customer-to-seller messaging with image attachment support.
- **Read Receipts:** Visual indicator showing whether the message has been viewed.
- **Online Status:** Real-time presence detection showing online/offline status for active chats.

---

## ⚙️ Architecture & Tech Stack

### Frontend Directory (`/frontend`)
- **Library:** React (v19)
- **State Management:** Redux Toolkit & Redux Thunk (Cart state, User slice, Seller slice, Products/Events hooks)
- **Styling:** Tailwind CSS & Material UI (MUI) components (including `@mui/x-data-grid` for administrative data tables)
- **Routing:** React Router DOM (v7) with role-based Route Guards (`ProtectedRoute` for buyers, `SellerAuthRoute` for active sellers, and `SellerRedirectRoute` for onboarding redirection)
- **Interceptors:** Axios (configured with credentials support for HttpOnly cookies)

### Backend Directory (`/backend`)
- **Runtime:** Node.js & Express
- **Database:** MongoDB & Mongoose ORM
- **Authentication:** Dual JWT token strategies utilizing HttpOnly cookies (`token` for buyers, `seller_token` for sellers) with custom verification middleware (`isAuthenticated`, `isSeller`)
- **Storage:** Multer middleware paired with Cloudinary for handling and storing cloud image assets
- **Communication:** Nodemailer (using SMTP Brevo relay service) for automated account emails and confirmation hooks
- **Error Handling:** Standardized error-handling middleware (`catchAsyncErrors` and an express-wide error controller)

### Socket.io Directory (`/socketIO`)
- A standalone, event-driven Node.js helper service managing real-time chat handshakes, status broadcasts, and notification emissions.

---

## 📂 Project Directory Structure

```text
E-shop/
├── backend/                  # Node.js + Express API
│   ├── config/               # Environment configuration (.env)
│   ├── controller/           # Router endpoints (user, shop, product, order, coupon, etc.)
│   ├── db/                   # MongoDB connection logic
│   ├── middleware/           # Authentication guards & error handlers
│   ├── model/                # Mongoose Database schemas
│   ├── utils/                # Helper files (JWT tokens, mail senders, custom errors)
│   ├── app.js                # Express app setup, routing definition & cors configurations
│   └── server.js             # Entrypoint server execution script
│
├── frontend/                 # React SPA (Client side)
│   ├── public/               # Public assets & HTML template
│   └── src/                  # React components & screens
│       ├── Components/       # Modular UI blocks (Cart, Wishlist, Profile, Layout)
│       ├── Pages/            # Route level pages (HomePage, ShopDashboard, Inbox, Checkouts)
│       ├── redux/            # Redux store, actions, and reducers configuration
│       ├── routes/           # Protected routing components
│       ├── App.js            # Router layout mapping
│       ├── index.js          # Root DOM renderer
│       └── server.js         # Production vs Localhost backend API URL configuration
│
└── socketIO/                 # Real-time websocket gateway
    ├── index.js              # Event handlers for instant messaging
    └── package.json          # Socket-level dependencies
```

---

## 🛠️ Environment Variables Configuration

To run E-Shop locally, configure environment files in both the backend and socketIO directories:

### Backend `.env` (`backend/config/.env`)
```env
PORT=8000
DB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES=7d
ACTIVATION_SECRET=your_account_activation_secret

# SMTP Server Configurations (Email)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Cloudinary Storage Configuration
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### SocketIO `.env` (`socketIO/.env`)
```env
PORT=4000
```

---

## 🚀 Getting Started (Local Development)

Follow these instructions to run the application on your local machine:

### Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB Atlas cluster or local instance running
- Cloudinary credentials

### Step 1: Install Dependencies
From the root workspace folder, install all required dependencies for all parts of the application:
```bash
# Install root/general scripts
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install socketIO dependencies
cd ../socketIO
npm install
```

### Step 2: Run the Application
You can run the modules concurrently or open separate terminals for each component.

#### Terminal 1: Backend Server (runs on Port `8000`)
```bash
cd backend
npm run dev
# or from root directory:
npm run dev
```

#### Terminal 2: Frontend App (runs on Port `3000`)
```bash
cd frontend
npm start
```

#### Terminal 3: Socket.IO Gate (runs on Port `4000`)
```bash
cd socketIO
node index.js
```

---

## 🚢 Deployment Notes

- **Backend:** Successfully configured for cloud hosting engines (e.g., Render) using cookie configurations optimized for production (`sameSite: 'none'`, `secure: true`).
- **Frontend:** Compatible with hosting on Vercel/Netlify. Ensure `frontend/src/server.js` points to the correct backend API hostname.
- **Images:** All uploads go through Cloudinary. If hosting on platforms like Heroku/Render, local uploads will not persist; Cloudinary integration handles this seamlessly.
