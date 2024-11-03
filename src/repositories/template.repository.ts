import { Category } from "../entities/category.entity";
import { Template } from "../entities/template.entity";

let templates: Template[] = [];

const findAllTemplates = () => {
  return templates;
};

const saveTemplate = (template: Template) => {
  templates.push(template);
  return template;
};

const findTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.getId() === id);
};

const removeTemplate = (id: string) => {
  templates = templates.filter((template: Template) => template.getId() !== id);
};

const attachCategoryToTemplate = (template: Template, category: Category): Template => {
  template.addCategory(category);
  return template;
};

const detachCategoryFromTemplate = (template: Template, category: Category): Template => {
  const categories = template.getCategories().filter(cat => cat.getId() !== category.getId());
  template.setCategories(categories);
  return template;
};

const resetTemplatesDb = () => {
  templates = [];
};

export {
  findTemplateById,
  findAllTemplates,
  saveTemplate,
  removeTemplate,
  attachCategoryToTemplate,
  detachCategoryFromTemplate,
  resetTemplatesDb,
};
