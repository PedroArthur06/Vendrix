import request from "supertest";
import { describe, it, expect } from "vitest";
import { app } from "../../../../shared/infra/http/app";

describe("Auth Routes Integration", () => {
  it("should be able to register a new user", async () => {
    const response = await request(app)
      .post("/api/v1/register")
      .send({
        email: "pedro@example.com",
        password: "password123",
        profile: {
          name: "JPedro Arthur",
          phone: "123456789",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.email).toBe("pedro@example.com");
  });

  it("should not be able to register a user with existing email", async () => {
    await request(app)
      .post("/api/v1/register")
      .send({
        email: "pedro2@example.com",
        password: "password123",
        profile: { name: "Pedro 1" },
      });

    const response = await request(app)
      .post("/api/v1/register")
      .send({
        email: "pedro2@example.com",
        password: "password123",
        profile: { name: "Pedro 1" },
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User with this email already exists");
  });

  it("should be able to login", async () => {
    await request(app)
      .post("/api/v1/register")
      .send({
        email: "pedro@example.com",
        password: "password123",
        profile: { name: "Login User" },
      });

    const response = await request(app).post("/api/v1/login").send({
      email: "pedro@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail validation with bad data", async () => {
    const response = await request(app).post("/api/v1/register").send({
      email: "not-an-email",
      profile: {},
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Validation failed");
  });
});
