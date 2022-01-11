const mongoose = require('mongoose');

const tiposDocSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tiposDocModel = mongoose.model('tiposDoc', tiposDocSchema);

module.exports = tiposDocModel;
