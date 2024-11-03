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

const resetTemplatesDb = () => {
  templates = [];
};

export {
  findTemplateById,
  findAllTemplates,
  saveTemplate,
  removeTemplate,
  resetTemplatesDb,
};
