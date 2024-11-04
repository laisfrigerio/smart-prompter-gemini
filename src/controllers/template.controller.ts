import express, { Request, Response } from "express";

import { NotFoundException } from "../exceptions/not-found.exception";
import {
  getAllTemplates,
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  attachCategory,
  detachCategory,
  getCategoriesByTemplate,
} from "../services/template.service";
import { getSimplifiedTemplate } from "../adapters/template.adapter";
import { getSimplifiedCategory } from "../adapters/category.adapter";

const router = express.Router();

router.get("/templates", (_req: Request, res: Response) => {
  res.json(getAllTemplates().map(template => getSimplifiedTemplate(template)));
});

router.get("/templates/:templateId/categories", (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const categories = getCategoriesByTemplate(templateId);
    res.json(categories.map(category => getSimplifiedCategory(category)));
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.status(404)
        .json({ message: error.message });
    } else {
      res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
  }
});

router.post("/templates", (req: Request, res: Response) => {
  const { title, content } = req.body;
  res.status(201)
    .json(createTemplate({ title, content }));
});

router.get("/templates/:id", (req: Request, res: Response) => {
  try {
    const template = getTemplateById(req.params.id);
    res.json(getSimplifiedTemplate(template));
  } catch (error: any) {
    res.status(404)
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
      res.status(404)
        .json({ message: error.message });
    } else {
      res.status(500)
        .json({ message: `Unexpected error: ${error.message}` });
    }
  }
});

router.delete("/templates/:id", (req: Request, res: Response) => {
  try {
    deleteTemplate(req.params.id);
    res.sendStatus(204);
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.status(404)
        .json({ message: error.message });
    } else {
      res.status(500)
        .json({ message: `Unexpected error: ${error.message}` });
    } 
  }
});

router.post("/templates/:templateId/categories/:categoryId", (req: Request, res: Response) => {
  try {
    const { templateId, categoryId } = req.params;
    const updatedTemplate = attachCategory(templateId, categoryId);
    res.json(getSimplifiedTemplate(updatedTemplate));
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.status(404)
        .json({ message: error.message });
    } else {
      res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
  }
});

router.delete("/templates/:templateId/categories/:categoryId", (req: Request, res: Response) => {
  try {
    const { templateId, categoryId } = req.params;
    const updatedTemplate = detachCategory(templateId, categoryId);
    res.json(getSimplifiedTemplate(updatedTemplate));
  } catch (error: any) {
    if (error instanceof NotFoundException) {
      res.status(404)
        .json({ message: error.message });
    } else {
      res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
  }
});

export default router;
