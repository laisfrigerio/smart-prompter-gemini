import { Template } from "../interfaces/template.interface";

let templates: Template[] = [];

const findAllTemplates = () => {
  return templates;
};

const saveTemplate = (template: Template) => {
  templates.push(template);
  return template;
};

const findTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

const removeTemplate = (id: string) => {
  templates = templates.filter((template: Template) => template.id !== id);
};

const resetTemplatesDb = () => {
  templates = [];
};

export {
  findAllTemplates,
  findTemplateById,
  saveTemplate,
  removeTemplate,
  resetTemplatesDb,
};
