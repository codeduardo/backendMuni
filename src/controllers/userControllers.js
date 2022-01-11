const User = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-JWT');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'El usuario con ese correo no existe',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: 'Contraseña incorrecta',
      });
    }
    const token = await generarJWT(user._id);

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor',
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, confirmar } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: 'El usuario con ese correo ya existe',
      });
    }

    if (password !== confirmar) {
      return res.status(400).json({
        msg: 'Las contraseñas no coinciden',
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(200).json({
      msg: 'Usuario creado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor',
    });
  }
};

module.exports = {
  login,
  createUser,
};
