import request from "supertest";
import app from "../app.js";
import { v4 as uuid } from "uuid";

let token;

beforeEach(async () => {
  const email = `post_${uuid()}@test.com`;

  await request(app).post("/api/v1/auth/register").send({
    name: "Post User",
    email,
    password: "Password@123",
  });

  const login = await request(app)
    .post("/api/v1/auth/login")
    .send({ email, password: "Password@123" });

  token = login.body.data.accessToken;
});

describe("Post API", () => {
  it("should update own post", async () => {
    const create = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Old", content: "Old content" });

    const res = await request(app)
        .put(`/api/v1/posts/${create.body.data._id}`)
    //   .put(`/api/v1/posts/${id}`)

      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated" });

    expect(res.statusCode).toBe(200);
  });

  it("should delete own post", async () => {
    const create = await request(app)
      .post("/api/v1/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Delete", content: "Delete content" });

    const res = await request(app)
      .delete(`/api/v1/posts/${create.body.data._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
