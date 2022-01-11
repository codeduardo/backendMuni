const Turismo = require('../models/Turismo');

const getTurismos = async (req, res) => {
  try {
    const sitiosTuristicos = await Turismo.find();
    res.status(200).json({ sitiosTuristicos });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los sitios turisticos' });
  }
};

const getTurismo = async (req, res) => {
  const { id } = req.params;
  try {
    const sitioTuristico = await Turismo.findById(id);
    res.status(200).json({ sitioTuristico });
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el sitio turistico' });
  }
};

const createTurismo = async (req, res) => {
  const { name, ...values } = req.body;
  const newName = name.toLowerCase();
  try {
    const turismo = await Turismo.findOne({ name: newName });

    if (turismo) {
      return res.status(400).json({ msg: 'El sitio turistico ya existe' });
    }

    const data = {
      name: newName,
      ...values,
    };
    const newTurismo = new Turismo(data);
    await newTurismo.save();
    res
      .status(200)
      .json({ msg: 'Sitio turistico creado', turismo: newTurismo });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el sitio turistico' });
  }
};

const editTurismo = async (req, res) => {
  const { id } = req.params;
  try {
    await Turismo.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: 'Sitio turistico actualizado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar el sitio turistico' });
  }
};

const deleteTurismo = async (req, res) => {
  const { id } = req.params;

  try {
    await Turismo.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Sitio turistico eliminado' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el sitio turistico' });
  }
};

module.exports = {
  getTurismos,
  getTurismo,
  createTurismo,
  editTurismo,
  deleteTurismo,
};
