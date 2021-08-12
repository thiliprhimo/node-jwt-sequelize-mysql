exports.commonBoard = (req, res) => {
  res.status(200).send({
    message: "Everyone can access this system",
  });
};

exports.developerBoard = (req, res) => {
  res.status(200).send({
    message: "Developer alone can access this system!",
  });
};

exports.designerBoard = (req, res) => {
  res.status(200).send({
    message: "Designer can access this system!",
  });
};

exports.testerBoard = (req, res) => {
  res.status(200).send({
    message: "Tester alone an access this system!",
  });
};
