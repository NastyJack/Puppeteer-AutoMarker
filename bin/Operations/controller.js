let Operations = {};

Operations = (req, res, next) => {
  req.body.passcode == "operations"
    ? res.send("Hello welcome to operations route")
    : res.status(500).send("Some error occured");
};

module.exports = Operations;
