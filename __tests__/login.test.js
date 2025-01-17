const { object } = require("joi");
const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();

const { basedir } = global;

const app = require("../app");
const { User } = require(`${basedir}/models/user`);

const { DB_TEST_HOST, PORT } = process.env;
const loginController = require("../controllers/auth/login");

describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "exampleA@example.com",
      password: "examplepassword",
    };

    const user = await User.create(newUser);

    const loginUser = {
      email: "exampleA@example.com",
      password: "examplepassword",
    };

    const response = await request(app).post("/api/auth/login").send(loginUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(body.user).toBe(object);
    const { email, subscription } = user;
    expect(email).toBe("string");
    expect(subscription).toBe("string");
  });
});
