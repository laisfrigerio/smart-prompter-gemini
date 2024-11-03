import express, { Request, Response } from "express";

import { NotFoundException } from "../exceptions/not-found.exception";
import {
  getAllTemplates,
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../services/template.service";

const router = express.Router();

router.get("/templates", (_req: Request, res: Response) => {
  res.json(getAllTemplates());
});

router.post("/templates", (req: Request, res: Response) => {
  const { title, content } = req.body;
  res.sendStatus(201)
    .json(createTemplate({ title, content }));
});

router.get("/templates/:id", (req: Request, res: Response) => {
  try {
    const template = getTemplateById(req.params.id);
    res.json(template);
  } catch (error: any) {
    res.sendStatus(404)
      .json({ message: error.message });
  }
});

router.put("/templates/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const template = updateTemplate(id, { title, content });
    res.json(template);
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.sendStatus(404)
        .json({ message: error.message });
    } else {
      res.sendStatus(500)
        .json({ message: `Unexpected error: ${error.message}` });
    }
  }
});

router.delete("/templates/:id", (req: Request, res: Response) => {
  try {
    const template = deleteTemplate(req.params.id);
    res.json(template);
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.sendStatus(404)
        .json({ message: error.message });
    } else {
      res.sendStatus(500)
        .json({ message: `Unexpected error: ${error.message}` });
    } 
  }
});

export default router;
