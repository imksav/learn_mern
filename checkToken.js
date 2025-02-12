let checkToken = (req, res, next) => {
  if (req.query.token == "" || req.query.token == undefined) {
    return res.send({
      status: 0,
      msg: "Please fill the token number",
    });
  }
  if (req.query.token != process.env.mytoken) {
    return res.send({
      status: 0,
      msg: "Please fill the correct token number",
    });
  }
  next();
};

module.exports={checkToken}