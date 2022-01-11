const mongoose = require('mongoose');

const colaboradorSchema = new mongoose.Schema(
  {
    img: {
      type: [String],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },

    rol: {
      type: String,
    },
    profesion: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// colaboradorSchema.methods.toJSON = function () {
//   const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();
//   return usuario;
// };

const colaboradorModel = mongoose.model('colaborador', colaboradorSchema);

module.exports = colaboradorModel;
