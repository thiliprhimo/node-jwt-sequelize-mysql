const controller = require("../controllers/user.controller");

const { authenticateJWT } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.post("/api/test/all", controller.commonBoard);

  app.post("/api/test/developer", controller.developerBoard);

  app.post("/api/test/designer", controller.designerBoard);

  app.post("/api/test/tester", controller.testerBoard);
};
