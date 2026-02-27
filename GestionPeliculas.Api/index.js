require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/db-connection-mongo');

// Inicialización de la aplicación
const app = express();

// Se establece la conexión con la base de datos al arrancar la aplicación
dbConnection();

// ----- Middlewares -----

// Permite que el servidor acepte peticiones desde otros orígenes
app.use(cors());

// Habilita el parseo de solicitudes en formato JSON
app.use(express.json());

// ----- Rutas de la API -----

// Cada endpoint está organizado en su respectivo archivo de rutas
app.use('/api/generos', require('./routes/GeneroRoutes'));
app.use('/api/directores', require('./routes/DirectorRoutes'));
app.use('/api/productoras', require('./routes/ProductoraRoutes'));
app.use('/api/tipos', require('./routes/TipoRoutes'));
app.use('/api/media', require('./routes/MediaRoutes'));

// Se define el puerto tomando el valor del entorno o usando 4000 por defecto
const port = process.env.PORT || 4000;

// Puesta en marcha del servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});