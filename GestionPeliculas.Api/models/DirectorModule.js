const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    estado: {
        type:String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Director", DirectorSchema);