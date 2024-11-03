import { v4 as uuidv4 } from "uuid";

import {
  resetTemplatesDb,
  findAllTemplates,
  saveTemplate,
  findTemplateById,
  removeTemplate,
  attachCategoryToTemplate,
  detachCategoryFromTemplate,
} from "../../src/repositories/template.repository";

import { saveCategory } from "../../src/repositories/category.repository";

import { Template } from "../../src/entities/template.entity";
import { Category } from "../../src/entities/category.entity";
import { getTemplateById } from "../../src/services/template.service";
import { getCategoryById } from "../../src/services/category.service";

jest.mock("uuid");

describe("CRUD Repository de Templates", () => {
  beforeEach(() => {
    resetTemplatesDb();
  });

  test("deve retornar uma lista vazia quando nenhum template foi cadastrado", () => {
    const valorEsperado: Template[] = [];
    const valorRetornado: Template[] = findAllTemplates();
    expect(valorEsperado).toEqual(valorRetornado);
  });

  test("deve retornar uma lista com um template depois de realizar o cadastrado", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateId);
    
    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);

    const templates = findAllTemplates();
    expect(templates.length).toBe(1);
    expect(templates[0].getCategories()).toStrictEqual([]);
    expect(templates[0].getTitle()).toBe("Template 1");
    expect(templates[0].getContent()).toBe("Conteúdo do template 1");
    expect(templates[0].getId()).toEqual(templateId);
  });

  test("deve retornar undefined quando o template não existe", () => {
    expect(findTemplateById("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
  });

  test("deve retornar um template quando existir cadastrado", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateId);

    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);

    expect(findTemplateById(templateId)).toStrictEqual(template);
  });

  test("deve remover um registro cadastrado", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateId);

    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);
    expect(findAllTemplates()).toStrictEqual([template]);

    removeTemplate(templateId);
    
    const templates = findAllTemplates();
    expect(templates.length).toBe(0);
  });

  test("ao tentar remover um template inexistente, deve retornar undefined", () => {
    expect(removeTemplate("44c8e5fd-5b1b-4099-8286-e799c64e4353")).toBeUndefined();
  });
});

describe("Attach categories ao template", () => {
  test("deve adicionar uma categoria à um template", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateId);
    
    const template = Template.create("Template 1", "Conteúdo do template 1");
    saveTemplate(template);

    const categoryId = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
    (uuidv4 as jest.Mock).mockReturnValue(categoryId);
    
    const category = Category.create("Categoria 1", "com desc");
    saveCategory(category)

    attachCategoryToTemplate(template, category);

    const templateUpdated = getTemplateById(templateId);

    expect(templateUpdated.getCategories().length).toBe(1);
    expect(templateUpdated.getCategories()).toStrictEqual([category]);

    const categoryUpdated = getCategoryById(categoryId);
    expect(categoryUpdated.getTemplates().length).toBe(1);
    expect(categoryUpdated.getTemplates()).toStrictEqual([template]);
  });
});

describe("Detach categories de um template", () => {
  test("deve remover uma categoria de um template", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateId);
    
    const template = Template.create("Template 1", "Conteúdo do template 1");
    saveTemplate(template);

    const categoryIdOne = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdOne);
    
    const categoryOne = Category.create("Categoria 1", "com desc");
    saveCategory(categoryOne);

    const categoryIdTwo = "22c8e5fd-5b1b-4099-8286-e799c64e4352";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdTwo);
    
    const categoryTwo = Category.create("Categoria 2", "com desc doiss");
    saveCategory(categoryTwo);

    const categoryIdThree = "33c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(categoryIdThree);
    
    const categoryThree = Category.create("Categoria 3", "com desc doiss");
    saveCategory(categoryThree);

    // Attach First category
    let templatedCreated = getTemplateById(templateId);
    attachCategoryToTemplate(templatedCreated, categoryOne);

    const templateWithCategoryAttached = getTemplateById(templateId);

    expect(templateWithCategoryAttached.getCategories().length).toBe(1);
    expect(templateWithCategoryAttached.getCategories()[0].getId()).toBe(categoryOne.getId());

    const categoryOneUpdated = getCategoryById(categoryIdOne);
    expect(categoryOneUpdated.getTemplates().length).toBe(1);
    expect(categoryOneUpdated.getTemplates()[0].getId()).toBe(template.getId());

    // Attach Second category
    templatedCreated = getTemplateById(templateId);
    attachCategoryToTemplate(templatedCreated, categoryTwo);

    let templateWithCategoriesAttached = getTemplateById(templateId);
    expect(templateWithCategoriesAttached.getCategories().length).toBe(2);
    expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
    expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryTwo.getId());

    const categoryTwoUpdated = getCategoryById(categoryIdTwo);
    expect(categoryTwoUpdated.getTemplates().length).toBe(1);
    expect(categoryTwoUpdated.getTemplates()[0].getId()).toStrictEqual(template.getId());

    // Attach Third category
    templatedCreated = getTemplateById(templateId);
    attachCategoryToTemplate(templatedCreated, categoryThree);

    templateWithCategoriesAttached = getTemplateById(templateId);
    expect(templateWithCategoriesAttached.getCategories().length).toBe(3);
    expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
    expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryTwo.getId());
    expect(templateWithCategoriesAttached.getCategories()[2].getId()).toBe(categoryThree.getId());

    const categoryThreeUpdated = getCategoryById(categoryIdThree);
    expect(categoryThreeUpdated.getTemplates().length).toBe(1);
    expect(categoryThreeUpdated.getTemplates()[0].getId()).toStrictEqual(template.getId());

    // Detach second category
    templatedCreated = getTemplateById(templateId);
    detachCategoryFromTemplate(templatedCreated, categoryTwo);

    templateWithCategoriesAttached = getTemplateById(templateId);
    expect(templateWithCategoriesAttached.getCategories().length).toBe(2);
    expect(templateWithCategoriesAttached.getCategories()[0].getId()).toBe(categoryOne.getId());
    expect(templateWithCategoriesAttached.getCategories()[1].getId()).toBe(categoryThree.getId());
  });
});