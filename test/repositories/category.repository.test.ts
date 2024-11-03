import { v4 as uuidv4 } from "uuid";

import {
  resetCategoriessDb,
  findAllCategories,
  findCategoryById,
  saveCategory,
  removeCategory
} from "../../src/repositories/category.repository";

import { Category } from "../../src/entities/category.entity";

jest.mock("uuid");

describe("CRUD Repository de Categories", () => {
  beforeEach(() => {
    resetCategoriessDb();
  });

  test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", () => {
    const valorEsperado: Category[] = [];
    const valorRetornado: Category[] = findAllCategories();
    expect(valorEsperado).toEqual(valorRetornado);
  });

  test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryId);

    const category = Category.create("Category 1");
    expect(saveCategory(category)).toEqual(category);

    const categories = findAllCategories();
    expect(categories.length).toBe(1);
    expect(categories[0].getTemplates()).toStrictEqual([]);
    expect(categories[0].getName()).toBe("Category 1");
    expect(categories[0].getDescription()).toBe("");
    expect(categories[0].getId()).toEqual(categoryId);
  });

  test("deve retornar undefined quando a categoria não existe", () => {
    expect(findCategoryById("44c8e5fd-5b1b-4099-8286-e799c64e435")).toBeUndefined();
  });

  test("deve retornar uma categoria quando existir cadastrado", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryId);

    const category = Category.create("Category 1", "Categoria descrição");
    expect(saveCategory(category)).toEqual(category);

    expect(findCategoryById(categoryId)).toStrictEqual(category);
  });

  test("deve remover um registro cadastrado", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryId);

    const category = Category.create("Category 1", "Categoria descrição");
    expect(saveCategory(category)).toEqual(category);

    expect(findAllCategories()).toStrictEqual([category]);

    removeCategory(categoryId);
    
    const categories = findAllCategories();
    expect(categories.length).toBe(0);
  });

  test("ao tentar remover uma categoria inexistente, deve retornar undefined", () => {
    expect(removeCategory("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
  });
});
