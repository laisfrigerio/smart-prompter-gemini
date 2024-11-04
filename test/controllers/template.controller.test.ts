import supertest from "supertest";
import { validate } from "uuid";
import { app } from "../../src/app";
import { Category } from "../../src/entities/category.entity";

describe("Testando rotas de template", () => {
  test("deve retornar uma lista vazia quando nenhum template foi cadastrado", async () => {
    const response = await supertest(app).get("/templates");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test("deve retornar uma lista com um template depois de realizar o cadastrado", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreate = await supertest(app)
      .post("/templates")
      .send(template);

    const templateId = responseCreate.body.id;

    expect(responseCreate.status).toEqual(201);
    expect(validate(templateId)).toBeTruthy();
    expect(responseCreate.body).toEqual({
      ...template,
      id: templateId,
      categories: []
    });

    const responseGet = await supertest(app).get("/templates");

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual([responseCreate.body]);
  });

  test("deve retornar um template quando existir cadastrado", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreate = await supertest(app)
      .post("/templates")
      .send(template);

    const templateId = responseCreate.body.id;

    const responseGet = await supertest(app).get(`/templates/${templateId}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(responseCreate.body);
  });

  test("deve lançar uma exception de Not Found quando o template não existe", async () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    const response = await supertest(app).get(`/templates/${templateId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Template with id ${templateId} not found`,
    });
  });

  test("deve remover um registro cadastrado", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreate = await supertest(app)
      .post("/templates")
      .send(template);

    expect(responseCreate.status).toEqual(201);

    const templateId = responseCreate.body.id;

    const responseDelete = await supertest(app).delete(
      `/templates/${templateId}`
    );

    expect(responseDelete.status).toEqual(204);

    const responseGetAfterDelete = await supertest(app).get(
      `/templates/${templateId}`
    );

    expect(responseGetAfterDelete.status).toEqual(404);
    expect(responseGetAfterDelete.body).toEqual({
      message: `Template with id ${templateId} not found`,
    });
  });

  test("ao tentar remover um template inexistente, deve retornar um erro", async () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    const response = await supertest(app).delete(`/templates/${templateId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Template with id ${templateId} not found`,
    });
  });

  test("deve atualizar um template existente", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreate = await supertest(app)
      .post("/templates")
      .send(template);

    expect(responseCreate.status).toEqual(201);

    const templateId = responseCreate.body.id;

    const templateUpdated = {
      title: "Template 2",
      content: "Conteúdo do template 2",
    };

    const responseUpdate = await supertest(app)
      .put(`/templates/${templateId}`)
      .send(templateUpdated);

    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      ...templateUpdated,
      id: templateId,
      categories: []
    });
  });

  test("ao tentar atualizar um template inexistente, deve retornar um erro", async () => {
    const templateId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    const response = await supertest(app)
      .put(`/templates/${templateId}`)
      .send({ title: "Template 1", content: "Conteúdo do template 1" });

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Template with id ${templateId} not found`,
    });
  });
});

describe("Associando categorias a um template", () => {
  test.only("deve associar uma categoria a um template", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreateTemplate = await supertest(app)
      .post("/templates")
      .send(template);

    expect(responseCreateTemplate.status).toEqual(201);

    const category = {
      name: "Category 1",
    };

    const responseCreateCategory = await supertest(app).post("/categories").send(category);

    expect(responseCreateCategory.status).toEqual(201);

    const templateId = responseCreateTemplate.body.id;
    const categoryId = responseCreateCategory.body.id;

    const responseAttachCategories = await supertest(app)
      .post(`/templates/${templateId}/categories/${categoryId}`);

    expect(responseAttachCategories.status).toEqual(200);
    expect(responseAttachCategories.body).toStrictEqual({
      ...template,
      id: templateId,
      categories: [{
        id: responseCreateCategory.body.id,
        name: responseCreateCategory.body.name,
        description: responseCreateCategory.body.description
      }],
    });

    const responseGetTemplatesByCategory = await supertest(app)
      .get(`/categories/${categoryId}/templates`);

      expect(responseGetTemplatesByCategory.status).toEqual(200);
      expect(responseGetTemplatesByCategory.body.length).toBe(1);
      expect(responseGetTemplatesByCategory.body).toStrictEqual([{
        ...template,
        id: templateId,
        categories: [{
          id: responseCreateCategory.body.id,
          name: responseCreateCategory.body.name,
          description: responseCreateCategory.body.description
        }]
      }]);
  });

  test("ao tentar associar categoria a um template inexistente, deve retornar um erro", async () => {
    const templateId = "11c8e5fd-5b1b-4099-8286-e799c64e4351";
    const categoryId = "22c8e5fd-5b1b-4099-8286-e799c64e4352";

    const response = await supertest(app)
      .post(`/templates/${templateId}/categories/${categoryId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Template with id ${templateId} not found`,
    });
  });

  test("ao tentar associar uma categoria inexistente a um template, deve retornar um erro", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreateTemplate = await supertest(app)
      .post("/templates")
      .send(template);

    const templateId = responseCreateTemplate.body.id;
    const categoryId = "22c8e5fd-5b1b-4099-8286-e799c64e4352";

    const response = await supertest(app)
      .post(`/templates/${templateId}/categories/${categoryId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Category with id ${categoryId} not found`,
    });
  });
});

describe("Desassociando categorias de um template", () => {
  test("deve retornar um erro quando um template não existe", async () => {
    const categoryOne = {
      name: "Category 1",
    };

    const responseCreateCategoryOne = await supertest(app)
      .post("/categories")
      .send(categoryOne);
    expect(responseCreateCategoryOne.status).toEqual(201);

    const templateId = "608eff7e-8498-4a45-8455-4523ce1c13e5";
    const categoryId = "108eff7e-8498-4a45-8455-4523ce1c13e1";
    const response = await supertest(app)
      .delete(`/templates/${templateId}/categories/${categoryId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Template with id 608eff7e-8498-4a45-8455-4523ce1c13e5 not found`,
    });
  });

  test("deve retornar um erro quando uma categoria não existe", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreateTemplate = await supertest(app)
      .post("/templates")
      .send(template);

    expect(responseCreateTemplate.status).toEqual(201);

    const categoryOne = {
      name: "Tag 1",
    };

    const responseCreateCategoryOne = await supertest(app)
      .post("/categories")
      .send(categoryOne);
    expect(responseCreateCategoryOne.status).toEqual(201);

    const responseAttachCategory = await supertest(app)
      .post(`/templates/${responseCreateTemplate.body.id}/categories/${responseCreateCategoryOne.body.id}`);
    expect(responseAttachCategory.status).toEqual(200);

    const templateId = responseCreateTemplate.body.id;
    const categoryNotExistsId = "608eff7e-8498-4a45-8455-4523ce1c13e5";

    const response = await supertest(app)
      .delete(`/templates/${templateId}/categories/${categoryNotExistsId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Category with id 608eff7e-8498-4a45-8455-4523ce1c13e5 not found`,
    });
  });

  test("deve desassociar uma categoria existente de um template", async () => {
    const template = {
      title: "Template 1",
      content: "Conteúdo do template 1",
    };

    const responseCreateTemplate = await supertest(app)
      .post("/templates")
      .send(template);

    expect(responseCreateTemplate.status).toEqual(201);

    const categoryOne = {
      name: "Category One",
    };

    const responseCreateCategoryOne = await supertest(app)
      .post("/categories")
      .send(categoryOne);
    expect(responseCreateCategoryOne.status).toEqual(201);

    const categoryId = responseCreateCategoryOne.body.id;

    const responseAttachTag = await supertest(app)
      .post(`/templates/${responseCreateTemplate.body.id}/categories/${categoryId}`);
    expect(responseAttachTag.status).toEqual(200);

    const templateId = responseCreateTemplate.body.id;

    const response = await supertest(app)
      .delete(`/templates/${templateId}/categories/${categoryId}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      ...template,
      id: templateId,
      categories: [],
    });
  });
});
