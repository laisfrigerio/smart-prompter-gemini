import { v4 as uuidv4 } from "uuid";
import { NotFoundException } from "../exceptions/not-found.exception";
import { Category, UpsertCategory } from "../interfaces/category.interface";
import {
  findAllCategories,
  findCategoryById,
  saveCategory,
  removeCategory,
  resetCategoriesDb,
} from "../repositories/category.repository";

const getAllCategories = (): Category[] => {
  return findAllCategories();
};

const createCategory = ({ name, description }: UpsertCategory): Category => {
  let newCategory: Category = {
    id: uuidv4(),
    name,
  };

  if (description) {
    newCategory.description = description;
  }

  const category = saveCategory(newCategory);
  return category;
};

const getCategoryById = (id: string): Category => {
  const category = findCategoryById(id);

  if (!category) {
    throw new NotFoundException(`Category with id ${id} not found`);
  }

  return category;
};

const updateCategory = (
  id: string,
  { name, description }: UpsertCategory
): Category => {
  const category = getCategoryById(id);

  category.name = name;

  if (description) {
    category.description = description;
  }

  return category;
};

const deleteCategory = (id: string): void => {
  getCategoryById(id);
  removeCategory(id);
};

const resetCategories = (): void => {
  resetCategoriesDb();
};

export {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  resetCategories,
};
