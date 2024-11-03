import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  resetCategories,
} from "../../src/services/category.service";
import { Category } from "../../src/entities/category.entity";

import { v4 as uuidv4 } from "uuid";
import e from "express";

jest.mock("uuid");

describe("CRUD Service de Categories", () => {
  beforeEach(() => {
    resetCategories();
  });

  test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", () => {
    const valorEsperado: Category[] = [];
    const valorRetornado: Category[] = getAllCategories();

    expect(valorEsperado).toEqual(valorRetornado);
  });

  test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", () => {
    const category = {
      name: "Category 1",
      description: "Conteúdo da Category 1",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    const newCategory = createCategory(category);
    const fullCategory = new Category(categoryIdMock, category.name, category.description);

    expect(newCategory).toEqual(fullCategory);
    expect(getAllCategories()).toStrictEqual([fullCategory]);
  });

  test("deve lançar uma exception de Not Found quando a categoria não existe", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => getCategoryById(categoryId)).toThrow(
      `Category with id ${categoryId} not found`
    );
  });

  test("deve retornar uma categoria quando existir cadastrado", () => {
    const category = {
      name: "Category 1",
      description: "Conteúdo da Category 1",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    createCategory(category);

    const fullCategory = new Category(categoryIdMock, category.name, category.description);

    expect(getCategoryById(categoryIdMock)).toStrictEqual(fullCategory);
  });

  test("deve remover um registro cadastrado", () => {
    const category = {
      name: "Category 1",
      description: "Conteúdo da Category 1",
    };

    const categorydMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categorydMock);

    createCategory(category);

    const fullCategory = new Category(categorydMock, category.name, category.description);

    expect(getAllCategories()).toStrictEqual([fullCategory]);

    deleteCategory(categorydMock);
    expect(getAllCategories().length).toBe(0);
  });

  test("ao tentar remover uma categoria inexistente, deve retornar uma exception de Not Found", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => deleteCategory(categoryId)).toThrow(
      `Category with id ${categoryId} not found`
    );
  });

  test("ao tentar editar uma categoria inexistente, deve retornar uma exception de Not Found", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() =>
      updateCategory(categoryId, { name: "Titulo", description: "Descrição" })
    ).toThrow(`Category with id ${categoryId} not found`);
  });

  test("deve atualizar um registro", () => {
    const category = {
      name: "Category 1"
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    createCategory(category);

    const fullCategory = new Category(categoryIdMock, category.name);

    expect(getAllCategories()).toStrictEqual([fullCategory]);

    const editCategory = { name: "Titulo", description: "Descrição" };

    updateCategory(categoryIdMock, editCategory);
    expect(getAllCategories()).toStrictEqual([
      new Category(categoryIdMock, editCategory.name, editCategory.description)
    ]);
  });
});
