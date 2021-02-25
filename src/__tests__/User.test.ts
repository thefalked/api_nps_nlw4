import request from 'supertest';

import { app } from '../app';

import createConnection from "../database/index";

let connection = null;

describe("User", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async (done) => {
    await connection.dropDatabase();
    await connection.close();
    done();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "testes",
      email: "testes@teste.com",
    })

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new user with an existing email", async () => {
    const response = await request(app).post("/users").send({
      name: "testes",
      email: "testes@teste.com",
    })

    expect(response.status).toBe(400);
  });
});
