const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);

    //leer al usuario que corresponde al uid
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Token no válido - usuario no existe en BD',
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

module.exports = {
  validarJWT,
};
