import {
  resetTemplatesDb,
  findAllTemplates,
  saveTemplate,
  findTemplateById,
  removeTemplate,
} from "../../src/repositories/template.repository";

import { Template } from "../../src/entities/template.entity";

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
    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);

    const templates = findAllTemplates();
    expect(templates.length).toBe(1);
    expect(templates[0].getCategories()).toStrictEqual([]);
    expect(templates[0].getTitle()).toBe(template.getTitle());
    expect(templates[0].getContent()).toBe(template.getContent());
    expect(templates[0].getId()).toEqual(expect.any(String));
  });

  test("deve retornar undefined quando o template não existe", () => {
    expect(findTemplateById("1")).toBeUndefined();
  });

  test("deve retornar um template quando existir cadastrado", () => {
    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);

    expect(findTemplateById(template.getId())).toStrictEqual(template);
  });

  test("deve remover um registro cadastrado", () => {
    const template = Template.create("Template 1", "Conteúdo do template 1");
    expect(saveTemplate(template)).toEqual(template);
    expect(findAllTemplates()).toStrictEqual([template]);

    removeTemplate(template.getId());
    
    const templates = findAllTemplates();
    expect(templates.length).toBe(0);
  });

  test("ao tentar remover um template inexistente, deve retornar undefined", () => {
    expect(removeTemplate("1")).toBeUndefined();
  });
});