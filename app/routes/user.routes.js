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

  app.get("/api/test/all", controller.commonBoard);

  app.get(
    "/api/test/designer",
    [authenticateJWT.verifyToken],
    controller.designerBoard
  );

  app.get(
    "/api/test/developer",
    [authenticateJWT.verifyToken, authenticateJWT.isDeveloper],
    controller.developerBoard
  );

  app.get(
    "/api/test/tester",
    [authenticateJWT.verifyToken, authenticateJWT.isTester],
    controller.testerBoard
  );
};
