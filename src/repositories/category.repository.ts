import { Category } from "../entities/category.entity";

let categories: Category[] = [];

const findAllCategories = () => {
  return categories;
};

const saveCategory = (category: Category) => {
  categories.push(category);
  return category;
};

const findCategoryById = (id: string): Category | undefined => {
  return categories.find((category) => category.getId() === id);
};

const removeCategory = (id: string) => {
  categories = categories.filter((category: Category) => category.getId() !== id);
};

const resetCategoriessDb = () => {
  categories = [];
};

export {
  findCategoryById,
  findAllCategories,
  saveCategory,
  removeCategory,
  resetCategoriessDb,
};
