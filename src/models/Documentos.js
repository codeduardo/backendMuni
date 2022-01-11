const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tiposDoc',
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const documentoModel = mongoose.model('documento', documentoSchema);

module.exports = documentoModel;
