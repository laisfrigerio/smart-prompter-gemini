import express, { Request, Response } from "express";

import { chat } from "../services/chat.service";

const router = express.Router();

router.post("/api/v1/chat", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const text = await chat(prompt);
    res.json({ response: text });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
