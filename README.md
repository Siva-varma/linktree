# LinkHub - Personal Link Management Platform

A modern, full-stack application that consolidates all your important links in one place and provides real-time analytics on link performance.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [How to Use](#how-to-use)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**LinkHub** is a link management platform that helps users:
- Create one shareable URL for all their important links
- Manage multiple links from a centralized dashboard
- Track click analytics on each link
- Share their profile with audiences
- Update links without changing the shared URL

Instead of sharing multiple links, users share just one unique URL like `yoursite.com/username`.

---

## ✨ Features

### Core Features
1. **Custom Public Profile** - Every user gets a unique shareable URL with all their links
2. **Link Management Dashboard** - Add, edit, delete, and reorder links easily
3. **Click Analytics** - Track total clicks and per-link performance with visual graphs
4. **Secure Authentication** - JWT + cookie-based auth with password hashing
5. **Security Features** - CORS protection, rate limiting, helmet headers, input validation

---

## 🛠 Tech Stack

### Frontend
- React 19 + Vite
- Redux Toolkit (state management)
- Tailwind CSS v4
- React Router v7
- Axios (HTTP client)

### Backend
- Node.js + Express.js v5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- Zod (validation)
- Security: Helmet, HPP, Rate Limiting

---

## 📦 Prerequisites

- **Node.js** v18+ - [Download](https://nodejs.org/)
- **MongoDB** v5+ (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/linktree.git
cd linktree
```

### Step 2: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install from https://www.mongodb.com/try/download/community
# Start service and use: mongodb://localhost:27017
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create cluster and get connection string
- Keep it for `.env` configuration

### Step 3: Backend Setup

```bash
cd server
npm install
```

Create `/server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/linkhub
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
COOKIE_EXPIRE=7
COOKIE_SECURE=false
COOKIE_HTTPONLY=true
```

Run backend:
```bash
npm run dev
```
✅ Backend: `http://localhost:5000`

### Step 4: Frontend Setup

```bash
cd ../client
npm install
```

Create `/client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Run frontend:
```bash
npm run dev
```
✅ Frontend: `http://localhost:5173`

---

## 🎮 Running the Project

### Development Mode

**Terminal 1:**
```bash
cd server && npm run dev
```

**Terminal 2:**
```bash
cd client && npm run dev
```

Open: `http://localhost:5173`

### Production Build

```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

---

## 📁 Project Structure

```
linktree/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── api/                 # API configuration
│   │   ├── app/                 # Redux store
│   │   ├── assets/              # Images & SVGs
│   │   ├── components/          # React components
│   │   │   ├── auth/            # Login/Register
│   │   │   ├── layout/          # App layout
│   │   │   └── links/           # Link components
│   │   ├── features/            # Redux slices
│   │   └── pages/               # Page components
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── app.js               # Express setup
│   │   ├── config/              # Configuration
│   │   ├── db/                  # Database connection
│   │   ├── middlewares/         # Auth, errors, security
│   │   ├── models/              # User, Link schemas
│   │   ├── modules/             # Auth & Links features
│   │   └── utils/               # Helper functions
│   └── package.json
│
└── README.md
```

---

## 👤 How to Use

### 1. Landing Page
- Visit `http://localhost:5173`
- View features and benefits
- Click "Get started" to register

### 2. Register Account
- Fill: username, email, password
- Account created automatically
- Redirected to dashboard

### 3. Dashboard
- See your custom link: `yoursite.com/your_username`
- View statistics: Total Links & Total Clicks
- Manage all your links

### 4. Add Links
- Fill Link Form:
  - **Title:** Link name (e.g., "My Portfolio")
  - **URL:** Full URL (e.g., "https://example.com")
- Click "Create Link"
- Link appears instantly

### 5. Manage Links
- **Edit:** Click edit, make changes, save
- **Delete:** Click delete to remove
- **View:** See click count for each

### 6. Public Profile
- New tab: `http://localhost:5173/your_username`
- See how visitors view your links
- Test by clicking links

### 7. Analytics
- Return to dashboard
- Watch clicks update in real-time
- View Analytics Graph for trends

### 8. Share
- Copy your custom link
- Share on social media, email, business cards
- Update links anytime without resharing

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Register
```
POST /api/auth/register
Content-Type: application/json

Body:
{
  "username": "your_username",
  "email": "your@email.com",
  "password": "YourPassword123"
}

Response: 200 OK
{
  "success": true,
  "user": { "_id": "...", "username": "...", "email": "..." }
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "your@email.com",
  "password": "YourPassword123"
}

Response: 200 OK + Cookie set
{
  "success": true,
  "user": { "_id": "...", "username": "...", "email": "..." }
}
```

### Create Link
```
POST /api/links/create
Authorization: Bearer {jwt_token}
Content-Type: application/json

Body:
{
  "title": "My Portfolio",
  "url": "https://myportfolio.com"
}

Response: 201 Created
{
  "success": true,
  "link": { "_id": "...", "title": "...", "url": "...", "noOfClicks": 0 }
}
```

### Get Analytics
```
GET /api/links/analysis
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "success": true,
  "data": {
    "totalLinks": 5,
    "totalClicks": 142,
    "links": [...]
  }
}
```

### Update Link
```
PUT /api/links/update/{link_id}
Authorization: Bearer {jwt_token}

Body:
{
  "title": "Updated Title",
  "url": "https://newurl.com"
}

Response: 200 OK
```

### Delete Link
```
DELETE /api/links/delete/{link_id}
Authorization: Bearer {jwt_token}

Response: 200 OK
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:** Start MongoDB service or use MongoDB Atlas connection string

### Port Already in Use
```bash
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000 && kill -9 <PID>
```

### CORS Error
**Fix:** Verify `CORS_ORIGIN` in `.env` matches your frontend URL

### Links Not Showing
**Fix:** Refresh page, clear cache, ensure logged in

### Path Not Defined Error
**Fix:** In `server/src/app.js`, ensure proper imports and route order:
- Import: `import path from "path"` and `import { fileURLToPath } from "url"`
- Move wildcard route `/*` to END (after all API routes)

---

## 🚀 Future Enhancements

- Custom themes and branding
- QR code generation
- Advanced analytics
- Link scheduling
- Team collaboration
- API integrations
- Dark mode
- Custom domains

---

## 🎉 Quick Start

```bash
# Clone & setup
git clone <repo> && cd linktree

# Backend (Terminal 1)
cd server && npm install
# Create .env file with MONGODB_URI
npm run dev

# Frontend (Terminal 2)
cd ../client && npm install
npm run dev

# Open http://localhost:5173
```

---

**Happy linking! 🔗✨**
