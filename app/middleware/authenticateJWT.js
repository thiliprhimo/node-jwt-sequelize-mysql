const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(400).send({ message: "Token not found!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Unauthorized" });
    }

    req.userId = decoded.id;

    next();
  });
};

isDeveloper = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "developer") {
          next();
          return;
        }
      }

      return res.status(403).send({ message: "Developer role required!" });
    });
  });
};

isTester = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "tester") {
          next();
          return;
        }
      }

      return res.status(403).send({ message: "Tester role required!" });
    });
  });
};

isDeveloperOrTester = (req, res, next) => {
  const combinedRoles = ["developer", "tester"];
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (combinedRoles.includes(roles[i].name)) {
          next();
          return;
        }
      }

      return res
        .status(403)
        .send({ message: "Developer or tester role required!" });
    });
  });
};

const authenticateJWT = {
  verifyToken: verifyToken,
  isDeveloper: isDeveloper,
  isTester: isTester,
  isDeveloperOrTester: isDeveloperOrTester,
};

module.exports = authenticateJWT;
