const TipoDoc = require('../models/TiposDoc');

const createTiposDoc = async (req, res) => {
  const { name, description } = req.body;
  const nameLower = name.toLowerCase();
  try {
    const tipoDoc = await TipoDoc.findOne({ name: nameLower });
    if (tipoDoc) {
      return res.status(400).json({
        msg: 'El tipo de documento con ese nombre ya existe',
      });
    }
    const newTipoDoc = new TipoDoc({
      name: nameLower,
      description,
    });
    await newTipoDoc.save();
    return res.status(201).json({
      msg: 'Tipo de documento creado correctamente',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error al crear el tipo de documento',
    });
  }
};

const getTiposDocs = async (req, res) => {
  try {
    const tiposDoc = await TipoDoc.find();
    return res.status(200).json({ tipos: tiposDoc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error al obtener los tipos de documentos',
    });
  }
};

const deleteTiposDocs = async (req, res) => {
  const { id } = req.params;
  try {
    await TipoDoc.findByIdAndDelete(id);
    res.json({
      msg: 'Tipo de documento eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};
module.exports = {
  createTiposDoc,
  getTiposDocs,
  deleteTiposDocs,
};
