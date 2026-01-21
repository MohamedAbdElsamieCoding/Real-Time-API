import request from "supertest";
import mongoose from "mongoose";
import "dotenv/config";
import { Auth } from "../src/models/auth.model";
import app from "../src/app";

describe("Auth Integration testing", () => {
  const testUser = {
    firstName: "Mo",
    lastName: "Amr",
    userName: "Mo Amr",
    email: "mo@test.com",
    password: "test1234",
  };

  // Connect to database before running tests
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL!);
    }
  });

  // Cleanup the Test user
  afterAll(async () => {
    await Auth.deleteOne({ email: testUser.email });
    await mongoose.connection.close();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should register new user successfully", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(testUser);
      expect(res.status).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data).toHaveProperty("accessToken");
    });
    it("should fail to register with an existing email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(testUser);
      expect(res.status).toBe(409);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Email already registered");
    });
    it("should fail if required fields are missing", async () => {
      const { email, ...incompleteUser } = testUser;
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(incompleteUser);
      expect(res.status).toBe(400);
      expect(res.body.status).toBe("fail");
    });
  });
  describe("POST /api/v1/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toHaveProperty("accessToken");
      expect(res.body.data.user.email).toBe(testUser.email);
    });
    it("should fail to login with wrong password", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: testUser.email,
        password: "wrong password",
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
      expect(res.body.message).toBe("Invalid email or password");
    });
    it("should fail to login with non-existing email", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "fail@test.com",
        password: testUser.password,
      });
      expect(res.status).toBe(401);
      expect(res.body.status).toBe("fail");
    });
  });
  describe("POST /api/v1/auth/refresh", () => {
    it("should return a new access token using a valid refresh token cookie", async () => {
      const loginRes = await request(app).post("/api/v1/auth/login").send({
        email: testUser.email,
        password: testUser.password,
      });
      const cookie = loginRes.headers["set-cookie"];

      const res = await request(app)
        .post("/api/v1/auth/refresh")
        .set("Cookie", cookie);
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("accessToken");
    });
  });
  describe("POST /api/v1/auth/logout", () => {
    it("should logout successfully and clear cookie", async () => {
      const res = await request(app).post("/api/v1/auth/logout");
      expect(res.status).toBe(200);
      expect(res.headers["set-cookie"][0]).toMatch(/refreshToken=;/);
    });
  });
});
