const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const User = require('../models/Usuario');
const Evento = require('../models/Eventos');
const Turismo = require('../models/Turismo');
const Colaborador = require('../models/Colaboradores');

const actualizarImagenCloudinary = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'user':
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el usuario' });
      }
      break;
    case 'eventos':
      modelo = await Evento.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el evento' });
      }
      break;
    case 'turismo':
      modelo = await Turismo.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el turismo' });
      }
      break;
    case 'colaborador':
      modelo = await Colaborador.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el colaborador' });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }
  if (Object.keys(req.files.archivo).includes('name')) {
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img.push(secure_url);
  } else {
    const tempFilePath = req.files.archivo.map((a) => a.tempFilePath);
    const url = tempFilePath.map((a) => {
      return cloudinary.uploader.upload(a).then((result) => result.secure_url);
    });
    const urls = await Promise.all(url);
    modelo.img = modelo.img.concat(urls);
  }
  await modelo.save();
  return res.status(200).json({ msg: 'Imagen(es) actualizada(s)' });
};

const deleteImagenCloudinary = async (req, res) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'user':
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el usuario' });
      }
      break;
    case 'eventos':
      modelo = await Evento.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el producto' });
      }
      break;
    case 'turismo':
      modelo = await Turismo.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el producto' });
      }
      break;
    case 'colaborador':
      modelo = await Colaborador.findById(id);
      if (!modelo) {
        return res.status(404).json({ msg: 'No existe el producto' });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Se me olvidó validar esto' });
  }

  const { img } = modelo;
  const nombreArchivos = img.map((i) => i.split('/'));
  const nombres = nombreArchivos.map((n) => n[n.length - 1]);
  const public_ids = nombres.map((n) => n.split('.')[0]);
  public_ids.forEach((public_id) => {
    cloudinary.uploader.destroy(public_id);
  });
  modelo.img = [];
  await modelo.save();
  return res.status(200).json({ msg: 'Imagen(es) eliminada(s)' });
};
module.exports = {
  actualizarImagenCloudinary,
  deleteImagenCloudinary,
};
