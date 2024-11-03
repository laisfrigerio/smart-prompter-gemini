import { v4 as uuidv4 } from "uuid";

import {
  resetTemplatesDb,
  findAllTemplates,
  saveTemplate,
  findTemplateById,
  removeTemplate,
} from "../../src/repositories/template.repository";

import { Template } from "../../src/entities/template.entity";

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