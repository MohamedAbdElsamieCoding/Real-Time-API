import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import app from "../src/app";
import { Auth } from "../src/models/auth.model";
import { Conversation } from "../src/models/conversation.model";

describe("Conversation Integration Testing", () => {
  let user1Token: string;
  let user1Id: string;
  let user2Id: string;

  const user1 = {
    firstName: "Alice",
    lastName: "Tester",
    userName: "alice123",
    email: "alice@test.com",
    password: "password123",
  };

  const user2 = {
    firstName: "Bob",
    lastName: "Tester",
    userName: "bob123",
    email: "bob@test.com",
    password: "password123",
  };

  beforeAll(async () => {
    // 1. Connect to DB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL!);
    }

    // 2. Cleanup existing test data
    await Auth.deleteMany({ email: { $in: [user1.email, user2.email] } });
    await Conversation.deleteMany({});

    // 3. Register and Login User 1
    const regRes1 = await request(app)
      .post("/api/v1/auth/register")
      .send(user1);
    user1Token = regRes1.body.data.accessToken;
    user1Id = regRes1.body.data.user.id;

    // 4. Register User 2 (to have someone to talk to)
    const regRes2 = await request(app)
      .post("/api/v1/auth/register")
      .send(user2);
    user2Id = regRes2.body.data.user.id;
  });

  afterAll(async () => {
    await Auth.deleteMany({ email: { $in: [user1.email, user2.email] } });
    await Conversation.deleteMany({});
    await mongoose.connection.close();
  });

  describe("POST /api/v1/conversations", () => {
    it("should create a new conversation successfully", async () => {
      const res = await request(app)
        .post("/api/v1/conversations")
        .set("Authorization", `Bearer ${user1Token}`)
        .send({ participantId: user2Id });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data.participants).toContain(user1Id);
      expect(res.body.data.participants).toContain(user2Id);
    });

    it("should return 401 if user is not logged in", async () => {
      const res = await request(app)
        .post("/api/v1/conversations")
        .send({ participantId: user2Id });

      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
    });
  });

  describe("GET /api/v1/conversations", () => {
    it("should fetch all conversations for the logged-in user", async () => {
      const res = await request(app)
        .get("/api/v1/conversations")
        .set("Authorization", `Bearer ${user1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });
});
