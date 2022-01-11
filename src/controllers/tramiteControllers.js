const Tramite = require('../models/Tramites');
const Usuario = require('../models/Usuario');

const tipoDocAccept = ['dni', 'ext'];
const createTramite = async (req, res) => {
  const { tipoDoc } = req.body;

  try {
    if (!tipoDocAccept.includes(tipoDoc)) {
      return res.status(400).json({
        msg: 'Tipo de documento no aceptado',
      });
    }
    const newTramite = new Tramite(req.body);
    await newTramite.save();
    res.status(200).json({ msg: 'Tramite creado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

const getTramites = async (req, res) => {
  const { _id } = req.usuario;
  try {
    const usuario = await Usuario.findById(_id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no autorizado' });
    }
    const tramites = await Tramite.find();
    res.status(200).json({ tramites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};

module.exports = {
  createTramite,
  getTramites,
};
