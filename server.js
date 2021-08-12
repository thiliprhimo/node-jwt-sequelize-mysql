const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const corsOption = {
  origin: "http://localhost/8081",
};

app.use(cors(corsOption));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });
// const Role = db.role;

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

app.get("/", (req, res) => {
  res.json("Thanks for visiting Rhimo's (JWT) application");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port : " + PORT);
});
