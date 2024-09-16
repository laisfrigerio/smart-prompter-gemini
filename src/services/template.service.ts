import { v4 as uuidv4 } from "uuid";
import { NotFoundException } from "../exceptions/not-found.exception";
import { Template, UpsertTemplate } from "../interfaces/template.interface";
import {
  findAllTemplates,
  findTemplateById,
  saveTemplate,
  removeTemplate,
  resetTemplatesDb,
} from "../repositories/template.repository";

const getAllTemplates = (): Template[] => {
  return findAllTemplates();
};

const createTemplate = ({ title, content }: UpsertTemplate): Template => {
  const newTemplate: Template = {
    id: uuidv4(),
    title,
    content,
  };
  const template = saveTemplate(newTemplate);
  return template;
};

const getTemplateById = (id: string): Template => {
  const template = findTemplateById(id);

  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  return template;
};

const updateTemplate = (
  id: string,
  { title, content }: UpsertTemplate
): Template => {
  const template = findTemplateById(id);

  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  template.title = title;
  template.content = content;
  return template;
};

const deleteTemplate = (id: string): void => {
  const template = findTemplateById(id);

  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  removeTemplate(id);
};

const resetTemplates = (): void => {
  resetTemplatesDb();
};

export {
  getAllTemplates,
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  resetTemplates,
};
