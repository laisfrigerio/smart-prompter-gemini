import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  resetCategories,
} from "../../src/services/category.service";
import { Category } from "../../src/interfaces/category.interface";

import { v4 as uuidv4 } from "uuid";

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
      name: "Categoria",
      description: "Descrição da categoria",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    // quando a função uuidv4 for chamada, ela retornará o valor da variável categoryIdMock
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    const newCategory = createCategory(category);

    const fullCategory = { ...category, id: categoryIdMock };

    expect(newCategory).toEqual(fullCategory);
    expect(getAllCategories()).toStrictEqual([fullCategory]);
  });

  test("deve lançar uma exception de Not Found quando a categoria não existe", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => getCategoryById(categoryId)).toThrow(
      `Category with id ${categoryId} not found`
    );
  });

  test("deve retornar uma categoria quando existir cadastrada", () => {
    const category = {
      name: "Categoria",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    // quando a função uuidv4 for chamada, ela retornará o valor da variável categoryIdMock
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    createCategory(category);

    const fullCategory = { ...category, id: categoryIdMock };

    expect(getCategoryById(categoryIdMock)).toStrictEqual(fullCategory);
  });

  test("deve remover um registro cadastrado", () => {
    const category = {
      name: "Categoria",
      description: "Descrição da categoria",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    // quando a função uuidv4 for chamada, ela retornará o valor da variável categoryIdMock
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    createCategory(category);

    const fullCategory = { ...category, id: categoryIdMock };

    expect(getAllCategories()).toStrictEqual([fullCategory]);

    deleteCategory(categoryIdMock);
    expect(getAllCategories()).toStrictEqual([]);
  });

  test("ao tentar remover uma categoria inexistente, deve retornar uma exception de Not Found", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => deleteCategory(categoryId)).toThrow(
      `Category with id ${categoryId} not found`
    );
  });

  test("ao tentar editar uma categoria inexistente, deve retornar uma exception de Not Found", () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => updateCategory(categoryId, { name: "Category" })).toThrow(
      `Category with id ${categoryId} not found`
    );
  });

  test("deve atualizar um registro", () => {
    const category = {
      name: "Category",
      description: "Descrição da tag",
    };

    const categoryIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    // quando a função uuidv4 for chamada, ela retornará o valor da variável categoryIdMock
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdMock);

    createCategory(category);

    const fullCategory = { ...category, id: categoryIdMock };

    expect(getAllCategories()).toStrictEqual([fullCategory]);

    const editCategory = {
      name: "Categoria 1",
      description: "Descrição da categoria",
    };

    updateCategory(categoryIdMock, editCategory);
    expect(getAllCategories()).toStrictEqual([
      { ...editCategory, id: categoryIdMock },
    ]);
  });
});
