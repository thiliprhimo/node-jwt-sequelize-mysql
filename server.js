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

app.get("/", (req, res) => {
  res.json("Thanks for visiting Rhimo's (JWT) application");
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is running on port : " + PORT);
});
