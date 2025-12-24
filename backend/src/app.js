import express from "express";
import cors from "cors";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/health", (_, res) => res.json({ ok: true }));

  // TODO: GET /posts (next step)
  app.get("/posts", (_, res) => {
    res.status(501).json({ message: "Not implemented yet" });
  });

  return app;
}
