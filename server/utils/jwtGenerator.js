const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(userid) {
  const payload = {
    user: {
      id: userid
    }
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '3h' });
}

module.exports = jwtGenerator;
