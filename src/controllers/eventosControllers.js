const Evento = require('../models/Eventos');

const crearEvento = async (req, res) => {
  try {
    const newEvento = new Evento(req.body);
    await newEvento.save();
    res.json({
      msg: 'Evento creado correctamente',
      evento: newEvento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};

const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find().sort({ createdAt: -1 });
    res.json({
      eventos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};

const getEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findById(id);
    res.json({
      evento,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};

const updateEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await Evento.findByIdAndUpdate(id, req.body);
    res.json({
      msg: 'Evento actualizado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};

const deleteEvento = async (req, res) => {
  const { id } = req.params;
  try {
    await Evento.findByIdAndDelete(id);
    res.json({
      msg: 'Evento eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hubo un error',
    });
  }
};

module.exports = {
  crearEvento,
  getEventos,
  deleteEvento,
  getEvento,
  updateEvento,
};
