const mongoose = require("mongoose");

// Función encargada de establecer la conexión con MongoDB
// Utiliza la URI almacenada en las variables de entorno
const dbConnection = async () => {
  try {
    // Se obtiene la cadena de conexión desde el archivo .env
    const mongoURI = process.env.MONGODB_URI;

    // Intento de conexión a la base de datos
    await mongoose.connect(mongoURI);
    console.log("MongoDB conectado correctamente");
  } catch (err) {
    console.error("Error de conexión:", err);

    // Se lanza un nuevo error para que pueda ser manejado externamente
    throw new Error("Error al iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};