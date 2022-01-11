const Turismo = require('../models/Turismo');
const Evento = require('../models/Eventos');

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion);

  if (!incluida) {
    throw new Error(`La coleccion ${coleccion} no esta permitida`);
  }

  return true;
};
const existeTurismoPorId = async (id = '') => {
  const existeTurismo = await Turismo.findById(id);
  if (!existeTurismo) {
    throw new Error(`El Turismo con id ${id} no existe`);
  }

  return true;
};
const existeEventoPorId = async (id = '') => {
  const existeEvento = await Evento.findById(id);
  if (!existeEvento) {
    throw new Error(`El Evento con id ${id} no existe`);
  }

  return true;
};
const existeColaboradorPorId = async (id = '') => {
  const existeColaborador = await Evento.findById(id);
  if (!existeColaborador) {
    throw new Error(`El Colaborador con id ${id} no existe`);
  }

  return true;
};

module.exports = {
  coleccionesPermitidas,
  existeTurismoPorId,
  existeEventoPorId,
  existeColaboradorPorId,
};
