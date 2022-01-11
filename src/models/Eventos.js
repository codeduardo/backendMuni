const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fecha_evento: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const eventoModel = mongoose.model('evento', eventoSchema);

module.exports = eventoModel;
