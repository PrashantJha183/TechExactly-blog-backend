import request from "supertest";
import app from "../app.js";
import { v4 as uuid } from "uuid";

let token;
let postId;

beforeEach(async () => {
  const email = `comment_${uuid()}@test.com`;

  await request(app).post("/api/v1/auth/register").send({
    name: "Comment User",
    email,
    password: "Password@123",
  });

  const login = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password: "Password@123" });

  token = login.body.data.accessToken;

  const post = await request(app)
    .post("/api/v1/posts")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "Post", content: "Content" });

  postId = post.body.data._id;
});

describe("Comment API", () => {
  it("should update own comment", async () => {
    const create = await request(app)
      .post("/api/v1/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({ postId, content: "Initial" });

    const res = await request(app)
      .put(`/api/v1/comments/${create.body.data._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ content: "Updated" });

    expect(res.statusCode).toBe(200);
  });
});
