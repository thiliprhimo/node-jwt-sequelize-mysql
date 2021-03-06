const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller.js");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkUserOrEmailExisting, verifySignUp.checkRoleExisting],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
