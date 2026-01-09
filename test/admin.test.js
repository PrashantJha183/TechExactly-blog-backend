import request from "supertest";
import app from "../app.js";
import User from "../models/User.model.js";

let adminToken;
let userPostId;

beforeEach(async () => {
  // create admin
  await request(app).post("/api/v1/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "Password@123",
  });

  // promote to ADMIN
  const admin = await User.findOne({ email: "admin@test.com" });
  admin.role = "ADMIN";
  await admin.save();

  const loginAdmin = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: "admin@test.com", password: "Password@123" });

  adminToken = loginAdmin.body.data.accessToken;

  // create user + post
  await request(app).post("/api/v1/auth/register").send({
    name: "User",
    email: "user@test.com",
    password: "Password@123",
  });

  const loginUser = await request(app)
    .post("/api/v1/auth/login")
    .send({ email: "user@test.com", password: "Password@123" });

  const userToken = loginUser.body.data.accessToken;

  const post = await request(app)
    .post("/api/v1/posts")
    .set("Authorization", `Bearer ${userToken}`)
    .send({ title: "User Post", content: "Admin can delete" });

  userPostId = post.body.data._id;
});

describe("Admin API", () => {
  it("admin should delete any post", async () => {
    const res = await request(app)
      .delete(`/api/v1/admin/posts/${userPostId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
  });
});
