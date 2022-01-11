const jwt = require('jsonwebtoken');

const generarJWT = async (id) => {
  const payload = {
    userId: id,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};

module.exports = {
  generarJWT,
};
