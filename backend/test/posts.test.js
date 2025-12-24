const request = require("supertest");
import { expect, beforeEach, afterEach, test, vi } from "vitest";
const app = require("../src/app");

// Mock fetch global
beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

test("GET /posts returns grouped list", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [
      { name: "Pedro", id: "1" },
      { name: "Pedro", id: "2" },
      { name: "Ana", id: "3" },
      { name: "   ", id: "4" }, // ignored
      { id: "5" } // ignored
    ],
  });

  const res = await request(app).get("/posts");
  expect(res.status).toBe(200);
  expect(res.body).toEqual([
    { name: "Ana", postCount: 1 },
    { name: "Pedro", postCount: 2 },
  ]);
});

test("GET /posts returns 500 when external API fails", async () => {
  global.fetch.mockResolvedValue({ ok: false, status: 500 });

  const res = await request(app).get("/posts");
  expect(res.status).toBe(500);
  expect(res.body).toEqual({ message: "Internal Server Error" });
});

test("GET /posts?name=pe filters by name (case-insensitive)", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => [
      { name: "Pedro", id: "1" },
      { name: "Ana", id: "2" }
    ],
  });

  const res = await request(app).get("/posts?name=pe");
  expect(res.status).toBe(200);
  expect(res.body).toEqual([{ name: "Pedro", postCount: 1 }]);
});
