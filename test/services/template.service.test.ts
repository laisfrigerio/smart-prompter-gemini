import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  resetTemplates,
} from "../../src/services/template.service";
import { Template } from "../../src/entities/template.entity";

import { v4 as uuidv4 } from "uuid";

jest.mock("uuid");

describe("CRUD Service de Templates", () => {
  beforeEach(() => {
    resetTemplates();
  });

  test("deve retornar uma lista vazia quando nenhum template foi cadastrado", () => {
    const valorEsperado: Template[] = [];
    const valorRetornado: Template[] = getAllTemplates();

    expect(valorEsperado).toEqual(valorRetornado);
  });

  test("deve retornar uma lista com um template depois de realizar o cadastrado", () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const templateIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateIdMock);

    const newTemplate = createTemplate(template);
    const fullTemplate = new Template(templateIdMock, template.title, template.content);

    expect(newTemplate).toEqual(fullTemplate);
    expect(getAllTemplates()).toStrictEqual([fullTemplate]);
  });

  test("deve lançar uma exception de Not Found quando o template não existe", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => getTemplateById(templateId)).toThrow(
      `Template with id ${templateId} not found`
    );
  });

  test("deve retornar um template quando existir cadastrado", () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const templateIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateIdMock);

    createTemplate(template);

    const fullTemplate = new Template(templateIdMock, template.title, template.content);

    expect(getTemplateById(templateIdMock)).toStrictEqual(fullTemplate);
  });

  test("deve remover um registro cadastrado", () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const templateIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateIdMock);

    createTemplate(template);

    const fullTemplate = new Template(templateIdMock, template.title, template.content);

    expect(getAllTemplates()).toStrictEqual([fullTemplate]);

    deleteTemplate(templateIdMock);
    expect(getAllTemplates()).toStrictEqual([]);
  });

  test("ao tentar remover um template inexistente, deve retornar uma exception de Not Found", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() => deleteTemplate(templateId)).toThrow(
      `Template with id ${templateId} not found`
    );
  });

  test("ao tentar editar um template inexistente, deve retornar uma exception de Not Found", () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    expect(() =>
      updateTemplate(templateId, { title: "Titulo", content: "Conteúdo" })
    ).toThrow(`Template with id ${templateId} not found`);
  });

  test("deve atualizar um registro", () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const templateIdMock = "44c8e5fd-5b1b-4099-8286-e799c64e4353";
    (uuidv4 as jest.Mock).mockReturnValue(templateIdMock);

    createTemplate(template);

    const fullTemplate = new Template(templateIdMock, template.title, template.content);

    expect(getAllTemplates()).toStrictEqual([fullTemplate]);

    const editTemplate = { title: "Titulo", content: "Conteúdo" };

    updateTemplate(templateIdMock, editTemplate);
    expect(getAllTemplates()).toStrictEqual([
      new Template(templateIdMock, editTemplate.title, editTemplate.content)
    ]);
  });
});
