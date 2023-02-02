// const login = require("../controllers/index");

// const { Unauthorized } = require("http-errors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { joiUserSchema } = require("../../models/user");
// const request = require("supertest");
// const app = require("../app");
// const { User } = require("../models");

// const { SECRET_KEY } = process.env;

// test("Login test", () => {
//   it("have to return user and token properties to req object", async () => {
//     const response = await (await request(app).post("/api/users/login"))
//       .send(User)
//       .expect(200);
//     const user = await User.findById(response.body.user._id);
//     expect(user).not.toBeNull();
//     expect(user.tokens.length).toBe(2);
//     expect(response.body.token).toBe(user.token[1].token);

//     expect(response.body).toMatchObject({
//       user: {
//         email: User.email,
//         subscription: User.subscription,
//       },
//       token: user.tokens[1].token,
//     });
//   });
// });
