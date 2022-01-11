const Colaboradores = require('../models/Colaboradores');

const crearColaborador = async (req, res) => {
  const { fullName } = req.body;

  const fullNameLower = fullName.toLowerCase();

  try {
    const colaborador = await Colaboradores.findOne({
      fullName: fullNameLower,
    });
    if (colaborador) {
      return res.status(400).json({
        msg: 'este colaborador ya existe',
      });
    }
    const data = {
      ...req.body,
      fullName: fullNameLower,
    };
    console.log(data);
    const newColaborador = new Colaboradores(data);
    await newColaborador.save();
    res.status(201).json({
      msg: 'colaborador creado correctamente',
      colaborador: newColaborador,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear el colaborador',
    });
  }
};

const getColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaboradores.find();
    res.json({
      colaboradores,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener los colaboradores',
    });
  }
};

const eliminarColaborador = async (req, res) => {
  const { id } = req.params;
  try {
    await Colaboradores.findByIdAndDelete(id);
    res.json({ status: 'colaborador eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al obtener colaborador',
    });
  }
};

module.exports = {
  crearColaborador,
  getColaboradores,
  eliminarColaborador,
};
