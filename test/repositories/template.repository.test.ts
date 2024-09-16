import {
  resetTemplatesDb,
  findAllTemplates,
  saveTemplate,
  findTemplateById,
  removeTemplate,
} from "../../src/repositories/template.repository";
import { Template } from "../../src/interfaces/template.interface";

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
    const template = {
      id: "1",
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    expect(saveTemplate(template)).toEqual(template);
    expect(findAllTemplates()).toStrictEqual([template]);
  });

  test("deve retornar undefined quando o template não existe", () => {
    expect(findTemplateById("1")).toBeUndefined();
  });

  test("deve retornar um template quando existir cadastrado", () => {
    const template = {
      id: "1",
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    saveTemplate(template);
    expect(findTemplateById("1")).toStrictEqual(template);
  });

  test("deve remover um registro cadastrado", () => {
    const template = {
      id: "1",
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    saveTemplate(template);
    expect(findAllTemplates()).toStrictEqual([template]);

    removeTemplate("1");
    expect(findAllTemplates()).toStrictEqual([]);
  });

  test("ao tentar remover um template inexistente, deve retornar undefined", () => {
    expect(removeTemplate("1")).toBeUndefined();
  });
});
