import express, { Request, Response } from "express";

import { NotFoundException } from "../exceptions/not-found.exception";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

const router = express.Router();

router.get("/categories", (_req: Request, res: Response) => {
  res.json(getAllCategories());
});

router.post("/categories", (req: Request, res: Response) => {
  const { name, description } = req.body;
  res.status(201)
    .json(createCategory({ name, description }));
});

router.get("/categories/:id", (req: Request, res: Response) => {
  try {
    const category = getCategoryById(req.params.id);
    res.json(category);
  } catch (error: any) {
    res.status(404)
      .json({ message: error.message });
  }
});

router.put("/categories/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = updateCategory(id, { name, description });
    res.json(category);
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

router.delete("/categories/:id", (req: Request, res: Response) => {
  try {
    deleteCategory(req.params.id);
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

export default router;
