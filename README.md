# 🚀 Real-Time Chat API

A high-performance, production-ready real-time chat infrastructure built with **TypeScript**, **Node.js**, **Socket.io**, and **MongoDB**. This API features a robust security layer, dual-token authentication, and a containerized environment.

---

## 📦 Tech Stack

- **Runtime:** Node.js (v18+)
- **Language:** TypeScript
- **Framework:** Express.js
- **Real-time Engine:** Socket.io
- **Databases:**
  - **MongoDB:** Primary data store for users and messages.
  - **Redis:** Used for Socket.io adapter (scaling) and real-time presence tracking.
- **Security:** JWT (Access/Refresh), Bcrypt, Helmet, CORS, Rate Limiting (Roadmap).
- **Testing:** Jest, Supertest.
- **Containerization:** Docker, Docker Compose.

---

## ✨ Key Features

### 🔐 Advanced Authentication

- **Dual-Token System:** Short-lived Access Tokens (JWT) and persistent HTTP-only Refresh Tokens.
- **Secure Logout:** Synchronized server-side token clearing and client-side cookie removal.
- **Validation:** Strict schema validation for all endpoints using **Zod**.

### 💬 Messaging & Real-Time

- **Instant Delivery:** Real-time event-driven communication using Socket.io.
- **Presence Tracking:** Global online/offline status powered by Redis.
- **Conversation Management:** Intelligent drafting and retrieval of 1-to-1 and group chats.

### 🛡 Production Readiness

- **Dockerized Architecture:** One-command setup for the entire stack (API + DB + Redis).
- **Health Monitoring:** Dedicated `/health` endpoint for cloud deployment checks (Railway, Render, AWS).
- **ESM Native:** Fully compliant with modern Node.js ES Modules.

---

## 🗺 Roadmap

- [x] **Phase 1: Core Foundation** (Auth, JWT, Mongoose setup)
- [x] **Phase 2: Messaging** (Socket.io, Persistence, Presence)
- [x] **Phase 3: Reliability** (Systematic Testing, Documentation)
- [x] **Phase 4: Deployment** (Dockerization, Production Tuning)

---

## 🚀 Getting Started

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/MohamedAbdElsamieCoding/Real-Time-API.git
    cd Real-Time-API
    ```
2.  **Environment Setup**:
    Create a `.env` file with the following:
    ```env
    PORT=5000
    MONGO_URL=your_mongodb_url
    REDIS_URL=your_redis_url
    JWT_SECRET=your_access_secret
    REFRESH_SECRET=your_refresh_secret
    ```

### Running the App

**Option A: Local Development (Requires Node.js, MongoDB, Redis)**

```bash
npm install
npm run dev
```

**Option B: Docker Deployment (Recommended - No local installs needed)**

```bash
docker-compose up --build
```

---

## 🧪 Testing

The API includes a comprehensive integration test suite using **Jest** and **Supertest**.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 📡 API Documentation

Interactive Swagger documentation is available once the server starts:
`http://localhost:5000/api-docs`

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
