const mongoose = require('mongoose');

const tramiteSchema = new mongoose.Schema(
  {
    tipoDoc: {
      type: String,
      required: true,
    },
    nro_documento: {
      type: Number,
      required: true,
    },
    nombres: {
      type: String,
      required: true,
    },
    ap_paterno: {
      type: String,
      required: true,
    },
    ap_materno: {
      type: String,
      required: true,
    },
    email: String,
    telefono: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    tramite: String,
    comentario: String,
  },
  {
    timestamps: true,
  }
);

// tramiteSchema.methods.toJSON = function () {
//   const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();
//   return usuario;
// };

const tramiteModel = mongoose.model('tramite', tramiteSchema);

module.exports = tramiteModel;
