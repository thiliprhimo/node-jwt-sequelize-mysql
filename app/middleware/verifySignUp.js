const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

checkUserOrEmailExisting = (req, res, next) => {
  User.findOne({
    where: { username: req.body.username },
  }).then((user) => {
    if (user) {
      res.status(403).send({ message: "Username already exists!" });
      return;
    }

    User.findOne({
      where: { email: req.body.email },
    }).then((user) => {
      if (user) {
        return res.status(403).send({ message: "Email already exists!" });
      }

      next();
    });
  });
};

checkRoleExisting = (req, res, next) => {
  if (req.body.roles) {
    for (singleRole of req.body.roles) {
      if (!ROLES.includes(singleRole)) {
        return res
          .status(400)
          .send({ message: "Sorry, role : " + singleRole + " doesn't exist!" });
      }
    }

    // for (let i = 0; i < req.body.roles.length; i++) {
    //   if (!ROLES.includes(req.body.roles[i])) {
    //     res.status(400).send({
    //       message: "Failed! Role does not exist = " + req.body.roles[i],
    //     });
    //     return;
    //   }
    // }
  }

  next();
};

const verifySignUp = {
  checkUserOrEmailExisting: checkUserOrEmailExisting,
  checkRoleExisting: checkRoleExisting,
};

module.exports = verifySignUp;
