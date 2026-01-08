# MERN Blog Application – Backend (Server)

A production-ready **Blog Application Backend** built using the **MERN stack**  
(**MongoDB, Express.js, Node.js**).

This backend implements **authentication, role-based access control (RBAC), posts, comments, and admin APIs** following clean architecture and best practices.

---

## Features Overview

### Authentication & Authorization
- User registration, login, logout
- JWT Access Token & Refresh Token
- Secure password hashing using **bcrypt**
- Token-based authentication middleware
- Role-Based Access Control (RBAC)
  - **Admin**
  - **Regular User**

---

### Post Management
- Create, Read, Update, Delete (CRUD) posts
- Public access for reading posts
- Auth-protected write operations
- Author ownership validation
- Soft delete support
- Pagination & optimized MongoDB queries
- SEO-friendly slug generation

---

### Comment Management
- Add comments to posts
- Fetch comments by post (public)
- Fetch logged-in user’s comments
- Update/Delete own comments
- Admin can manage all comments

---

### Admin APIs
- Admin dashboard statistics
- Manage all users
- Change user roles
- Delete any post or comment

---

### Security & Performance
- JWT-based authentication
- Rate limiting on sensitive endpoints
- MongoDB injection protection
- Compression enabled
- Centralized error handling
- Modular middleware architecture

---

## Installation Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/PrashantJha183/TechExactly-blog-backend
cd TechExactly-blog-backend
```

---

### 2️⃣ Install Dependencies
```bash
npm install
```

---

### 3️⃣ Environment Variables (`.env`)

Create a `.env` file in the **server root directory** and add:

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/TechExactly

# JWT Secrets
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# Token Expiry
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

---

### 4️⃣ Run the Application
```bash
nodemon app
```

---

## API Documentation Overview

### Authentication APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/auth/logout` | Logout user |
| GET | `/api/v1/auth/me` | Get logged-in user |
| PATCH | `/api/v1/auth/change-password` | Change password |

---

### Post APIs

| Method | Endpoint | Access |
|------|---------|--------|
| GET | `/api/v1/posts` | Public |
| GET | `/api/v1/posts/:id` | Public |
| POST | `/api/v1/posts` | Auth |
| PUT | `/api/v1/posts/:id` | Auth |
| DELETE | `/api/v1/posts/:id` | Auth |

---

### Comment APIs

| Method | Endpoint | Access |
|------|---------|--------|
| GET | `/api/v1/comments/post/:postId` | Public |
| GET | `/api/v1/comments/my-comments` | Auth |
| POST | `/api/v1/comments` | Auth |
| PUT | `/api/v1/comments/:id` | Auth |
| DELETE | `/api/v1/comments/:id` | Auth |

---

### Admin APIs

| Method | Endpoint |
|------|---------|
| GET | `/api/v1/admin/dashboard` |
| GET | `/api/v1/admin/users` |
| PATCH | `/api/v1/admin/users/:id/role` |
| DELETE | `/api/v1/admin/posts/:id` |
| DELETE | `/api/v1/admin/comments/:id` |

---

## Architecture Highlights
- Clean separation of concerns
- Routes → Controllers → Services → Models
- Middleware-driven authentication & authorization
- Scalable and maintainable backend design

---

## Testing
- APIs tested using **Postman / Thunder Client**
- JWT-protected route validation
- Manual integration testing completed

---

## Author
**Prashant Jha**
