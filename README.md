# 🚀 Real-Time Chat API

A professional, high-performance real-time chat infrastructure built with **TypeScript**, **Express**, **Socket.io**, **MongoDB**, and **Redis**. This project follows a comprehensive 14-day production-ready roadmap.

---

## 📦 Tech Stack

- **Lagnuage:** TypeScript
- **Framework:** Express.js
- **Real-time:** Socket.io
- **Database:** MongoDB (with Mongoose)
- **Caching & State:** Redis
- **Validation:** Zod
- **Authentication:** JWT & Bcrypt.js
- **Testing:** Jest & Supertest
- **Logging:** Winston
- **Security:** Helmet, Rate Limiting, CORS
- **Documentation:** Swagger (OpenAPI)

---

## ✨ Features

### 🔐 Authentication & Security

- **Secure Auth:** JWT-based authentication with password hashing (Bcrypt).
- **Validation:** Strict input validation using Zod.
- **Middleware:** Protected routes via Auth middleware.
- **Security Headers:** Helmet for specialized HTTP headers.
- **Rate Limiting:** Protect against brute-force (100 req/15min).

### 💬 Messaging Capabilities

- **Real-time Delivery:** Instant message relay using Socket.io.
- **History:** Retrieve chat history via optimized REST endpoints.
- **Delivery Status:** Sent ➔ Delivered ➔ Read indicators.
- **Typing Indicators:** Real-time feedback when users are typing.

### 👥 Presence & State

- **Online/Offline Status:** Track user connectivity status using Redis.
- **Caching:** User data and session management optimized with Redis for 70% better performance.
- **Unread Counters:** efficient tracking of missed messages.

### 🛠 Reliability & Performance

- **Logging:** Centralized error handling and logging with Winston.
- **Optimization:** MongoDB indexing and Redis caching strategy.
- **Connectivity:** Connection pooling and health checks.

---

## 🗺 14-Day Roadmap

### Week 1: Core Features

- **Day 1-2: Project Setup & Auth**
  - Project initialization with TypeScript.
  - User Model (username, email, password, isOnline).
  - Register/Login endpoints with JWT generation.
- **Day 3-4: Socket.io & Messaging**
  - Socket.io integration with Auth middleware.
  - Message Model (from, to, content, timestamp).
  - Events: `send-message`, `new-message`.
- **Day 5: Polish & Status**
  - Online/Offline tracking.
  - Typing indicators & delivery status.
  - Centralized error handling & logging.

### Week 2: Modern Tech & Testing

- **Day 6-7: Redis Integration**
  - Online users tracking in Redis sets.
  - Caching user data and typing indicators.
  - Session management implementation.
- **Day 8-9: Comprehensive Testing**
  - Target: **80%+ Coverage**.
  - Unit tests for Services & Utils.
  - Integration tests for REST & Socket events.
- **Day 10: Documentation**
  - Swagger UI setup.
  - Detailed `SOCKET_EVENTS.md`.

### Week 3: Production Ready

- **Day 11-12: Security & Performance**
  - Rate limiting, CORS, NoSQL injection prevention.
  - Pagination for message history.
  - MongoDB/Redis query optimization.
- **Day 13: Deployment**
  - Setup for Railway/Railway-like environments.
  - MongoDB Atlas & Redis Cloud integration.
- **Day 14: Final Polish**
  - Code review and JSDoc comments.
  - Live testing and demo preparation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB
- Redis

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

## 📡 Socket.io Events

| Event           | Direction       | Description                |
| :-------------- | :-------------- | :------------------------- |
| `send-message`  | Client ➔ Server | Send a new message         |
| `new-message`   | Server ➔ Client | Receives a new message     |
| `typing`        | Client ➔ Server | Notify user is typing      |
| `stop-typing`   | Client ➔ Server | Notify user stopped typing |
| `status-update` | Server ➔ Client | User online/offline update |

---

## 🛠 Testing

Run the test suite using Jest:

```bash
npm test
npm run test:coverage
```

---

## 🏥 Health Check

**Endpoint:** `GET /health`
**Response:**

```json
{
  "status": "ok",
  "mongodb": "connected",
  "redis": "connected",
  "uptime": 12345
}
```

---

## 📜 License

MIT License. Created for the Real-Time API 14-Day Challenge.
