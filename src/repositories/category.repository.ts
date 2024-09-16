import { Category } from "../interfaces/category.interface";

let categories: Category[] = [];

const findAllCategories = () => {
  return categories;
};

const saveCategory = (category: Category) => {
  categories.push(category);
  return category;
};

const findCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.id === id);
};

const removeCategory = (id: string) => {
  categories = categories.filter((category: Category) => category.id !== id);
};

const resetCategoriesDb = () => {
  categories = [];
};

export {
  findAllCategories,
  findCategoryById,
  saveCategory,
  removeCategory,
  resetCategoriesDb,
};
