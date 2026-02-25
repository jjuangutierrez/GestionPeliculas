const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error(error);
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};