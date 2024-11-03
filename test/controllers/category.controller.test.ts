import supertest from "supertest";
import { validate } from "uuid";
import { app } from "../../src/app";

describe("Testando rotas de categories", () => {
  test("deve retornar uma lista vazia quando nenhuma categoria foi cadastrada", async () => {
    const response = await supertest(app).get("/categories");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  test("deve retornar uma lista com uma categoria depois de realizar o cadastrado", async () => {
    const category = {
      name: "Categoria",
    };

    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    const categoryId = responseCreate.body.id;

    expect(responseCreate.status).toEqual(201);
    expect(validate(categoryId)).toBeTruthy();
    expect(responseCreate.body).toEqual({
      ...category,
      id: categoryId,
      description: "",
      templates: []
    });

    const responseGet = await supertest(app).get("/categories");

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual([responseCreate.body]);
  });

  test("deve retornar uma categoria quando existir cadastrado", async () => {
    const category = {
      name: "Categoria",
      description: "Descrição da Categoria",
    };

    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    const categoryId = responseCreate.body.id;

    const responseGet = await supertest(app).get(`/categories/${categoryId}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(responseCreate.body);
  });

  test("deve lançar uma exception de Not Found quando a categoria não existe", async () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    const response = await supertest(app).get(`/categories/${categoryId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Category with id ${categoryId} not found`,
    });
  });

  test("deve remover um registro cadastrado", async () => {
    const category = {
      name: "Categoria",
    };

    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    const categoryId = responseCreate.body.id;

    const responseGet = await supertest(app).get(`/categories/${categoryId}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(responseCreate.body);

    const responseDelete = await supertest(app).delete(
      `/categories/${categoryId}`
    );

    expect(responseDelete.status).toEqual(204);

    const responseGetAfterDelete = await supertest(app).get(
      `/categories/${categoryId}`
    );

    expect(responseGetAfterDelete.status).toEqual(404);
    expect(responseGetAfterDelete.body).toEqual({
      message: `Category with id ${categoryId} not found`,
    });
  });

  test("ao tentar remover uma categoria inexistente, deve retornar um status 404", async () => {
    const categoryId = "44c8e5fd-5b1b-4099-8286-e799c64e4353";

    const response = await supertest(app).delete(`/categories/${categoryId}`);

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      message: `Category with id ${categoryId} not found`,
    });
  });

  test("deve atualizar uma categoria cadastrada", async () => {
    const category = {
      name: "Categoria",
    };

    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    expect(responseCreate.status).toEqual(201);

    const categoryId = responseCreate.body.id;

    const categoryUpdated = {
      name: "Categoria atualizada",
      description: "Descrição da categoria atualizada",
    };

    const responseUpdate = await supertest(app)
      .put(`/categories/${categoryId}`)
      .send(categoryUpdated);

    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      ...categoryUpdated,
      id: categoryId,
      templates: []
    });

    const responseGet = await supertest(app).get(`/categories/${categoryId}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(responseUpdate.body);
  });

  test("deve deixar description como vazio caso o campo não seja informado na atualização", async () => {
    const category = {
      name: "Categoria",
      description: "Descrição da categoria",
    };

    const responseCreate = await supertest(app)
      .post("/categories")
      .send(category);

    expect(responseCreate.status).toEqual(201);

    const categoryId = responseCreate.body.id;

    const categoryUpdated = {
      name: "Categoria atualizada",
    };

    const responseUpdate = await supertest(app)
      .put(`/categories/${categoryId}`)
      .send(categoryUpdated);

    expect(responseUpdate.status).toEqual(200);
    expect(responseUpdate.body).toEqual({
      id: categoryId,
      name: "Categoria atualizada",
      description: "",
      templates: []
    });

    const responseGet = await supertest(app).get(`/categories/${categoryId}`);

    expect(responseGet.status).toEqual(200);
    expect(responseGet.body).toEqual(responseUpdate.body);
  });
});