import express, { Request, Response } from "express";

import { NotFoundException } from "../exceptions/not-found.exception";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../services/category.service";

import { getSimplifiedCategory } from "../adapters/category.adapter";

import { getErrorMessage } from "../exceptions/helpers";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lista todas as categorias
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Category"
 */
router.get("/categories", (_req: Request, res: Response) => {
  res.json(
    getAllCategories().map((category) => getSimplifiedCategory(category))
  );
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Cria uma nova categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 */
router.post("/categories", (req: Request, res: Response) => {
  const { name, description } = req.body;
  res.status(201).json(createCategory({ name, description }));
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 *       404:
 *         description: Categoria não encontrada
 */
router.get("/categories/:id", (req: Request, res: Response) => {
  try {
    const category = getCategoryById(req.params.id);
    res.json(getSimplifiedCategory(category));
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    res.status(404).json({ message: errorMessage });
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Editar uma categoria existente
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             schema:
 *               type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoria editada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Category"
 */
router.put("/categories/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = updateCategory(id, { name, description });
    res.json(getSimplifiedCategory(category));
  } catch (error: unknown) {
    if (error instanceof NotFoundException) {
      res.status(404).json({ message: error.message });
    } else {
      const errorMessage = getErrorMessage(error);
      res.status(500).json({ message: `Unexpected error: ${errorMessage}` });
    }
  }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Remover uma categoria
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             schema:
 *               type: string
 *     responses:
 *       204:
 *         description: Categoria removida com sucesso
 */
router.delete("/categories/:id", (req: Request, res: Response) => {
  try {
    deleteCategory(req.params.id);
    res.sendStatus(204);
  } catch (error: unknown) {
    if (error instanceof NotFoundException) {
      res.status(404).json({ message: error.message });
    } else {
      const errorMessage = getErrorMessage(error);
      res.status(500).json({ message: `Unexpected error: ${errorMessage}` });
    }
  }
});

export default router;
