const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config.js");

const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.sequelize.Op;

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({ where: { name: { [Op.or]: req.body.roles } } }).then(
          (roles) => {
            user.setRoles(roles).then(() => {
              res
                .status(200)
                .send({ message: "User registered successfully!" });
            });
          }
        );
      } else {
        //   [1] => "developer Role"
        user.setRoles([1]).then(() => {
          res.status(200).send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Unable to register the new user!" });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: { username: req.body.username },
  })
    .then((user) => {
      if (!user) {
        return req.status(404).send({ message: "User not found!" });
      }

      var isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Password is invalid!" });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400,
      });

      var authorities = [];

      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        roles: authorities,
      });
    })
    .catch((err) => {
      res.status(403).send({ message: "Check your login credentials!" });
    });
};
