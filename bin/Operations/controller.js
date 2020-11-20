let Operations = {};

Operations = (req, res, next) => {
  req.body.passcode == "operations"
    ? res.status(200).send("Hello welcome to operations route")
    : res.status(500).send("Some error occured " + req.body);
};

module.exports = Operations;
