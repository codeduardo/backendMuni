const mongoose = require('mongoose');

const turismoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
    ubicacion: String,
  },
  {
    timestamps: true,
  }
);
const turismoModel = mongoose.model('Turismo', turismoSchema);

module.exports = turismoModel;
