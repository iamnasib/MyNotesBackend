const jwt = require("jsonwebtoken");

const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Fetch User Internal server error", err: error });
  }
};

module.exports = fetchuser;
