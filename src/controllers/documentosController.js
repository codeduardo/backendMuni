const Documentos = require('../models/Documentos');
const TipoDoc = require('../models/TiposDoc');

const crearDocumento = async (req, res) => {
  const nameTipo = req.body.tipo.toLowerCase();

  try {
    const tipoDoc = await TipoDoc.findOne({ name: nameTipo });
    if (!tipoDoc) {
      return res.status(404).json({
        msg: 'No existe el tipo de documento',
      });
    }
    const data = {
      ...req.body,
      tipo: tipoDoc._id,
    };
    const newDocumento = new Documentos(data);
    await newDocumento.save();
    res.status(201).json({
      msg: 'Documento creado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el documento',
    });
  }
};

const getDocumentos = async (req, res) => {
  try {
    const documentos = await Documentos.find().populate('tipo', 'name');
    res.json({
      documentos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los documentos',
    });
  }
};

const eliminarDocumento = async (req, res) => {
  const { id } = req.params;
  try {
    await Documentos.findByIdAndDelete(id);
    res.json({ status: 'documento eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los documentos',
    });
  }
};

module.exports = {
  crearDocumento,
  getDocumentos,
  eliminarDocumento,
};
