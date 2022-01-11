const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    img: {
      type: [String],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { __v, password, createdAt, updatedAt, ...usuario } = this.toObject();
  return usuario;
};

const userMdel = mongoose.model('User', userSchema);

module.exports = userMdel;
