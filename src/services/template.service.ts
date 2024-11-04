import { v4 as uuidv4 } from "uuid";

import { Template } from "../entities/template.entity";
import { NotFoundException } from "../exceptions/not-found.exception";

import { UpsertTemplate } from "../types/template.type";

import {
  findAllTemplates,
  findTemplateById,
  saveTemplate,
  removeTemplate,
  resetTemplatesDb,
  attachCategoryToTemplate,
  detachCategoryFromTemplate,
} from "../repositories/template.repository";
import { findCategoryById } from "../repositories/category.repository";

const getAllTemplates = (): Template[] => {
  return findAllTemplates();
};

const createTemplate = ({ title, content }: UpsertTemplate): Template => {
  const newTemplate: Template = Template.create(title, content);;
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
  const template = getTemplateById(id);

  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  template.setTitle(title);
  template.setContent(content);

  return template;
};

const deleteTemplate = (id: string): void => {
  const template = getTemplateById(id);

  if (!template) {
    throw new NotFoundException(`Template with id ${id} not found`);
  }

  removeTemplate(id);
};

const attachCategory = (templateId: string, categoryId: string): Template => {
  const template = findTemplateById(templateId);
  const category = findCategoryById(categoryId);

  if (!template) throw new NotFoundException(`Template with id ${templateId} not found`);
  if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);

  return attachCategoryToTemplate(template, category);
};


const detachCategory = (templateId: string, categoryId: string): Template => {
  const template = findTemplateById(templateId);
  const category = findCategoryById(categoryId);

  if (!template) throw new NotFoundException(`Template with id ${templateId} not found`);
  if (!category) throw new NotFoundException(`Category with id ${categoryId} not found`);

  return detachCategoryFromTemplate(template, category);
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
  attachCategory,
  detachCategory,
  resetTemplates,
};