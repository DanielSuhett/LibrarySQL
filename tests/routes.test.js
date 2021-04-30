const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const db = require("../database");
require("mysql2/node_modules/iconv-lite").encodingExists("cesu8");

describe("Testing routes", () => {
  it("should create a new product", async () => {
    const res = await request
      .post("/")
      .send({
        bar_code: "HAS2020",
        name: "Lapis",
        description: null,
        quantity: 10,
        category: "Estudo"
      })
      .expect(201);

    expect(res.body).toHaveProperty("success", true);

    afterAll(() => {
      db.close();
      app.close();
    });
  });

  it("should update a product", async () => {
    const res = await request
      .put("/1")
      .send({
        bar_code: "HAS2020",
        name: "Lapis",
        description: "Add some description",
        quantity: 10,
        category: "Estudos"
      })
      .expect(200);

    expect(res.body).toHaveProperty("success", true);

    afterAll(() => {
      db.close();
      app.close();
    });
  });

  it("should obtain a list of all products", async () => {
    const res = await request.get("/products").expect(200);

    expect(res.body).not.toHaveLength(0);

    afterAll(() => {
      db.close();
      app.close();
    });
  });

  it("should obtain a product", async () => {
    const res = await request.get("/product/1").expect(200);

    expect(res.body).toHaveProperty("name", "Lapis");

    afterAll(() => {
      db.close();
      app.close();
    });
  });

  it("should obtain products by category", async () => {
    const res = await request.get("/category?category=Estudos").expect(200);

    expect(res.body).not.toHaveLength(0);
    expect(res.body[0]).toHaveProperty("category", "Estudos");

    afterAll(() => {
      db.close();
      app.close();
    });
  });

  it("should delete product", async () => {
    const res = await request.delete("/1").expect(200);

    expect(res.body).toHaveProperty("success", true);

    await request.get("/1").expect(404);

    afterAll(() => {
      db.close();
      app.close();
    });
  });
});
