import request from 'supertest';

import { app } from '../app';

import createConnection from "../database/index";

let connection = null;

describe("Survey", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async (done) => {
    await connection.dropDatabase();
    await connection.close();
    done();
  });

  it("Should be able to create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "Title example",
      description: "description example",
    })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title example2",
      description: "description example2",
    })

    const response = await request(app).get("/surveys");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
