# 🚀 Real-Time Chat API

A professional, high-performance real-time chat infrastructure built with **TypeScript**, **Express**, **Socket.io**, and **MongoDB**. This project follows a comprehensive production-ready roadmap.

---

## 📦 Tech Stack

- **Language:** TypeScript
- **Framework:** Express.js
- **Real-time:** Socket.io
- **Database:** MongoDB (with Mongoose)
- **Validation:** Zod
- **Authentication:** JWT (Access & Refresh Tokens) & Bcrypt.js
- **Security:** Helmet, CORS
- **Documentation:** Swagger (OpenAPI)

---

## ✨ Features

### 🔐 Authentication & Security

- **[x] Secure Auth:** JWT-based authentication with password hashing (Bcrypt).
- **[x] Dual Tokens:** Access and Refresh token implementation for secure sessions.
- **[x] Validation:** Strict input validation using Zod schemas.
- **[x] Security Headers:** Helmet for specialized HTTP headers.
- **[x] CORS:** Configured for secure cross-origin requests.

### 💬 Messaging & Conversations

- **[x] Real-time Delivery:** Instant message relay using Socket.io.
- **[x] Message Persistence:** Messages are stored in MongoDB.
- **[x] Conversation Management:** Full CRUD operations for chat rooms/conversations.
- **[x] Online Tracking:** Track user connectivity status in real-time.

### 🛠 Reliability & Performance

- **[x] Error Handling:** Centralized middleware for consistent error responses.
- **[x] API Documentation:** Interactive Swagger UI documentation.
- **[x] Scalable Structure:** Modular folder architecture for controllers, services, and routes.

---

## 🗺 Roadmap Progress

### ✅ Phase 1: Core Foundation & Auth

- [x] Project initialization with TypeScript & ES Modules.
- [x] MongoDB connection & configuration.
- [x] User Model & Auth routes (Register/Login).
- [x] JWT Access & Refresh token logic.
- [x] Input validation middleware with Zod.

### ✅ Phase 2: Messaging & Real-Time

- [x] Socket.io integration with the server.
- [x] Message persistence with MongoDB.
- [x] Real-time events (send-message, user-status).
- [x] Conversation management (Rooms/Direct Chats).

### 🚀 Phase 3: Documentation & Polish

- [x] Swagger UI integration with YAML configuration.
- [x] Conversation retrieval endpoints.
- [x] Redis integration for caching & presence.
- [ ] Unit & Integration testing (Jest/Supertest) (Next Step).
- [ ] Production deployment setup.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedAbdElsamieCoding/Real-Time-API.git
   cd Real-Time-API
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment variables:
   - Create a `.env` file based on `.env.example`.
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📡 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:5000/api-docs`

---

## 📡 Socket.io Events

| Event           | Direction       | Description                |
| :-------------- | :-------------- | :------------------------- |
| `send-message`  | Client ➔ Server | Send a new message         |
| `new-message`   | Server ➔ Client | Receives a new message     |
| `status-update` | Server ➔ Client | User online/offline update |

---

## 🏥 Health Check

**Endpoint:** `GET /api/v1/auth/health` (or check individual service status)

---

## 📜 License

MIT License.
