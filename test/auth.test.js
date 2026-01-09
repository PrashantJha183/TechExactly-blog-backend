import request from "supertest";
import app from "../app.js";

describe("Auth API", () => {
  const user = {
    name: "Test User",
    email: "testuser@test.com",
    password: "Password@123",
  };

  it("should register a user", async () => {
    const res = await request(app).post("/api/v1/auth/register").send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe(user.email);
  });

  it("should login a user", async () => {
    await request(app).post("/api/v1/auth/register").send(user);

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: user.email, password: user.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.refreshToken).toBeDefined();
  });

  it("should reject login with wrong password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: user.email, password: "Wrong@123" });

    expect(res.statusCode).toBe(401);
  });
});
