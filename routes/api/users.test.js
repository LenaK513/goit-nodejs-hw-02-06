// const mongoose = require("mongoose");
// const request = require("supertest");
// require("dotenv").config();

// const app = require("../../app");
// const { User } = require("../../models/user");

// const { DB_HOST, PORT = 3000 } = process.env;

// const login = require("../../controllers/users/login");
// app.post("/api/users/login", login);

// describe("test login route", () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   beforeEach((done) => {
//     mongoose.connect(DB_HOST).then(() => done());
//   });

//   afterEach((done) => {
//     mongoose.connection.db.dropCollection(() => {
//       mongoose.connection.close(() => done());
//     });
//   });
//   test("test login route", async () => {
//     const newUser = {
//       email: "lenochka513513@gmail.com",
//       password: "555555",
//     };

//     const user = await User.create(newUser);

//     const loginUser = {
//       email: "lenochka513513@gmail.com",
//       password: "555555",
//     };

//     const response = await request(app)
//       .post("/api/users/login")
//       .send(loginUser);
//     expect(response.statusCode).toBe(200);
//   });
// });
