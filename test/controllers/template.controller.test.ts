import supertest from "supertest";
import { validate } from "uuid";
import { app } from "../../src/app";

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